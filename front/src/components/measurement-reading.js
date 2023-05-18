import * as React from "react";
import "../styles/global.css";
import { measurementBox, measurementTitle, measurementValue, measurementUnit } from "./measurement-reading.module.css";
import { DataContext } from "./data-loader";

const MeasurementReading = ({ title, value, unit, color }) => {
    return (
        <div className={measurementBox} style={{ backgroundColor: color }}>
            <div style={{ marginBottom: "1em" }}>
                <span className={measurementTitle}>{title}</span>
            </div>
            <div>
                <span className={measurementValue}>{value}</span>
                <span className={measurementUnit}> {unit}</span>
            </div>
        </div>
    );
};

export const TemperatureReading = () => {
    const data = React.useContext(DataContext);
    return <MeasurementReading title="TEMPERATURE" value={data[data.length - 1].temperature.toFixed(1)} unit="°C" color="rgb(252, 231, 213)" />;
}

export const HumidityReading = () => {
    const data = React.useContext(DataContext);
    return <MeasurementReading title="HUMIDITY" value={data[data.length - 1].humidity.toFixed(1)} unit="%" color="rgb(188, 228, 228)" />;
}

export default MeasurementReading;