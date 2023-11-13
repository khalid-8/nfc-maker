import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../helpers";

const bezContext = createContext();

export const useBezContext = () => {
    return useContext(bezContext);
};

function BusinessContextProvider({ children }) {
    const [bez, setBez] = useState();
    const [overAllImpact, setOverAllImpact] = useState();
    useEffect(() => {
        socket.on("bez", (data) => {
            console.log(data);
            setBez(data);
        });

        socket.emit("bez", {});

        socket.on("bezOverall", (data) => {
            console.log(data);
            setOverAllImpact(data);
        });

        socket.emit("bezOverall", {});

        return () => {
            socket.off("bez");
            socket.off("bezOverall");
        };
    }, []);

    const values = {
        bez,
        overAllImpact,
    };
    return <bezContext.Provider value={values}>{children}</bezContext.Provider>;
}

export default BusinessContextProvider;
