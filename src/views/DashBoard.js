import React, { useEffect, useState } from "react";
import { useBezContext } from "../context";
import { Card } from "react-bootstrap";
import "./styles/dashboard.css";
import { CALC } from "../helpers";
import { BsSearch } from "react-icons/bs";
import { Charts } from "../components";
function DashBoard() {
    const [showSearch, setShowSearch] = useState(false);
    const [searchRes, setSearchRes] = useState(["<i>لا توجد نتائج</i>"]);
    const [dataToView, setDataToView] = useState();

    const { bez, overAllImpact } = useBezContext();

    useEffect(() => {
        if (!overAllImpact) return;
        setDataToView({
            id: "all",
            totalInitReviews: overAllImpact.totalInitReviews,
            initRating: overAllImpact.avgInitRating,
            reviewsCount: overAllImpact.reviewsCount,
            rating: overAllImpact.rating,
            name: "جميع المتاجر",
        });
    }, [overAllImpact]);

    useEffect(() => {
        console.log(dataToView);
    }, [dataToView]);

    const handleSearch = (term) => {
        if (term.length < 1 || !bez || bez.length < 1) return setShowSearch(false);
        const resArr = [];
        bez.forEach((item) => {
            if (item.name.toLowerCase().includes(term)) return resArr.push(item);
        });
        console.log("🚀 ~ file: DashBoard.js:35 ~ handleSearch ~ resArr:", resArr);
        setSearchRes(resArr);
        setShowSearch(true);
    };

    const handleItemClicked = (data) => {
        if (data.id === dataToView?.id) {
            return setDataToView({
                id: "all",
                totalInitReviews: overAllImpact.totalInitReviews,
                initRating: overAllImpact.avgInitRating,
                reviewsCount: overAllImpact.reviewsCount,
                rating: overAllImpact.rating,
                name: "جميع المتاجر",
            });
        }

        setDataToView({
            id: data.id,
            totalInitReviews: data.reviewsCount,
            initRating: data.rating,
            reviewsCount: data.updates[data.updates.length - 1].reviewsCount,
            rating: data.updates[data.updates.length - 1].rating,
            name: data.name,
            numberOfDays: data.impact.numberOfDays,
        });
    };
    return (
        <div id="dashboard_comp">
            <Card className="dashboard_card">
                <Card.Title>المتاجر المضافة</Card.Title>
                <Card.Body style={{ paddingTop: "0", overflow: "hidden", padding: "0px", paddingBottom: "30px" }}>
                    {/* <BsSearch className="item-icon" /> */}
                    <div className="general-stores-info">
                        <input
                            type="text"
                            className="menu-searchBar"
                            placeholder="ابحث بأسم المتجر 🔍"
                            onKeyDown={(e) => (e.key === "Enter" ? handleSearch(e.target.value) : "")}
                        />
                        <div>
                            <b>عدد المتاجر المضافة: {bez?.length}</b>
                        </div>
                    </div>
                    <div className="stores-list">
                        {showSearch ? (
                            searchRes.length > 0 ? (
                                searchRes?.map((item, i) => (
                                    <div
                                        key={item.id}
                                        className={`sotre-item ${item?.id === dataToView?.id ? "active" : ""}`}
                                        onClick={() => handleItemClicked(item)}>
                                        {item.name}
                                    </div>
                                ))
                            ) : (
                                <div className="search-no-results">
                                    <i>لا توجد نتائج</i>
                                </div>
                            )
                        ) : (
                            bez?.map((item, i) => (
                                <div
                                    key={item.id}
                                    className={`sotre-item ${item?.id === dataToView?.id ? "active" : ""}`}
                                    onClick={() => handleItemClicked(item)}>
                                    {item.name}
                                </div>
                            ))
                        )}
                    </div>
                </Card.Body>
            </Card>
            <Stats data={dataToView} />
        </div>
    );
}

function Stats({ data }) {
    if (!data) return;
    return (
        <Card className="dashboard_card analytics">
            <Card.Title>الاحصائيات</Card.Title>
            <Card.Body>
                <h3>{data.name}</h3>
                <div>
                    {data && (
                        <>
                            <h5>عدد التقيمات</h5>
                            <Charts org={data.totalInitReviews} cur={data.reviewsCount} title={"عدد التقيمات"} />
                            {/* <h5>تقييم المكان</h5>
                            <Charts org={data?.initRating} cur={data?.rating} title={"متوسط التقييم"} /> */}
                        </>
                    )}

                    <h5>
                        عدد الزيادة: <b>{data?.reviewsCount - data.totalInitReviews}</b> تقييم
                    </h5>
                    {data?.numberOfDays && (
                        <h5>
                            خلال: <b>{data?.numberOfDays} </b> يوم
                        </h5>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default DashBoard;
