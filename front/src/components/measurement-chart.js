import * as React from "react"
import Chart from "chart.js/auto"
import { Line } from "react-chartjs-2"

const MeasurementChart = ({ title, color, labels, values }) => {
    return (
        <div>
            <Line 
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: title,
                            data: values,
                            backgroundColor: color,
                            borderColor: color,
                            pointStyle: false,
                            tension: 0.1,
                            pointHitRadius: 20
                        },
                    ]
                }}
            >
            </Line>
        </div>
    )
}

export default MeasurementChart