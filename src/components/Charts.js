import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    registerables,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "./styles/charts.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.register(...registerables);

function DoughnutGraph({ org, cur }) {
    console.log("🚀 ~ file: Charts.js:20 ~ DoughnutGraph ~ cur:", cur);
    console.log("🚀 ~ file: Charts.js:20 ~ DoughnutGraph ~ org:", org);
    const [doughntColor, setDougntColor] = useState();

    const latestPresentage = (100 - (org / cur) * 100).toFixed(2) ?? 0;
    console.log("🚀 ~ file: Charts.js:23 ~ DoughnutGraph ~ latestPresentage:", latestPresentage);
    const initPresentage = ((org / cur) * 100).toFixed(2) ?? 100;
    console.log("🚀 ~ file: Charts.js:25 ~ DoughnutGraph ~ initPresentage:", initPresentage);

    useEffect(() => {
        let color;
        if (latestPresentage > 99) color = "green";
        else if (latestPresentage > 74) color = "blue";
        else if (latestPresentage > 45) color = "orange";
        else color = "green";
        // else color = "red";

        setDougntColor(color);
    }, [latestPresentage, initPresentage]);

    const labels = ["Actual", "Target"];
    const data = {
        labels: labels,
        datasets: [
            {
                data: [latestPresentage, initPresentage],
                backgroundColor: [doughntColor, "rgba(101, 100, 100, 0.143)"],
                hoverOffset: 4,
                count: 2,
            },
        ],
    };

    const centerText = {
        id: "centerText",
        beforeDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart;

            ctx.save();

            // console.log(chart.getDatasetMeta(0))
            // console.log(data)
            ctx.font = "bolder calc(13px + .5vw) sans-serif";
            ctx.fillStyle = chart.getDatasetMeta(0).data[0].options.backgroundColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
                `${parseFloat(data.datasets[0].data[0]).toFixed(1)}%`,
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y
            ); //chartArea.height/2, chartArea.width/2)
            ctx.restore();
        },
    };

    const options = {
        elements: {
            arc: {
                borderWidth: 0,
            },
        },
        plugins: {
            title: {
                display: true,
                text: `نسبة الزيادة %`,
                align: "center",
                padding: {
                    top: 10,
                    bottom: 10,
                },
                font: {
                    size: 20,
                },
            },
            datalabels: {
                color: "black",
                formatter: function (value) {
                    return value === latestPresentage ? cur : org;
                },
                labels: {
                    value0: {
                        font: {
                            weight: "bold",
                            size: "12vw",
                        },
                    },
                    value1: {
                        font: {
                            weight: "bold",
                            size: "12vw",
                        },
                    },
                },
            },
            legend: {
                display: false,
                maxWidth: 59,
            },
        },
        cutout: "70%",
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="chart_graph">
            <Doughnut data={data} options={options} plugins={[centerText]} />
        </div>
    );
}

function BarGraph({ org, cur, title }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title, //"عدد التقيمات",
                font: {
                    size: 20,
                },
            },
            legend: {
                display: false,
                maxWidth: 59,
            },
        },
    };

    const labels = [""];

    const data = {
        labels,
        datasets: [
            {
                label: `${title} قبل`,
                data: [org],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: `${title} الحالي`,
                data: [cur],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <div className="chart_graph">
            <Bar options={options} data={data} />
        </div>
    );
}
function Charts({ org, cur, title }) {
    return (
        <div className="graph_containers">
            <BarGraph org={org} cur={cur} title={title} />
            <DoughnutGraph org={org} cur={cur} />
        </div>
    );
}

export default Charts;
