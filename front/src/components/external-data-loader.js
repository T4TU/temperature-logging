import * as React from "react";
import "../styles/global.css";
import { beginningOfToday, parseExternalData } from "../js/util.js";

export const ExternalDataContext = React.createContext(null);

const ExternalDataLoader = ({ date, children }) => {

    const [status, setStatus] = React.useState("loading");
    const [loadedData, setLoadedData] = React.useState(null);

    React.useEffect(() => {
        if (!date) {
            setStatus("nodate");
            return;
        }
        const startTime = beginningOfToday();
        const apiURL = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::simple`
                        + `&fmisid=${process.env.GATSBY_FMISID}&timestep=10&starttime=${startTime}&parameters=t2m`;
        fetch(apiURL)
            .then(res => res.text())
            .then(res => parseExternalData(res))
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
        return <p>Could not load external data.</p>;
    } else {
        return (
            <ExternalDataContext.Provider value={loadedData}>
                {children}
            </ExternalDataContext.Provider>
        );
    }
};

export default ExternalDataLoader;
