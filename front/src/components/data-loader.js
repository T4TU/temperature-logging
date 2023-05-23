import * as React from "react";
import "../styles/global.css";
import { parseMeasurementData } from "../js/util.js";

export const DataContext = React.createContext(null);

const DataLoader = ({ date, children }) => {

    const [status, setStatus] = React.useState("loading");
    const [loadedData, setLoadedData] = React.useState(null);

    React.useEffect(() => {
        if (!date) {
            setStatus("nodate");
            return;
        }
        fetch(`${process.env.GATSBY_LOGS_PATH}${encodeURIComponent(date.asString())}.csv`)
            .then(res => res.text())
            .then(res => parseMeasurementData(res))
            .then(
                (result) => {
                    setLoadedData(result);
                    setStatus("loaded");
                },
                (error) => {
                    setLoadedData(error.message);
                    setStatus("error");
                }
            );
    }, [date]);

    if (status === "nodate") {
        return <p>Invalid date.</p>;
    } else if (status === "error") {
        return <p>Could not load data.</p>;
    } else {
        return (
            <DataContext.Provider value={loadedData}>
                {children}
            </DataContext.Provider>
        );
    }
};

export default DataLoader;