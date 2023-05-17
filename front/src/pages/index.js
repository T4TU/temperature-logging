import * as React from "react"
import "../styles/global.css"
import MainContainer from "../components/main-container.js"

const IndexPage = () => {
    return (
        <MainContainer active="today">
            <h1>Hello world!</h1>
        </MainContainer>
    )
}

export default IndexPage

export const Head = () => <title>Temperature Log</title>
