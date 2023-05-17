import * as React from "react";
import "../styles/global.css";
import { Date } from "../js/util.js";
import MainContainer from "../components/main-container.js";
import { TemperatureChart, HumidityChart } from "../components/measurement-chart.js";
import DataLoader from "../components/data-loader";

const ViewDayPage = () => {

    const params = new URLSearchParams(window.location.search);
    const date = Date.fromString(params.get("date"));

    return (
        <MainContainer active="old">
            <DataLoader date={date}>
                <h2><span style={{ color: "grey" }}>Logged measurement data for:</span> {date.asFriendlyString()}</h2>
                <TemperatureChart />
                <br />
                <HumidityChart />
            </DataLoader>
        </MainContainer>
    );
};

export default ViewDayPage;

export const Head = () => <title>Temperature Log</title>;
