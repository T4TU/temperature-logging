import * as React from "react";
import { Link } from "gatsby";
import "../styles/global.css";
import MainContainer from "../components/main-container.js";

const IndexPage = () => {
    return (
        <MainContainer active="old">
            <ul>
                <li>
                    <Link to="/viewday/?date=2023-5-14">14.5.2023</Link>
                </li>
                <li>
                    <Link to="/viewday/?date=2023-5-15">15.5.2023</Link>
                </li>
                <li>
                    <Link to="/viewday/?date=2023-5-16">16.5.2023</Link>
                </li>
                <li>
                    <Link to="/viewday/?date=2023-5-17">17.5.2023</Link>
                </li>
                <li>
                    <Link to="/viewday/?date=2023-5-18">18.5.2023</Link>
                </li>
            </ul>
        </MainContainer>
    );
};

export default IndexPage;

export const Head = () => <title>Temperature Log</title>;
