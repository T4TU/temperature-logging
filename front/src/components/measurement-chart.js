import * as React from "react";
import "../styles/global.css";
import { CategoryScale } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { DataContext } from "./data-loader";

const MeasurementChart = ({ title, color, labels, values }) => {
    return (
        <div>
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

export const TemperatureChart = () => {
    const data = React.useContext(DataContext);
    return <MeasurementChart title="Temperature (°C)" color="orange" labels={data.map(e => e.time)} values={data.map(e => e.temperature)}/>;
};

export const HumidityChart = () => {
    const data = React.useContext(DataContext);
    return <MeasurementChart title="Humidity (%)" color="teal" labels={data.map(e => e.time)} values={data.map(e => e.humidity)}/>;
};

export default MeasurementChart;
