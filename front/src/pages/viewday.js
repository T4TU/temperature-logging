import * as React from "react"
import "../styles/global.css"
import { parseContent, formatDate } from "../js/util.js"
import MainContainer from "../components/main-container.js"
import MeasurementChart from "../components/measurement-chart.js"

const ViewDayPage = () => {

    const params = new URLSearchParams(window.location.search)
    const date = params.get("date")

    const [status, setStatus] = React.useState(null)
    const [loadedContent, setLoadedContent] = React.useState()

    React.useEffect(() => {
        if (!date) {
            setStatus("nodate")
            return
        }
        fetch(`http://raspberrypi.local/logs/${encodeURIComponent(date)}.csv`)
            .then(res => res.text())
            .then(res => parseContent(res))
            .then(
                (result) => {
                    setLoadedContent(result)
                    setStatus("loaded")
                },
                (error) => {
                    setLoadedContent(error.message)
                    setStatus("error")
                }
            )
    }, [])

    if (status === "nodate") {
        return <h1>No date given.</h1>
    }

    return (
        <MainContainer active="old">
            {status === "loaded" ?
                (
                    <div>
                        <h2><span style={{color: "grey"}}>Logged measurement data for:</span> {formatDate(date)}</h2>
                        <MeasurementChart title="Temperature (°C)" color="orange" labels={loadedContent.map(e => e.time)} values={loadedContent.map(e => e.temperature)}></MeasurementChart>
                        <br />
                        <MeasurementChart title="Humidity (%)" color="teal" labels={loadedContent.map(e => e.time)} values={loadedContent.map(e => e.humidity)}></MeasurementChart>
                    </div>
                )
                :
                status === "error" ? 
                    (<p>Could not load data.</p>)
                    :
                    (<p>Loading...</p>)}
        </MainContainer>
    )
}

export default ViewDayPage

export const Head = () => <title>Temperature Log</title>
