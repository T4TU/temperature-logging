import * as React from "react";
import "../styles/global.css";
import { readingsContainer, indexSection } from "./index.module.css";
import { LogDate } from "../js/util.js";
import MainContainer from "../components/main-container.js";
import DataLoader from "../components/data-loader";
import { TemperatureChart, HumidityChart } from "../components/measurement-chart.js";
import { HumidityReading, TemperatureReading } from "../components/measurement-reading";

const IndexPage = () => {

    const date = LogDate.current();

    return (
        <MainContainer active="today">
            <DataLoader date={date}>
                <section className={indexSection}>
                    <h3 className="title">LATEST MEASUREMENTS</h3>
                    <div className={readingsContainer}>
                        <TemperatureReading />
                        <HumidityReading />
                    </div>
                </section>
                <section className={indexSection}>
                    <h3 className="title">TODAY'S MEASUREMENTS</h3>
                    <TemperatureChart />
                    <br />
                    <HumidityChart />
                </section>
            </DataLoader>
        </MainContainer>
    );
};

export default IndexPage;

export const Head = () => <title>Temperature Log</title>;
