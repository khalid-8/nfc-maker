import React from "react";
import { Notify } from "./Notify";

class CALC extends React.Component {
    async impact(data) {
        if (!data) return;
        try {
            const crosAnywhereProxy = "https://protected-thicket-29408-34878e47424e.herokuapp.com/";
            // const allData = [];
            const options = {
                cache: "force-cache",
                headers: {
                    "Access-Control-Allow-Origin": "localhost:3000",
                },
            };

            const overAll = {
                rating: {
                    old: 0,
                    new: 0,
                    difference: 0,
                },
                reviewsCount: {
                    old: 0,
                    new: 0,
                    difference: 0,
                },
            };
            const allData = await Promise.all(
                data?.map(async (item) => {
                    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?region=sa&language=ar&fields=name%2Cphotos%2Cformatted_address%2Crating%2Cuser_ratings_total%2Cicon%2Cicon_background_color%2Cformatted_phone_number&place_id=${item.id}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
                    return await fetch(crosAnywhereProxy + googleApiUrl, options)
                        .then((response) => {
                            if (!response.ok) return;
                            return response.json();
                        })
                        .then((contents) => {
                            const newData = contents.result;
                            const createdDate = new Date(
                                new Date(item.addedAt).toLocaleString("en-US", { timeZone: "Asia/Riyadh" })
                            );
                            const Today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" }));

                            const rating = {
                                old: item.rating,
                                new: newData.rating,
                                difference: newData.rating - item.rating,
                            };
                            //Calcuate the overAll rating for all the business
                            overAll.rating.old += item.rating;
                            overAll.rating.new += newData.rating;
                            overAll.rating.difference += rating.difference;

                            const reviewsCount = {
                                old: item.reviewsCount,
                                new: newData.user_ratings_total,
                                difference: newData.user_ratings_total - item.reviewsCount,
                            };
                            //Calcuate the overAll reviews count for all the business
                            overAll.reviewsCount.old += reviewsCount.old;
                            overAll.reviewsCount.new += reviewsCount.new;
                            overAll.reviewsCount.difference += reviewsCount.difference;

                            const diffTime = Today.getTime() - createdDate.getTime();
                            const diffDays = diffTime / (1000 * 3600 * 24);

                            return {
                                name: item.name,
                                address: item.address,
                                createdDate: createdDate,
                                today: Today,
                                rating,
                                reviewsCount,
                                period: diffDays,
                            };

                            // return { newData: contents.result, orgData: item };
                        })
                        .catch((err) => console.log(err));
                })
            );
            // console.log(allData);
            //get the overall average rating
            overAll.rating.old = (overAll.rating.old / data.length).toFixed(2);
            overAll.rating.new = (overAll.rating.new / data.length).toFixed(2);
            overAll.rating.difference = (overAll.rating.new - overAll.rating.old).toFixed(2);

            return { allData, overAll };
        } catch (err) {
            console.log(err);
            Notify("لم نستطع تحليل البيانات", true);
        }
    }
}

const instance = new CALC();
export default instance;
