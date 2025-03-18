// src/components/CityEventsChart.jsx
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    ScatterChart, Scatter, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    const getData = useCallback(() => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split(/, | - /)[0]; // Extract city name
            return { city, count };
        });
        return data;
    }, [allLocations, events]);

    useEffect(() => {
        setData(getData());
    }, [getData]);

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">Events in Each City</h2>
            <ResponsiveContainer width="99%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: -30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                        type="category"
                        dataKey="city"
                        name="City"
                        angle={60}
                        interval={0}
                        tick={{ dx: 20, dy: 40, fontSize: 14, fill: "#ccc" }}
                        stroke="#666"
                    />
                    <YAxis
                        type="number"
                        dataKey="count"
                        name="Number of events"
                        allowDecimals={false}
                        stroke="#666"
                        tick={{ fill: "#ccc" }}
                    />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{
                            backgroundColor: '#333',
                            border: '1px solid #555',
                            color: '#fff'
                        }}
                        labelStyle={{ color: '#fff' }}  // For the title text
                        itemStyle={{ color: '#ddd' }}   // For the item/value text
                    />
                    <Scatter name="Events" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};
CityEventsChart.propTypes = {
    allLocations: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
};

export default CityEventsChart;