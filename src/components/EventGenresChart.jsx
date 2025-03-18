// src/components/EventGenresChart.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = useMemo(() => ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'], []);
    const colors = ['#FF5252', '#4CAF50', '#448AFF', '#FFC107', '#9C27B0'];

    const getData = useCallback(() => {
        const data = genres.map(genre => {
            const filteredEvents = events.filter(event =>
                event.summary.includes(genre)
            );
            return {
                name: genre,
                value: filteredEvents.length
            };
        });
        return data;
    }, [events, genres]);

    useEffect(() => {
        setData(getData());
    }, [getData]);

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">Event Topics</h2>
            <ResponsiveContainer width="99%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={130}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        formatter={(value) => <span style={{ color: '#ccc' }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
EventGenresChart.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventGenresChart;