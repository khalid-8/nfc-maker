import { InfoWindowF } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import "./styles/CustomInfoWindow.css";
import ImageSlider from "./ImageSlider";
import { Button } from "react-bootstrap";
import { API, Notify } from "../helpers";
import { BsClipboard } from "react-icons/bs";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useConfirmationContext } from "../context";

function CustomInfoWindow({ infoWindowData, loadingInfo, setIsOpen }) {
    const [imgsLoaded, setImgsLoaded] = useState(false);
    const { showConfirmationAlert } = useConfirmationContext();

    // const imgsLoaded = useRef(false);

    const handleDeleteClick = async (item) => {
        const result = await showConfirmationAlert({
            head: "حذف متجر",
            body: `هل انت متأكد انك تريد حذف ${item.name}`,
        });
        if (result) {
            try {
                await API.deleteData(item.id);
                Notify("تم حذف المتجر", false);
            } catch (err) {
                console.log(err);
                Notify("لم تتم عملية حذف المتجر", true);
            }
        }
    };
    const getRating = (placeRating) => {
        if (!placeRating) return;
        let starsArr = [];
        let rating = parseFloat(placeRating);
        for (let i = 0; i < 6; i++) {
            if (rating < 1) break;
            starsArr.push(<BiSolidStar color="#ffa534" size={15} key={placeRating + i} />);
            rating -= 1;
        }
        if (rating > 0) {
            if (rating.toFixed(1) < 0.8 && rating.toFixed(1) > 0.2)
                starsArr.push(<BiSolidStarHalf color="#ffa534" size={15} key="20" />);
            else if (rating.toFixed(1) <= 0.2) starsArr.push(<BiStar color="#ffa534" size={15} key="20" />);
            else if (rating.toFixed(1) >= 0.8) starsArr.push(<BiSolidStar color="#ffa534" size={15} key="20" />);
        }
        if (starsArr.length < 5) {
            for (let i = 0; i <= 5 - starsArr.length; i++) {
                starsArr.push(<BiStar color="#ffa534" size={15} key={i} />);
            }
        }
        return starsArr;
    };

    return (
        <InfoWindowF
            options={{ maxWidth: 900, zIndex: 999, enableEventPropagation: true }}
            position={new window.google.maps.LatLng(infoWindowData.lat + 0.00004, infoWindowData.lng)}
            onCloseClick={() => {
                setImgsLoaded(false);
                setIsOpen(false);
            }}>
            <div className="info_box_custom">
                {loadingInfo ? (
                    <h1>تحميل البيانات</h1>
                ) : (
                    <>
                        {infoWindowData.id && (
                            <AiFillDelete className="delete_bez" onClick={() => handleDeleteClick(infoWindowData)} />
                        )}
                        <b style={{ maxWidth: "200px" }}>{infoWindowData.name}</b>
                        <ImageSlider
                            imgs={infoWindowData.photos}
                            obj={infoWindowData}
                            fromDB={!!infoWindowData.id}
                            setImgsLoaded={setImgsLoaded}
                        />
                        <i style={{ maxWidth: "150px" }}>{infoWindowData.address}</i>
                        <div style={{ marginTop: "5px", marginBottom: "5px" }}>{getRating(infoWindowData.rating)}</div>
                        <i>
                            عدد التقميات: <strong>{infoWindowData.reviewsCount ?? 0}</strong>
                        </i>
                        <Button
                            variant="outline-warning"
                            className="copytoClip_btn"
                            disabled={!imgsLoaded}
                            onClick={() => {
                                window.navigator.clipboard
                                    .writeText(
                                        `https://search.google.com/local/writereview?placeid=${
                                            infoWindowData.id ?? infoWindowData.placeId
                                        }`
                                    )
                                    .then(async () => {
                                        Notify("تم النسخ", false);
                                        // Notify("تم النسخ", false);
                                        if (!!infoWindowData.id) return;
                                        const objToUpload = infoWindowData;
                                        objToUpload[
                                            "reviewUrl"
                                        ] = `https://search.google.com/local/writereview?placeid=${infoWindowData.placeId}`;

                                        objToUpload["id"] = objToUpload.placeId;

                                        delete objToUpload.placeId;
                                        console.log("🚀 ~ file: Map.js:335 ~ .then ~ objToUpload:", objToUpload);
                                        await API.postData(objToUpload);
                                        // await prisma.business.create(objToUpload);
                                        // setTimeout(() => {
                                        //     setShowSucess(false);
                                        // }, 3000);
                                    })
                                    .catch((err) => {
                                        Notify("لم تتم اضافة المتجر لقاعدة البيانات", true);
                                        console.log(err);
                                    });
                            }}>
                            انسخ رابط التقييم <BsClipboard />
                        </Button>
                    </>
                )}
                <div className="gm-style-iw-tc" />
            </div>
        </InfoWindowF>
    );
}

export default CustomInfoWindow;
