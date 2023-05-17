import React, { useEffect, useState } from 'react';
import '../styles/graph.scss'
import '../styles/Dashboard.scss'
import WorldMap from 'react-svg-worldmap';
import countries from 'i18n-iso-countries';

import { getPopulation } from '../services/getPopulation';

import { getEmployment } from '../services/getEmployment';

import { getGDP } from '../services/getGDP_world';

import { getSurfaceArea } from '../services/getSurfaceArea';


import { Dropdown, DropdownItem  } from "@tremor/react";

const dropdownValues = {
    population: {value: 'population', color: 'blue', valueSuffix: ' People'},
    employment: {value: 'employment', color: 'red', valueSuffix: ' %'},
    gdp: {value: 'gdp', color: 'yellow', valueSuffix: ' USD'},
    surfaceArea: {value: 'surfaceArea', color: 'green', valueSuffix: ' km2'}
}


const Dashboard = () =>{



    const [population, setPopulation] = useState([]); //Country Code
    const [surfaceArea, setSurfaceArea] = useState([]); //Surface Area
    const [gdp, setGDP] = useState([]); //GDP
    const [employment, setEmployment] = useState([]); //Employment

    const [mapInfo, setMapInfo] = useState({...dropdownValues.population, data: population}); //MapInfo

    
    useEffect(() => {
        getPopulation()
        .then((response) => {
            const data_response = response.reduce((accumulator, item) => {
                const countrycodealpha2 = countries.alpha3ToAlpha2(item.CountryCode);
                if (countrycodealpha2) {
                    accumulator.push({ country: countrycodealpha2, value: item.Population ?? 0 });
                }
                return accumulator;
            }, []);
            setPopulation(data_response) 
            setMapInfo({...dropdownValues.population, data:data_response})
        })
    }, [])
    

    

    useEffect(() => {
        getEmployment()
        .then((response) => {
            const data_response = response.reduce((accumulator, item) => {
                const countrycodealpha2 = countries.alpha3ToAlpha2(item.CountryCode);
                if (countrycodealpha2) {
                    accumulator.push({ country: countrycodealpha2, value: item.Employment_Percent ?? 0 });
                }
                return accumulator;
            }, []);
           
            setEmployment(data_response) 
        })
    }, [])

    useEffect(() => {
        getGDP()
        .then((response) => {
            const data_response = response.reduce((accumulator, item) => {
                const countrycodealpha2 = countries.alpha3ToAlpha2(item.CountryCode);
                if (countrycodealpha2) {
                    accumulator.push({ country: countrycodealpha2, value: item.GDP_USD ?? 0 });
                }
                return accumulator;
            }, []);
            setGDP(data_response) 
        })
    }, [])
    
    useEffect(() => {
        getSurfaceArea()
        .then((response) => {
            const data_response = response.reduce((accumulator, item) => {
                const countrycodealpha2 = countries.alpha3ToAlpha2(item.CountryCode);
                if (countrycodealpha2) {
                    accumulator.push({ country: countrycodealpha2, value: item.SurfaceArea_km2 ?? 0 });
                }
                return accumulator;
            }, []);
            setSurfaceArea(data_response) 
        })
    }, [])

    const handleSelect = (value) => {
        switch (value) {
            case dropdownValues.population.value:
                setMapInfo({...dropdownValues.population, data:population})
                break;
            case dropdownValues.employment.value:
                setMapInfo({...dropdownValues.employment, data:employment})
                break;
            case dropdownValues.gdp.value:
                setMapInfo({...dropdownValues.gdp, data:gdp})
                break;
            case dropdownValues.surfaceArea.value:
                setMapInfo({...dropdownValues.surfaceArea, data:surfaceArea})
                break;
            default:
                setMapInfo({...dropdownValues.population, data:population})
                break;

        
        }
    }


    return(


        <div className='graph dashboard-container'>
            <WorldMap
                color={mapInfo.color}
                valueSuffix={mapInfo.valueSuffix}
                size="xxl"
                data={mapInfo.data}
            />

            <div className='dropdown-container'>
                <Dropdown
                    className="mt-2"
                    onValueChange={(value) => handleSelect(value)}
                    value={mapInfo.value}
                    >
                    <DropdownItem value={dropdownValues.population.value} text="Population" />
                    <DropdownItem value={dropdownValues.gdp.value} text="GDP" />
                    <DropdownItem value={dropdownValues.employment.value} text="Employment" />
                    <DropdownItem value={dropdownValues.surfaceArea.value} text="Surface Area" />
                </Dropdown>
            </div>
        </div>
    )
    
}   
export default Dashboard;