
async function getGDP() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/gdp"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getGDP }