import React, { useRef, useState } from "react";
import { MarkerClustererF, MarkerF } from "@react-google-maps/api";
import { useBezContext } from "../context";
import CustomInfoWindow from "./CustomInfoWindow";

function Markers({ hideSelected, showRegSelected }) {
    const [isOpen, setIsOpen] = useState(false);

    const { bez } = useBezContext();

    const markersRefs = useRef([]);

    if (!bez || bez?.length < 1) return;
    return (
        <MarkerClustererF minimumClusterSize={1}>
            {(clusterer) => (
                <div>
                    {bez.map((marker, i) => (
                        <MarkerF
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            zIndex={99999}
                            // ref={(el) => (markersRefs.current[i] = el)}
                            // label={{
                            //     text: marker.name,
                            //     className: marker.avatar ? `marker-label-with-avatar` : "marker-label-without-avatar",
                            // }}
                            icon={{
                                url: "/images/shop.png",
                                anchor: new window.google.maps.Point(25, 50),
                                scaledSize: new window.google.maps.Size(50, 50),
                            }}
                            onClick={() => {
                                setIsOpen(marker.id);
                                showRegSelected(false);
                            }}
                            onMouseOver={(e) => {
                                console.log(markersRefs.current[i]);
                                console.log(marker);
                            }}
                            animation={window.google.maps.Animation.DROP}>
                            {(isOpen || hideSelected) === marker.id && (
                                <CustomInfoWindow infoWindowData={marker} loadingInfo={false} setIsOpen={setIsOpen} />
                            )}
                        </MarkerF>
                    ))}
                </div>
            )}
        </MarkerClustererF>
    );
}

export default Markers;
