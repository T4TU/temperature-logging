import * as React from "react";
import "../styles/global.css";
import { LogDate } from "../js/util.js";
import MainContainer from "../components/main-container.js";
import { TemperatureChart, HumidityChart } from "../components/measurement-chart.js";
import DataLoader from "../components/data-loader";

const ViewDayPage = () => {

    const params = new URLSearchParams(window.location.search);
    const date = LogDate.fromString(params.get("date"));

    return (
        <MainContainer active="old">
            <DataLoader date={date}>
                <h3 className="title">
                    LOGGED MEASUREMENT DATA FOR
                    <br />
                    <strong style={{ color: "#505050", fontSize: "1.25em", lineHeight: "1.75em" }}>{date.asFriendlyString()}</strong>
                </h3>
                <TemperatureChart />
                <br />
                <HumidityChart />
            </DataLoader>
        </MainContainer>
    );
};

export default ViewDayPage;

export const Head = () => <title>Temperature Log</title>;
