import * as React from "react";
import "../styles/global.css";
import { chart, chartTitle, chartLoadingBox, chartLoading } from "../styles/measurement-chart.module.css";
import { Line } from "react-chartjs-2";
import { DataContext } from "./data-loader.js";
import { ExternalDataContext } from "./external-data-loader.js";
import { Chart, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "chartjs-adapter-date-fns";
import { fi } from "date-fns/locale";

Chart.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export const MeasurementChart = ({ title, labels, legend, color, data }) => {
    return <MultiMeasurementChart title={title} labels={labels} datasets={[{legend: legend, color: color, data: data}]} />;
};

export const MultiMeasurementChart = ({ title, datasets }) => {

    const sets = datasets.map(dataset => (
        {
            label: dataset.legend,
            data: dataset.data,
            backgroundColor: dataset.color,
            borderColor: dataset.color,
            pointStyle: false,
            tension: 0.1,
            pointHitRadius: 20
        }
    ));

    const options = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "hour",
                    displayFormats: {
                        hour: "HH",
                        minute: "H:mm",
                        datetime: "d.M.yyyy H:mm"
                    }
                }
            }
        },
        adapter: {
            date: {
                locale: fi
            }
        }
    }

    return (
        <div className={chart}>
            <span className={chartTitle}>{title}</span>
            <Line data={{datasets: sets}} options={options} />
        </div>
    );
};

const LoadingChart = ({ title }) => {
    return (
        <div className={chart}>
            <span className={chartTitle}>{title}</span>
            <div className={chartLoadingBox}>
                <span className={chartLoading}>Loading...</span>
            </div>
        </div>
    );
};

export const TemperatureChart = ({ date }) => {

    const data = React.useContext(DataContext);

    if (!data) {
        return <LoadingChart title="Temperature" />;
    }

    return <MeasurementChart
            title="Temperature"
            legend="Temperature (°C)"
            color="orange"
            data={data.map(e => (
                {
                    x: `${date.asString()}T${e.time}`,
                    y: e.temperature
                }
            ))}
        />;
};

export const HumidityChart = ({ date }) => {

    const data = React.useContext(DataContext);

    if (!data) {
        return <LoadingChart title="Humidity" />;
    }

    return <MeasurementChart
            title="Humidity"
            legend="Humidity (%)"
            color="teal"
            data={data.map(e => (
                {
                    x: `${date.asString()}T${e.time}`,
                    y: e.humidity
                }
            ))}
        />;
};

export const TemperatureWithExternalChart = ({ date }) => {

    const data = React.useContext(DataContext);
    const externalData = React.useContext(ExternalDataContext);

    if (!data) {
        return <LoadingChart title="Temperature" />;
    }

    const measurementDataset = {
        legend: "Temperature (°C)",
        data: data.map(e => (
            {
                x: `${date.asString()}T${e.time}`,
                y: e.temperature
            }
        )),
        color: "orange"
    };

    const externalDataset = {
        legend: "Outside temperature (°C)",
        data: externalData.map(e => (
            {
                x: e.time, y: e.temperature
            }
        )),
        color: "#ffd3a2"
    };

    return <MultiMeasurementChart title="Temperature" labels={data.map(e => e.time)} datasets={[measurementDataset, externalDataset]} />;
};
