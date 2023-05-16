import { useEffect, useState } from 'react';
import '../styles/graph.scss'
import '../styles/Geography.scss'

import { getGeographySurfaceArea } from '../services/getGeographySurfaceArea';
import { getGeographyPopDensity } from '../services/getGeographyPopDensity';

import { BarChart, BarList, Card, Title, Bold, Flex, Text, Dropdown, DropdownItem } from "@tremor/react";


const data2 = [
    {
        name: 'Twitter',
        value: 456,
        
    },
    {
        name: 'Google',
        value: 351,
        
    },
    {
        name: 'GitHub',
        value: 271,
        
    },
    {
        name: 'Reddit',
        value: 191,
        
    },
    {
        name: 'Youtube',
        value: 91,
        
        
    },
];


const Geography = () =>{

    const [surfaceArea, setSurfaceArea] = useState([]); //Surface Area
    const [popDensity, setPopDensity] = useState([]); //Population Density
    const [selectedCountry, setSelectedCountry] = useState({}); //Selected Country

    useEffect(() => {
        getGeographySurfaceArea()
        .then((response) => {
            
            const data_response = response.map(item => {
                return {CountryName: item.CountryName, Code: item.CountryCode, data: [{
                    name: "Surface Area",
                    value: item.SurfaceArea_km2
                }, {
                    name: "Agriculture Land",
                    value: item.AgricultureLand_km2
                },
                {
                    name: "Arable Land",
                    value: item.ArableLand_km2
                }]}
            })
            setSurfaceArea(data_response)
            setSelectedCountry(data_response[0])
        })
    }, [])

    useEffect(() => {
        getGeographyPopDensity()
        .then((response) => {
            const data_response = response.map(item => {
                return {name: item.CountryName, PopulationDensity_km2: item.PopulationDensity_km2}
            }) 
            setPopDensity(data_response) 
        })
    }, [])


    const handleSelect = (valueCountry) => {
        
        const countryItem = surfaceArea.filter(item => item.CountryName === valueCountry)
        setSelectedCountry(countryItem[0])
    } 

    return(
        <>
            <div className="barchart-container graph graph-geography">
                
                <BarChart
                    className="graph h-full"
                    data={popDensity}
                    index="name"
                    categories={["PopulationDensity_km2"]}
                    colors={["cyan"]}
                    suffix
                    layout='vertical'
                    yAxisWidth={48}
                />
            </div>

            <div className="barlist-container graph graph-geography">
                
                <Card className="max-w-full">
                    <Title className='text-4xl font-bold'>Surface Area Comparison</Title>
                    <Flex className="mt-4">
                    <Text>
                        <Bold className='text-xl'>Type</Bold>
                    </Text>
                    <Text>
                        <Bold className='text-xl'>KM2</Bold>
                    </Text>
                    </Flex>
                    <BarList data={selectedCountry.data} className="mt-2" color='fuchsia'/>
                </Card>
                <div className='dropdown-container'>
                    <Dropdown
                        onValueChange={(valueCountry) => handleSelect(valueCountry)}
                        placeholder="Select a country"
                        value={selectedCountry.CountryName}
                        >
                            {surfaceArea.map((item) => {
                                    return <DropdownItem key={item.Code} value={item.CountryName} text={item.CountryName}/>
                                })}
                        
                        </Dropdown>
                 </div>
            </div>

            <div className="text-container graph graph-geography">
                <h3 className='text-blue-950 text-5xl font-bold'>Geography</h3>
                <p>
                Geography and maps are a fundamental language for understanding the world. They provide a framework for organizing and communicating our knowledge. Increasingly geography is used in virtually every field of human endeavor, providing a universal language for understanding, communicating ideas, and providing insights.
                </p>
                <p>Geography is vital for informed decision-making, sustainable development, and environmental conservation. It provides insights into landscapes, resources, and human settlements, aiding urban planning and resource management. Geography fosters global perspectives, connecting us to diverse environments and promoting appreciation for our interconnected world. In summary, geography guides us towards a sustainable future and informs actions for a balanced coexistence with our planet.</p>
            </div>
        </>
    )
    
}   
export default Geography;