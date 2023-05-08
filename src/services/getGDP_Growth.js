
async function getGDP_Growth() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/gdp_growth"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
  }
  
  export { getGDP_Growth }