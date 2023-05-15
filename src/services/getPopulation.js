
async function getPopulation() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/population"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getPopulation }