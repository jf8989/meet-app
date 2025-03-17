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
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: -30 }}>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Events" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};
CityEventsChart.propTypes = {
    allLocations: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
};

export default CityEventsChart;