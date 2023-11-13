import React, { useEffect, useMemo, useState } from "react";
import "./styles/maps.css";
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF, StandaloneSearchBox } from "@react-google-maps/api";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { BsClipboard } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { Alert, Button } from "react-bootstrap";
import { API } from "../helpers";
import { CustomInfoWindow, Markers } from "../components";

/*const testObj = {
    name: "هيفاء مول",
    adr: "شارع فلسطين، الرويس، جدة 23215",
    placeId: "ChIJOR9fT8LPwxURqHTiq5Xso40",
    rating: 4.2,
    user_ratings_total: 21767,
    photos: [
        {
            "height": 2726,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/103034496657319890222\">ahmad holayl</a>"
            ],
            "photo_reference": "AcJnMuFMLQ4WEJC_2JOtpz0ZXLZMulDt1jMC95J3taxdLGiEzyUE9EpxAYOmLDMSvEr4yxt5ikSZ7RJFXKmqxbKvsXbsr8IgISxyaXOcO1HhxHPCflPog2Kgpm1Urrz5eFdphNpaJNwdZ5r1hpD_wf5dHB2Zfw74Z5WWk5NBNCobQ8tmhx_A",
            "width": 3837
        },
        {
            "height": 2755,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/103034496657319890222\">ahmad holayl</a>"
            ],
            "photo_reference": "AcJnMuHHp7cbEvxP54GF1GprXuoe_ur0ZAKRrqQyOSGFKSEYwkmF5eIJiPdW3lK3eiitAHn-t8izO7nj0rme_NZ9kC9GcvQsfLN_SO4QMq5gQJFSq6P9GGHnBXqzvwTMeEetUeyB5rkHK0U90AgbZdfTSyfQpef6zHWVpJoBzL5gn9bVlgye",
            "width": 3641
        },
        {
            "height": 2652,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/103034496657319890222\">ahmad holayl</a>"
            ],
            "photo_reference": "AcJnMuGNkkgML-ms1OWcDBQ0XjKQa6ErDAkgxKswwsYBs5jZwNRZf-L5HUE3FQZnE_c2b6guvLi3a3xnySOhZ2E6WOTdhhgbAXYqDw-o5Jm8ZAZ8b_ZZRCfopQUyeePO81h-v3s_9N5WE5UXChAu4iDk-ALZ5LCHTakS6n966gCsZiDsS0z1",
            "width": 3765
        },
        {
            "height": 1696,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/103034496657319890222\">ahmad holayl</a>"
            ],
            "photo_reference": "AcJnMuGtTC5aAJDA8sFdkdJ9JkazyKZqT9dFW0smvjUQ8M4jpEF90lDK-qcic7FVr0QXZ9cPkUXmA_WI_aFZRyzWOn6BLDyH8aWG7fqQSFF4gssI0-_KPu_l49lfoqnSD1Ludnk6_EJ--2cbdQLlNR3D1aWJSQ5-64xhQeQJEvNB3fEHmkwU",
            "width": 1362
        },
        {
            "height": 3024,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/103034496657319890222\">ahmad holayl</a>"
            ],
            "photo_reference": "AcJnMuGCDZPD7vY_-AwSSY28mldoCfnvxqFLsYXlojUQuwTpFAtvOC7FrxcyAqD7Ty4EAkHxriEh4tC2KX2AVdEeFgXvc8r1h7biTtg_Vno_g09drgi8lR73gOoZObbXtygbOCxEreHP_5kURbVEShyleKN9Sqcxv2HI2LSnWJjLBif5iH1z",
            "width": 4032
        },
        {
            "height": 2758,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/103034496657319890222\">ahmad holayl</a>"
            ],
            "photo_reference": "AcJnMuGA3Ejp0rbcK39WYfRw8O4cnguVIOzTfQr3pSP_xvjrmcekyIy8luTbq0FStk2rhQfBYjEmQnUnn3JroD9RrVosCJm64KVp3bFqw904A_lsf-Bgz0z8uLRruUecBPhIt0cYSezaE7Ga8Tz_sFVT_2DX-bLDpZWGsnwzQw4M8KYv8lX3",
            "width": 3778
        },
        {
            "height": 831,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/104800292149525141217\">صالح الشمري</a>"
            ],
            "photo_reference": "AcJnMuGVOb9k6UaOeDIiMoAbZIUfLcTCGGKzXG7uqe-Syt_CsBXNO9_6tz7uA8Q6Y5PwbnLvts1nb1Sn10Ej7e4IvTJTTwhd5-bndPLmoZLWK1tv9BCgeg9OqpG1K38Jd7eUBY9wVo_i4-yJLUckMKk51DSNHhxRe1_A0RL7jZY2bJoCA9A6",
            "width": 1125
        },
        {
            "height": 8000,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/102837665640735027510\">Hussain Mohammad</a>"
            ],
            "photo_reference": "AcJnMuFh59oKIbVbPVZ60jlDwHH0fCtdYDtaj0DLpa67mzihIftT0psxuERAN3psVfCzP-7afx_92h6yFwLAenOrRksH8pUp0_UNOaACfilGtZV0_n8-J1s6NsJRuiq_XH44tYCdEpf9kC0E7k4eYwaZ9zck-59RREVq3ADRJeLoyfTrDZV4",
            "width": 6000
        },
        {
            "height": 3024,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/108849736424373522044\">Antonio Benítez</a>"
            ],
            "photo_reference": "AcJnMuE9YnUYHdVBzMCgDJxo3EDdGuH9qgD1_CdR-C8EsAS1F5hlJDQmL5AjgDiLTxOpuuGILuboqm-cj9e-WQXEUZppSX8AN2zY9vC_yjXeqhsdMGwf_POBlhO8fj70zvRsuwbsKdoxAw19fDZpSrMuCgsDlkfAyyvWKDqQooZP7xJclydm",
            "width": 4032
        },
        {
            "height": 4032,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/104628032734694003914\">Alaseelah الأصيلة</a>"
            ],
            "photo_reference": "AcJnMuF3n1y6c2JAFwPS0qJHxN5otd9pqB0m21IgD5uVhUzFJ0ejsLNv3qiwDrC3JRRWJfqNo6V0jp5Om76vs1n9iKgBcDEEfcIRQC8SWo5AeukpZYdNKDhgn4ElBtjYH7ve7gE_0388SWbQD6O6PK6FWoqlU7GC3Kq9X34Xu5g-fypbzVq-",
            "width": 3024
        }
    ]
}*/
const libraries = ["places"];

