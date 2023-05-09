
async function getCountryGDP(countrycode) {
    try{
      const response = await fetch(
          `https://dba-backend-production.up.railway.app/api/gdp_countries/${countrycode}`
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getCountryGDP }