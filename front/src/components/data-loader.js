import * as React from "react";
import "../styles/global.css";
import { parseMeasurementData } from "../js/util.js";

export const DataContext = React.createContext(null);

const DataLoader = ({ date, children }) => {

    const [status, setStatus] = React.useState(null);
    const [loadedData, setLoadedData] = React.useState();

    React.useEffect(() => {
        if (!date) {
            setStatus("nodate");
            return;
        }
        fetch(`http://raspberrypi.local/logs/${encodeURIComponent(date.asReverseString())}.csv`)
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
    } else if (status === "loaded") {
        return (
            <DataContext.Provider value={loadedData}>
                {children}
            </DataContext.Provider>
        );
    } else {
        return <p>Loading...</p>;
    }
};

export default DataLoader;