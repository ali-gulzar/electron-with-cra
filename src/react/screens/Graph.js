import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Day 1', sales: 4000, expenses: 2400,
  },
  {
    name: 'Day 2', sales: 3000, expenses: 1398,
  },
  {
    name: 'Day 3', sales: 2000, expenses: 9800,
  },
  {
    name: 'Day 4', sales: 2780, expenses: 3908,
  },
  {
    name: 'Day 5', sales: 1890, expenses: 4800,
  },
  {
    name: 'Day 6', sales: 2390, expenses: 3800,
  },
  {
    name: 'Day 7', sales: 3490, expenses: 4300,
  },
];


export default class Graph extends Component {

  render(){

    return(
      <LineChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="expenses" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
      </LineChart>
    )
  }
}
