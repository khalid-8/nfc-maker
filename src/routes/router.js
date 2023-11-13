import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Contacts, Landing, Map } from "../views";

export default function AppRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Landing />} />

            <Route exact path="/map" element={<Map />} />

            <Route exact path="/contacts" element={<Contacts />} />

            <Route exact path="/contacts/:id" element={<Contacts />} />
        </Routes>
    );
}
