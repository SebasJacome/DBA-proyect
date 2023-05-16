
async function getPopulationLifeExpectancy() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/populationLife"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getPopulationLifeExpectancy }