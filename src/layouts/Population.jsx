import { useEffect, useState }from 'react';
import '../styles/graph.scss'
import '../styles/Population.scss'

import { getPopulationLifeExpectancy } from '../services/getPopulationLifeExpectancy';
import { getPopulationBirthDeathOrderB } from '../services/getPopulationBirthDeathOrderB';
import { getPopulationBirthDeathOrderD } from '../services/getPopulationBirthDeathOrderD';

import { AreaChart, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Text } from "@tremor/react";

  
  const dataFormatter = (number) => {
    number = Math.trunc(number);
    return Intl.NumberFormat("us").format(number).toString() + " years";
  };
  

const Population = () =>{

    const[popLifeExpectancy, setPopLifeExpectancy] = useState([]) //Life Expectancy
    const[popBirthDeath, setPopBirthDeath] = useState([]) //Birth and Death Rate

    useEffect(() => {
        getPopulationLifeExpectancy()
        .then((response) => {
            const data_response = response.map(item => {
                return {name: item.CountryName, LifeExpectancy: item.LifeExpectancy}
            }) 
            setPopLifeExpectancy(data_response) 
        })
    }, [])

    useEffect(() => {
        getPopulationBirthDeathOrderD()
        .then((response) => {
            const data_response = response.map(item => {
                return {name: item.CountryName, BirthRate: item.BirthRate_Per1000, DeathRate: item.DeathRate_Per1000}
            })
            console.log(data_response);
            setPopBirthDeath(data_response)
        })
    }, [])

    return(
        <>
            <div className="text-container graph graph-population">
            <h3 className='text-blue-950 text-5xl font-bold'>World Population</h3>
                <p>
                Population is the term typically used to refer to the number of people in a single area. Governments conduct a census to quantify the size of a resident population within a given jurisdiction. The term is also applied to animals, microorganisms, and plants, and has specific uses within such fields as ecology and genetics.
                </p>
                <p>Understanding population data is essential for informed decision making and sustainable development. It enables policymakers to allocate resources effectively, businesses to target specific markets, and researchers to identify societal trends. Additionally, population data plays a crucial role in public health planning and addressing the diverse needs of different populations. Overall, accurate population information empowers us to create inclusive and prosperous societies.</p>
            </div>

            <div className="graph graph-population">
                <AreaChart
                className="h-72 mt-4"
                data={popLifeExpectancy}
                index="name"
                categories={["LifeExpectancy"]}
                colors={["indigo", "cyan"]}
                valueFormatter={dataFormatter}
                />
            </div>

            <div className="graph graph-population">
                <Table className="mt-5 h-full w-full">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Country</TableHeaderCell>
                            <TableHeaderCell>Birth Rate</TableHeaderCell>
                            <TableHeaderCell>Death Rate</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {popBirthDeath.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                            <Text>{item.BirthRate}</Text>
                            </TableCell>
                            <TableCell>
                            <Text>{item.DeathRate}</Text>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
    
}   
export default Population;