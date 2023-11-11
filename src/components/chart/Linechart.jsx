import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { chartDays } from '../../utils/data'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';


import { apiInstance } from '../../api';
import Button from '../button/Button';
Chart.register(CategoryScale);
const Linechart = ({ apiData }) => {
    const [historyData, setHistoryData] = useState()
    const [days, setDays] = useState(1)
    console.log(apiData);
   

    useEffect(() => {
        apiInstance(`/${apiData}/market_chart?vs_currency=usd&days=${days}`)
        .then(res => {
            console.log(res.data.prices)
            setHistoryData(res.data.prices)
        })
        .catch(error => console.log(error))
    }, [days])
  return (
         <div style={{width: "100%"}}>
            {!historyData ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Line
                        data={{
                            labels: historyData.map((element) => {
                                let date = new Date(element[0]);
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString();
                            }),

                            datasets: [
                                {
                                    data: historyData.map((element) => element[1]),
                                    label: `Price ( Past ${days} Days ) in USD`,
                                    borderColor: "#87CEEB",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            marginTop: 20,
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                    >
                        {chartDays.map((day) => (
                            <Button
                                key={day.value}
                                onClick={() => {
                                    setDays(day.value);
                                }}
                                selected={day.value === days}
                            >
                                {day.label}
                            </Button>
                        ))}
                    </div>

                </>
            )}
        </div>
  )
}

export default Linechart