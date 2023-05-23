import * as React from "react";
import { navigate } from "gatsby";
import "../styles/global.css";
import { dateSelect, dateInput, buttonInput } from "../styles/old.module.css";
import MainContainer from "../components/main-container.js";
import { LogDate } from "../js/util.js";

const OldDataPage = () => {

    const datePicker = React.useRef();

    const go = () => {
        navigate("/viewday/?date=" + datePicker.current.value);
    }

    return (
        <MainContainer active="old">
            <h3 className="title">VIEW DATA FOR SELECTED DATE</h3>
            <div className={dateSelect}>
                <input
                    className={dateInput}
                    type="date"
                    defaultValue={LogDate.current().asString()}
                    min={process.env.GATSBY_LOGGING_START_DATE}
                    max={LogDate.current().asString()}
                    ref={datePicker} />
                <br />
                <input
                    className={buttonInput}
                    type="button"
                    onClick={go}
                    value="VIEW DATA" />
            </div>
        </MainContainer>
    );
};

export default OldDataPage;

export const Head = () => <title>Temperature Log</title>;
