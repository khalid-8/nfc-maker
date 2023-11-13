import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "./styles/image-gallery.css";

function ImageSlider({ imgs, obj, fromDB = false, setImgsLoaded }) {
    console.log("🚀 ~ file: ImageSlider.js:6 ~ ImageSlider ~ imgs:", imgs);
    console.log("🚀 ~ file: ImageSlider.js:6 ~ ImageSlider ~ fromDB:", fromDB);
    const [placeImgs, setPlaceImgs] = useState([]);
    const [showImages, setShowImages] = useState(false);

    useEffect(() => {
        if (!imgs || imgs.length < 1 || showImages) return;
        console.log(imgs);
        const getImages = async () => {
            const crosAnywhereProxy = "https://protected-thicket-29408-34878e47424e.herokuapp.com/";

            let imagesUrls = [];
            const images = await Promise.all(
                imgs.map(async (item) => {
                    console.log("🚀 ~ file: ImageSlider.js:16 ~ imgs.map ~ item:", item);
                    if (fromDB) {
                        const imgUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=350&photo_reference=${item}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
                        return await fetch(crosAnywhereProxy + imgUrl)
                            .then((res) => res.blob()) //gives data in json
                            .then(async (data) => {
                                return { original: URL.createObjectURL(data), thumbnail: URL.createObjectURL(data) };
                            })
                            .catch((error) => {
                                console.log("Error: ", error);
                            });
                    } else if (item?.hasOwnProperty("getUrl")) {
                        let url = await item.getUrl();
                        const ref = url.split("GetPhoto?1s")[1].split("&")[0];
                        imagesUrls.push(ref);
                        return await fetch(crosAnywhereProxy + item.getUrl())
                            .then((res) => res.blob()) //gives data in json
                            .then((data) => {
                                return { original: URL.createObjectURL(data), thumbnail: URL.createObjectURL(data) };
                            })
                            .catch((error) => {
                                console.log("Error: ", error);
                            });
                    }

                    const imgSrc = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=350&photo_reference=${item.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

                    imagesUrls.push(item.photo_reference);

                    return await fetch(crosAnywhereProxy + imgSrc)
                        .then((res) => res.blob()) //gives data in json
                        .then(async (data) => {
                            return { original: URL.createObjectURL(data), thumbnail: URL.createObjectURL(data) };
                        })
                        .catch((error) => {
                            console.log("Error: ", error);
                        });
                })
            );
            console.log("🚀 ~ file: imageSlider.js:25 ~ images ~ images:", imagesUrls);

            setPlaceImgs(images);
            if (!fromDB) obj.photos = imagesUrls;
            setImgsLoaded(true);
            setShowImages(true);
        };

        getImages();
    }, [imgs]);

    return (
        <>
            {console.log(showImages)}
            {!imgs || imgs.length < 1 ? (
                <img
                    src="/images/placeholder-image.jpeg"
                    alt="placeholder"
                    style={{ width: "300px", height: "200px", borderRadius: "10px", marginBottom: "10px" }}
                />
            ) : (
                <>
                    {!showImages ? (
                        <h1>...تحميل الصور</h1>
                    ) : (
                        <div style={{ width: "300px", height: "250px" }}>
                            <ImageGallery
                                items={placeImgs}
                                showThumbnails={false}
                                showBullets={true}
                                showNav={true}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                originalHeight="200"
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default ImageSlider;

// <Carousel fade>
//                 <Carousel.Item>
//                     <img src={placeImgs[0]} alt="place images" />
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img src={placeImgs[1]} alt="place images" />
//                 </Carousel.Item>
//                 {/* {placeImgs.map((item) => (
//                     <Carousel.Item>
//                         <img src={item} alt="place images" />
//                     </Carousel.Item>
//                 ))} */}
//                 </Carousel>
