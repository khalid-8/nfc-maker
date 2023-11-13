import React from "react";
import { io } from "socket.io-client";
import axiosInstance from "./axiosInstance";

export const socket = io.connect("http://localhost:8080/");

class API extends React.Component {
    getData = async (table = "db") => {
        try {
            await axiosInstance.get(table);
        } catch (err) {
            console.log(err);
        }
    };

    postData = async (data) => {
        try {
            await axiosInstance.post(
                "db",
                {
                    data: data,
                },
                {}
            );
        } catch (err) {
            console.log(err);
        }
    };

    deleteData = async (id) => {
        try {
            await axiosInstance.delete(
                "db",
                {
                    data: { id: id },
                },
                {}
            );
        } catch (err) {
            throw new Error("Couldn't delete data: ", err);
            console.log(err);
        }
    };
}

const instance = new API();
export default instance;
