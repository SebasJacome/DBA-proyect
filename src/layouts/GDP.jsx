import React, { useEffect, useState } from 'react';
import '../styles/graph.scss'
import '../styles/GDP-Graph.scss'
import { getGDP_PC } from '../services/getGDP'; 
import { getGDP_Growth } from '../services/getGDP_Growth';   
import { getCountryCode } from '../services/getCountries';    
import { getCountryGDP } from '../services/getCountryGDP';



import { Card, Title, BarChart, Subtitle, Metric, Text, Dropdown, DropdownItem  } from "@tremor/react";

const dataFormatter_dollars = (number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const dataFormatter_percentage = (number) => {
    return Intl.NumberFormat("us").format(number).toString() + " %";
};


const GDP = () =>{
    const [data, setData] = useState([]); //GDP Per Capita
    const [data2, setData2] = useState([]); // GDP Growth
    const [data3, setData3] = useState([]); //Country Code
    const [data4, setData4] = useState({}); //Country GDP

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

    const handleSelect = (selectedCountry) => {
        
        const countryItem = data3.filter(item => item.name === selectedCountry)
        if(countryItem.length > 0){
            const countryCode = countryItem[0].Code
            getCountryGDP(countryCode)
            .then((response) => {
                response.GDP_USD = response.GDP_USD 
                console.log(response)
                setData4(response)
            })
        }
    } 

    
    return(
        <>
            <div className="graph contains-cards">
                <div className='left-container'>
                    <div className='dropdown-container'>
                        {/* <input type='text' list="gdp-countries-data" placeholder = "Select a country" onChange={handleSelect}/>
                        <datalist id="gdp-countries-data">
                            {data3.map((item, index) => {
                                return <option key={index} value={item.name}/>
                            })}
                        </datalist>  */}

                        <Dropdown
                        onValueChange={(selectedCountry) => handleSelect(selectedCountry)}
                        placeholder="Select a country"
                        >
                            {data3.map((item, index) => {
                                return <DropdownItem key={index} value={item.name} text={item.name}/>
                            })}
                        
                        </Dropdown>

                    </div>
                    <div className='cards-container'>
                        {
                            Object.keys(data4).length != 4 ? 
                            (<h3 className='text-neutral-400'>Waiting for your selection...</h3>):(
                                <>
                                    <Card className="max-w-sm" decoration="top" decorationColor="red">
                                        <Text className='text-slate-600 text-2xl'>GDP USD</Text>
                                        <Metric>${data4.GDP_USD}</Metric>
                                    </Card>
                                    <Card className="max-w-sm" decoration="top" decorationColor="lime">
                                        <Text className='text-slate-600 text-2xl'>GDP Growth Percent</Text>
                                        <Metric>{data4.GDPgrowth_Percent}%</Metric>
                                    </Card>
                                    <Card className="max-w-sm" decoration="top" decorationColor="cyan">
                                        <Text className='text-slate-600 text-2xl'>GDP Per Capita</Text>
                                        <Metric>${data4.GDPPerCap_USD}</Metric>
                                    </Card>
                                </>
                            )
                        }
                        
                    </div>
                </div>

                <div className='right-container'>
                    <h3 className='text-blue-950 text-5xl font-bold'>Gross Domestic Product</h3>
                    <p>Gross domestic product (GDP) is the standard measure of the value added created through the production of goods and services in a country during a certain period. As such, it also measures the income earned from that production, or the total amount spent on final goods and services (less imports).</p>
                    <p>While GDP is the single most important indicator to capture economic activity, it falls short of providing a suitable measure of people's material well-being for which alternative indicators may be more appropriate.</p>
                    <p>This indicator is based on nominal GDP (also called GDP at current prices or GDP in value) and is available in different measures: US dollars and US dollars per capita (current PPPs). All OECD countries compile their data according to the 2008 System of National Accounts (SNA).</p>
                </div>


            </div>


            <BarChart
                className="graph h-full"
                data={data}
                index="name"
                categories={["GDP_Per_Capita"]}
                colors={["rose"]}
                valueFormatter={dataFormatter_dollars}
                yAxisWidth={48}
            />

            <BarChart
                className="graph h-full"
                data={data2}
                index="name"
                categories={["GDP_Growth"]}
                colors={["yellow"]}
                valueFormatter={dataFormatter_percentage}
                yAxisWidth={48}
            />
            
        </>
    )
    
}   
export default GDP;

{/* <input type='text' list="gdp-countries-data" placeholder = "Select a country" onChange={handleSelect}/>
                    <datalist id="gdp-countries-data">
                        {data3.map((item, index) => {
                            return <option key={index} value={item.name}/>
                        })}
                    </datalist> */}