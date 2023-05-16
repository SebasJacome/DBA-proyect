import { useEffect, useState } from 'react';
import '../styles/graph.scss'
import '../styles/Employment.scss'
import { getEmploymentBC } from '../services/getEmploymentBC';
import { getEmploymentDC } from '../services/getEmploymentDC';

import { BarChart, Dropdown, DropdownItem, DonutChart, Legend  } from "@tremor/react";

const valueFormatter = (number) =>{
    return Intl.NumberFormat("us").format(number).toString() + "%";
};

const categories = ["Agriculture Employees Percent", "Industry Employees Percent", "Services Employees Percent"]

const Employment = () =>{

    const [employmentDC, setEmploymentDC] = useState([]); //Employment Percentage
    const [employmentBC, setEmploymentBC] = useState([]); //Employment Percentage
    const [selectedCountry, setSelectedCountry] = useState({}); //Selected Country

    useEffect(() => {
        getEmploymentDC()
        .then((response) => {
            
            const data_response = response.map(item => {
                return {CountryName: item.CountryName, Code: item.CountryCode, data: [{
                    name: "Agriculture Employees Percent",
                    numericInfo: item.AgricultureEmployees_Percent
                }, {
                    name: "Industry Employees Percent",
                    numericInfo: item.IndustryEmployees_Percent
                },
                {
                    name: "Service Employees Percent",
                    numericInfo: item.ServicesEmployees_Percent
                }]}
            })
            setEmploymentDC(data_response)
            setSelectedCountry(data_response[0])
        })
    }, [])

    useEffect(() => {
        getEmploymentBC()
        .then((response) => {
            setEmploymentBC(response)
        })
    }, [])

    const handleSelect = (valueCountry) => {
        
        const countryItem = employmentDC.filter(item => item.CountryName === valueCountry)
        setSelectedCountry(countryItem[0])
    } 

    return(
        <>
            <div className='donutChart-container graph employment-graph'>
                 <div className='dropdown-container'>
                    <Dropdown
                    onValueChange={(valueCountry) => handleSelect(valueCountry)}
                    placeholder="Select a country"
                    value={selectedCountry.CountryName}
                    >
                        {employmentDC.map((item) => {
                                return <DropdownItem key={item.Code} value={item.CountryName} text={item.CountryName}/>
                            })}
                    
                    </Dropdown>
                 </div>

                 <DonutChart
                        className="h-full"
                        data={selectedCountry.data}
                        category={"numericInfo"}
                        index="name"
                        valueFormatter={valueFormatter}
                        colors={["red", "blue", "green"]}
                        label='Total Employment Percentage'
                    />
                <div className='legend-container'>
                    <Legend
                    categories={categories}
                    colors={["red", "blue", "green"]}
                    />
                </div>

            </div>

            <BarChart
            className="graph employment-graph h-full"
            data={employmentBC}
            index= {"CountryName"}
            categories={["Employment_Percent"]}
            colors={["yellow"]}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
            />

           
        </>
    )
    
}   
export default Employment;