import * as React from "react";
import "../styles/global.css";
import { LogDate } from "../js/util.js";
import MainContainer from "../components/main-container.js";
import { TemperatureChart, HumidityChart } from "../components/measurement-chart.js";
import DataLoader from "../components/data-loader.js";

const ViewDayPage = () => {

    const date = getDateFromURL();

    return (
        <MainContainer active="old">
            <DataLoader date={date}>
                <h3 className="title">
                    LOGGED MEASUREMENT DATA FOR
                    <br />
                    <strong style={{ color: "#505050", fontSize: "1.25em", lineHeight: "1.75em" }}>{date ? date.asFriendlyString() : "Loading..."}</strong>
                </h3>
                <TemperatureChart date={date} />
                <br />
                <HumidityChart date={date} />
            </DataLoader>
        </MainContainer>
    );
};

function getDateFromURL() {
    // Don't try to read date from URL on build, only when on client.
    if (typeof window === "undefined") {
        return null;
    }
    const params = new URLSearchParams(window.location.search);
    return LogDate.fromString(params.get("date"));
}

export default ViewDayPage;

export const Head = () => <title>Temperature Log</title>;
