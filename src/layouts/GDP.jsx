import React, { useEffect } from 'react';
import '../styles/graph.scss'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getGDP_PC } from '../services/getGDP';
const data = [{name: 'Page A', uv: 200, pv:2400, amt:2400},
              {name: 'Page B', uv: 300, pv:2400, amt:2400},
              {name: 'Page C', uv: 400, pv:2400, amt:2400},
              {name: 'Page D', uv: 200, pv:2400, amt:2400}];

const GDP = () =>{
    useEffect(() => {
        getGDP_PC()
        .then((data) => console.log(data))
            
        
        
    }, [])
    return(
        <>
            <div className="graph">
                <ResponsiveContainer height={"90%"}>
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
                <ResponsiveContainer height={"90%"}>
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
                <ResponsiveContainer height={"90%"}>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
    
}   
export default GDP;