//https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=place_id&key=api_key
function Map() {
    const [infoWindowData, setInfoWindowData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [mapRef, setMapRef] = useState();
    const [searchBox, setSearchBox] = useState(null);

    const [defaultPos, setDefaultsPos] = useState({
        lat: 0,
        lng: 0,
    });

    const center = useMemo(() => ({ lat: 21.535365645928753, lng: 39.20152789184254 }), []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries,
        region: "sa",
        language: "ar",
    });

    useEffect(() => {
        if (!mapRef) return;
        mapRef?.panTo(new window.google.maps.LatLng(21.535365645928753, 39.20152789184254));
    }, [mapRef]);

    const getPlaceInfo = async (placeId) => {
        const crosAnywhereProxy = "https://protected-thicket-29408-34878e47424e.herokuapp.com/";
        const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?region=sa&language=ar&fields=name%2Cphotos%2Cformatted_address%2Crating%2Cuser_ratings_total%2Cicon%2Cicon_background_color%2Cformatted_phone_number&place_id=${placeId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
        const data = await fetch(crosAnywhereProxy + googleApiUrl, {
            cache: "force-cache",
            headers: {
                "Access-Control-Allow-Origin": "localhost:3000",
            },
        })
            .then((response) => {
                if (!response.ok) return;
                return response.json();
            })
            .then((contents) => {
                return contents;
            })
            .catch((err) => console.log(err));

        return data?.result;
    };

    const onMapLoad = (map) => {
        setMapRef(map);
        const bounds = new window.google.maps.LatLngBounds();
        // markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    const handleMarkerClick = ({ lat, lng, name, place_id, formatted_address, rating, user_ratings_total, photos }) => {
        setInfoWindowData({
            name: name,
            address: formatted_address,
            placeId: place_id,
            rating: rating,
            reviewsCount: user_ratings_total,
            lat: lat,
            lng: lng,
            photos: photos,
        });
        setLoadingInfo(false);
        console.log(infoWindowData);
    };

    const onPlacesChanged = async (e) => {
        console.log("🚀 ~ file: Map.js:189 ~ onPlacesChanged ~ searchBox:", searchBox);
        if (!searchBox || searchBox?.getPlaces()?.length < 1) return;
        const result = searchBox.getPlaces()[0];
        console.log("🚀 ~ file: Map.js:191 ~ onPlacesChanged ~ result:", result);
        console.log(result?.place_id);
        // if (!result?.place_id) return
        const lat = result.geometry.location.lat();
        const lng = result.geometry.location.lng();

        setDefaultsPos({ lat: lat, lng: lng });
        mapRef?.panTo({ lat, lng });

        result["lat"] = lat;
        result["lng"] = lng;

        handleMarkerClick(result);
        // setSearch(input)
        setIsOpen(true);
    };
    const onSBLoad = (ref) => {
        console.log("🚀 ~ file: Map.js:209 ~ onSBLoad ~ ref:", ref.getBounds());
        console.log("loaded ");

        setSearchBox(ref);
        console.log("🚀 ~ file: Map.js:191 ~ onSBLoad ~ ref:", ref);
    };

    return (
        <main className="map-page">
            <>
                {!isLoaded ? (
                    <h1>Loading ...</h1>
                ) : (
                    <GoogleMap
                        mapContainerClassName="map-container"
                        center={center}
                        zoom={14}
                        onLoad={onMapLoad}
                        options={{
                            disableDefaultUI: true,
                        }}
                        mapContainerStyle={{ borderRadius: "10px" }}
                        onClick={async (e) => {
                            console.log(mapRef);
                            setIsOpen(false);
                            console.log(`lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}`);
                            let location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                            setDefaultsPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                            mapRef?.panTo({ ...location });
                            console.log("🚀 ~ file: Map.js:202 ~ onClick={async ~ e?.placeI:", e?.placeId);

                            if (!e?.placeId) return setIsOpen(false);
                            setLoadingInfo(true);
                            setInfoWindowData({});
                            setTimeout(() => {
                                setIsOpen(true);
                            }, 500);

                            console.log("🚀 ~ file: Map.js:206 ~ onClick={async ~ setIsOpen:", isOpen);
                            const info = await getPlaceInfo(e.placeId);
                            info["place_id"] = e.placeId;
                            info["lat"] = location.lat;
                            info["lng"] = location.lng;
                            handleMarkerClick(info);
                        }}>
                        <>
                            <Markers hideSelected={!isOpen} showRegSelected={setIsOpen} />
                            <div className="map_search">
                                <StandaloneSearchBox
                                    onPlacesChanged={onPlacesChanged}
                                    onLoad={onSBLoad}
                                    className="map_search">
                                    <input
                                        type="text"
                                        placeholder="ابحث عن عنوان"
                                        style={{
                                            boxSizing: "border-box",
                                            border: `1px solid transparent`,
                                            width: `270px`,
                                            height: `40px`,
                                            padding: `0 12px`,
                                            borderRadius: `3px`,
                                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                            fontSize: `14px`,
                                            outline: `none`,
                                            margin: "center",
                                            textOverflow: `ellipses`,
                                            position: "absolute",
                                            top: "40px",
                                            marginLeft: "50%",
                                        }}
                                    />
                                </StandaloneSearchBox>
                            </div>

                            {showSucess && (
                                <Alert variant="success" className="copied_success">
                                    تم النسخ <AiFillCheckCircle color="green" fontSize={25} />
                                </Alert>
                            )}

                            <MarkerF position={{ lat: defaultPos.lat, lng: defaultPos.lng }} zIndex={99999}>
                                {isOpen && (
                                    <CustomInfoWindow
                                        infoWindowData={infoWindowData}
                                        loadingInfo={loadingInfo}
                                        setIsOpen={setIsOpen}
                                        setShowSucess={setShowSucess}
                                    />
                                )}
                            </MarkerF>
                        </>
                    </GoogleMap>
                )}
            </>
        </main>
    );
}
export default Map;

/**
 * LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                libraries={libraries}
                language='ar'
                region='sa'
    </LoadScript>
 */

// setDefaults({
//     key: process.env.REACT_APP_GOOGLE_API_KEY , // Your API key here.
//     language: "ar", // Default language for responses.
//     region: "sa", // Default region for responses.
// });
// geocode(RequestType.LATLNG, `${e.latLng.lat()},${e.latLng.lng()}`)
// .then(({ results }) => {
//     const address = results;
//     console.log(address);
//     handleMarkerClick(0, e.latLng.lat(), e.latLng.lng(), address[0].formatted_address, address[0].place_id);
// })
// .catch(console.error);

// const info = await getPlaceInfo(input?.value?.place_id)
// info["placeId"] = input?.value?.place_id

// fromPlaceId(input?.value?.place_id)
// .then(({ results }) => {
//     const { lat, lng } = results[0].geometry.location;
//     mapRef?.panTo({ lat, lng });
//     setDefaultsPos({lat: lat, lng: lng})
//     console.log(lat, lng);
//     info["lat"] = lat
//     info["lng"] = lng
// })
// .catch(console.error);

/* <GooglePlacesAutocomplete
                            selectProps={{
                                search,
                                onChange: async(input) => {
                                    console.log(input?.value?.place_id)
                                    if (!input?.value?.place_id) return

                                    const info = await getPlaceInfo(input?.value?.place_id)
                                    info["placeId"] = input?.value?.place_id

                                    fromPlaceId(input?.value?.place_id)
                                    .then(({ results }) => {
                                        const { lat, lng } = results[0].geometry.location;
                                        mapRef?.panTo({ lat, lng });
                                        setDefaultsPos({lat: lat, lng: lng})
                                        console.log(lat, lng);
                                        info["lat"] = lat
                                        info["lng"] = lng
                                    })
                                    .catch(console.error);                                
                                    
                                    handleMarkerClick(info)
                                    setSearch(input)
                                    setIsOpen(true)
                                },
                            }}
                        /> */
