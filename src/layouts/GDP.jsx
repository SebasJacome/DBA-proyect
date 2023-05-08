import React, { useEffect, useState } from 'react';
import '../styles/graph.scss'
import { LineChart, Line, BarChart, Bar, Legend, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getGDP_PC } from '../services/getGDP'; 
import { getGDP_Growth } from '../services/getGDP_Growth';       

const GDP = () =>{
    const [data, setData] = useState([]);
    useEffect(() => {
        getGDP_PC()
        .then((response) => {
            const data_response = response.map(item => {
                return {name: item.CountryName, GDP_Per_Capita: item.GDPPerCap_USD}
            }) 
            setData(data_response) 
        })
    }, [])

    const [data2, setData2] = useState([]);
    useEffect(() => {
        getGDP_Growth()
        .then((response) => {
            const data_response = response.map(item => {
                return {name: item.CountryName, GDP_Growth: item.GDPgrowth_Percent}
            })
            setData2(data_response)
        })
    }, [])

    return(
        <>
            <div className="graph">
                <ResponsiveContainer height={"99.9%"} width = {"100%"}>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="graph">
                <ResponsiveContainer height={"99.9%"} width = {"100%"}>
                    <BarChart data={data} margin = {{top: 5, right: 20, bottom: 5, left: 0}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        
                        <Bar dataKey="GDP_Per_Capita" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="graph">
                <ResponsiveContainer height={"99.9%"} width = {"100%"}>
                    <BarChart data={data2} margin = {{top: 5, right: 20, bottom: 5, left: 0}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        
                        <Bar dataKey="GDP_Growth" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
    
}   
export default GDP;