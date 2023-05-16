
async function getPopulationBirthDeath() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/populationBiDe"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getPopulationBirthDeath }