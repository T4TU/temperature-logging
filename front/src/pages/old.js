import * as React from "react"
import { Link } from "gatsby"
import "../styles/global.css"
import MainContainer from "../components/main-container.js"

const IndexPage = () => {
    return (
        <MainContainer active="old">
            <ul>
                <li>
                    <Link to="/viewday/?date=14-05-2023">14.5.2023</Link>
                </li>
                <li>
                    <Link to="/viewday/?date=15-05-2023">15.5.2023</Link>
                </li>
                <li>
                    <Link to="/viewday/?date=16-05-2023">16.5.2023</Link>
                </li>
            </ul>
        </MainContainer>
    )
}

export default IndexPage

export const Head = () => <title>Temperature Log</title>
