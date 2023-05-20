import * as React from "react";
import { updateCounterContainer, updateCounter } from "../styles/update-counter.module.css";

const UpdateCounter = ({ lastUpdated }) => {

    const [, setIgnoreThis] = React.useState(0);

    React.useEffect(() => {
        setInterval(() => {
            setIgnoreThis(i => (i + 1) % 60);
        }, 1000);
    }, []);

    return (
        <div className={updateCounterContainer}>
            <span className={updateCounter}>Last updated {((Date.now() - lastUpdated) / 1000).toFixed()} seconds ago.</span>
        </div>
    );
};

export default UpdateCounter;