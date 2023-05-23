import * as React from "react";
import { Link } from "gatsby";
import "../styles/global.css";
import MainContainer from "../components/main-container.js";

const IndexPage = () => {
    return (
        <MainContainer active="old">
            <ul>
                <li>
                    <Link to="/viewday/?date=2023-5-22">22.5.2023</Link>
                </li>
            </ul>
        </MainContainer>
    );
};

export default IndexPage;

export const Head = () => <title>Temperature Log</title>;
