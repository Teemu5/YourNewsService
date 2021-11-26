import React, { useState, useEffect } from 'react'
import Header from "./common/Header";
import { getCategoriesUserCount } from '../helpers'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Categories have name, userCount and index
const categories = [
    'Business',
    'Entertainment',
    'Health',
    'Politics',
    'Products',
    'ScienceAndTechnology',
    'Sports',
    'US',
    'World'
];
const categorieswithIndex = [
    {category: 'Business', index: 0},
    {category: 'Entertainment', index: 1},
    {category: 'Health', index: 2},
    {category: 'Politics', index: 3},
    {category: 'Products', index: 4},
    {category: 'ScienceAndTechnology', index: 5},
    {category: 'Sports', index: 6},
    {category: 'US', index: 7},
    {category: 'World', index: 8}
];
const BarChartCategories = (userCounts: any[]) => {
    const data = [
        {category: 'Business', userCount: userCounts[0]},
        {category: 'Entertainment', userCount: userCounts[1]},
        {category: 'Health', userCount: userCounts[2]},
        {category: 'Politics', userCount: userCounts[3]},
        {category: 'Products', userCount: userCounts[4]},
        {category: 'Science&Tech', userCount: userCounts[5]},
        {category: 'Sports', userCount: userCounts[6]},
        {category: 'US', userCount: userCounts[7]},
        {category: 'World', userCount: userCounts[8]},
    ]
    const position = {
        'margin-left': 'auto',
        'margin-right': 'auto'
    }
    return (
      <BarChart style={position}
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="userCount" stackId="a" fill="#8884d8" />
      </BarChart>
  );
    }
const Stats = () => {
    const [userCounts, setUserCounts] = useState([0]);
    useEffect(() => {
        const getCategories = async () => {
            let getCount = (await Promise.all(getCategoriesUserCount(categories))).flat();
            setUserCounts(getCount)
    }
    getCategories()
}, [])

    return (
        <>
            <Header/>
            <div className="App">
                    <h2>Statistics</h2>
                    <h5>Categories by popularity</h5>
                    {BarChartCategories(userCounts)}
            </div>
        </>
    )
}

export default Stats;
