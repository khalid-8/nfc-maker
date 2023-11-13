import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

let OpenNotificationFunction;

/***
 *  Notification is a component which needs to be places in Global App.js or alongside the Routes
 *  notify() is a helper function to trigger Notification Component
 ***/
export const Notify = (msg, warning, permanent = false) => {
    OpenNotificationFunction(msg, warning, permanent);
};

export default function Notification() {
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);
    const [isWarning, setIsWarning] = useState(true);

    const closeNotification = () => {
        setOpen(false);
        setMsg("");
    };

    useEffect(() => {
        const openNotification = (newMsg, warning, permanent) => {
            setMsg(newMsg);
            setOpen(true);
            setIsWarning(warning);
            if (permanent !== true) {
                setTimeout(() => {
                    closeNotification();
                }, 7000);
            }
        };

        OpenNotificationFunction = openNotification;
    }, []);

    return (
        <>
            {open && (
                <Alert
                    variant={isWarning ? "danger" : "success"}
                    // onClose={() => setOpen(false)}
                    // dismissible
                    style={{
                        position: "fixed",
                        left: "50%",
                        transform: "translate(-50%)",
                        top: "1em",
                        minWidth: "250px",
                        maxWidth: "400px",
                        zIndex: 9999,
                        padding: "10px",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}>
                    {isWarning ? (
                        <AiFillCloseCircle color="red" fontSize={25} />
                    ) : (
                        <AiFillCheckCircle color="green" fontSize={25} />
                    )}{" "}
                    {msg}
                </Alert>
            )}
        </>
    );
}
