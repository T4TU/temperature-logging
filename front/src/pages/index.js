import * as React from "react";
import "../styles/global.css";
import { readingsContainer, indexSection } from "../styles/index.module.css";
import { LogDate } from "../js/util.js";
import MainContainer from "../components/main-container.js";
import DataLoader from "../components/data-loader";
import { TemperatureChart, HumidityChart } from "../components/measurement-chart.js";
import { HumidityReading, TemperatureReading } from "../components/measurement-reading";
import UpdateCounter from "../components/update-counter";

const IndexPage = () => {

    const [date, setDate] = React.useState(LogDate.current());
    const [lastUpdated, setLastUpdated] = React.useState(Date.now());

    React.useEffect(() => {
        setInterval(() => {
            setDate(LogDate.current());
            setLastUpdated(Date.now());
        }, 60 * 1000);
    }, []);

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
                <section className={indexSection}>
                    <UpdateCounter lastUpdated={lastUpdated} />
                </section>
            </DataLoader>
        </MainContainer>
    );
};

export default IndexPage;

export const Head = () => <title>Temperature Log</title>;
