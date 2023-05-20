import * as React from "react";
import "../styles/global.css";
import { chart, chartTitle, chartLoadingBox, chartLoading } from "../styles/measurement-chart.module.css";
import { Line } from "react-chartjs-2";
import { DataContext } from "./data-loader";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const MeasurementChart = ({ title, color, labels, values }) => {
    return (
        <div className={chart}>
            <span className={chartTitle}>{title}</span>
            <Line
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: title,
                            data: values,
                            backgroundColor: color,
                            borderColor: color,
                            pointStyle: false,
                            tension: 0.1,
                            pointHitRadius: 20
                        },
                    ]
                }}
            />
        </div>
    );
};

const LoadingChart = ({ title}) => {
    return (
        <div className={chart}>
            <span className={chartTitle}>{title}</span>
            <div className={chartLoadingBox}>
                <span className={chartLoading}>Loading...</span>
            </div>
        </div>
    );
};

export const TemperatureChart = () => {
    const data = React.useContext(DataContext);
    if (!data) {
        return <LoadingChart title="Temperature (°C)"/>;
    }
    return <MeasurementChart title="Temperature (°C)" color="orange" labels={data.map(e => e.time)} values={data.map(e => e.temperature)}/>;
};

export const HumidityChart = () => {
    const data = React.useContext(DataContext);
    if (!data) {
        return <LoadingChart title="Humidity (%)"/>;
    }
    return <MeasurementChart title="Humidity (%)" color="teal" labels={data.map(e => e.time)} values={data.map(e => e.humidity)}/>;
};

export default MeasurementChart;
