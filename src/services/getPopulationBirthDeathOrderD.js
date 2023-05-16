
async function getPopulationBirthDeathOrderD() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/populationBiDeOrderDeath"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getPopulationBirthDeathOrderD }