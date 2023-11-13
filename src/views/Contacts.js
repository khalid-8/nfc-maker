import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../helpers";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import Avatar from "react-avatar-edit";

function Contacts() {
    const [contact, setContact] = useState();

    const { id } = useParams();

    // useEffect(() => {
    //     if (!id) return;

    //     const retreiveData = async () => {
    //         const data = await API.getContacts(id);
    //         setContact(data);
    //     };

    //     retreiveData();
    // }, [id]);

    return (
        <main>
            <ShowContact />
        </main>
    );
}

function ShowContact() {
    const handleClick = async () => {
        // const supported = "contacts" in navigator && "ContactsManager" in window;
        // console.log(supported);
        // if (supported) {
        //     const contacts = await navigator.contacts.create({
        //         name: "النهدي خالد",
        //         email: "kalnahdi1@gmail.com",
        //     });
        //     console.log("🚀 ~ file: Contacts.js:39 ~ handleClick ~ contacts:", contacts);
        // }
        // const props = ["name", "email", "tel", "address", "icon"];
        // const opts = { multiple: true };

        const props = ["name", "email", "tel", "address", "icon"];
        const opts = { multiple: false };
        const supported = "contacts" in navigator && "ContactsManager" in window;
        console.log(supported);
        if (supported) {
            const contacts = await navigator.contacts.select(props, opts);
            console.log(contacts);
            console.log(contacts[0]);
        }
    };

    return (
        <Card>
            <img src="/images/placeholder-image.jpeg" />
            <div>
                <p>الاسم الاول: خالد</p>
                <p>الاسم الاخير: النهدي</p>
                <p>رقم الجوال: 0569631416</p>
                <p>اسم الشركة: Santom Tech</p>
                <p>الايميل: kalnahdi77@gmail.com</p>
            </div>
            <Button onClick={handleClick}>اصافة</Button>
        </Card>
    );
}
function AddContact() {
    const handleOnCrop = (preview) => {
        //  setPreview(preview);
    };

    const handleOnClose = () => {
        //  setShowAvEditor(false);
        //  setPreview(null);
    };

    return (
        <>
            <h1>جهات الاتصال</h1>
            <Card>
                <Avatar
                    className="pic-picker"
                    width={220}
                    height={220}
                    onCrop={(view) => handleOnCrop(view)}
                    onClose={() => handleOnClose()}
                />
                <Form>
                    <FormGroup>
                        <Form.Label> :الاسم الاول</Form.Label>
                        <Form.Control></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> :الاسم الاخير</Form.Label>
                        <Form.Control></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> :رقم الجوال</Form.Label>
                        <Form.Control></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> :اسم الشركة</Form.Label>
                        <Form.Control></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> :تليفون العمل</Form.Label>
                        <Form.Control></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> :الايميل</Form.Label>
                        <Form.Control></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> :رابط الموقع</Form.Label>
                        <Form.Control></Form.Control>
                    </FormGroup>
                </Form>
            </Card>
        </>
    );
}
export default Contacts;
