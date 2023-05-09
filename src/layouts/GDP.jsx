import React, { useEffect, useState } from 'react';
import '../styles/graph.scss'
import { LineChart, Line, BarChart, Bar, Legend, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getGDP_PC } from '../services/getGDP'; 
import { getGDP_Growth } from '../services/getGDP_Growth';   
import { getCountryCode } from '../services/getCountries';    
import { getCountryGDP } from '../services/getCountryGDP';

const GDP = () =>{
    const [data, setData] = useState([]); //GDP Per Capita
    const [data2, setData2] = useState([]); // GDP Growth
    const [data3, setData3] = useState([]); //Country Code
    const [data4, setData4] = useState([]); //Country GDP

    useEffect(() => {
        getGDP_PC()
        .then((response) => {
            const data_response = response.map(item => {
                return {name: item.CountryName, GDP_Per_Capita: item.GDPPerCap_USD}
            }) 
            setData(data_response) 
        })
    }, [])

    useEffect(() => {
        getGDP_Growth()
        .then((response) => {
            const data_response = response.map(item => {
                return {name: item.CountryName, GDP_Growth: item.GDPgrowth_Percent}
            })
            setData2(data_response)
        })
    }, [])

    useEffect(() => {
        getCountryCode()
        .then((response) => {
            const data_response = response.map(item => {
                return {name: item.CountryName, Code: item.CountryCode}
            })
            setData3(data_response)
        })
    }, [])

    const handleSelect = (e) => {
        const selectedCountry = e.target.value;
        const countryItem = data3.filter(item => item.name === selectedCountry)
        if(countryItem.length > 0){
            const countryCode = countryItem[0].Code
            getCountryGDP(countryCode)
            .then((response) => {
                response.GDP_USD = response.GDP_USD / 1000000
                setData4([response])
            })
        }
    } 

    
    return(
        <>
            <div className="graph contains-datalist">
                <div className="datalist-container">
                    <input type='text' list="gdp-countries-data" placeholder = "Select a country" onChange={handleSelect}/>
                    <datalist id="gdp-countries-data">
                        {data3.map((item, index) => {
                            return <option key={index} value={item.name}/>
                        })}
                    </datalist>
                    
                </div>
                <div className="graph-container">
                    <ResponsiveContainer height={"99.9%"} width = {"100%"}>
                        <BarChart data={data4} margin = {{top: 5, right: 20, bottom: 5, left: 0}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="CountryName"/>
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar type="monotone" dataKey="GDP_USD" fill="#82ca9d" />
                            <Bar type="monotone" dataKey="GDPgrowth_Percent" fill="red" />
                            <Bar type="monotone" dataKey="GDPPerCap_USD" fill="blue" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
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