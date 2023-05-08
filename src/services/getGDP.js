
async function getGDP_PC() {
  try{
    const response = await fetch(
        "https://dba-backend-production.up.railway.app/api/gdp_pc"
      );
      const data = await response.json();
      return data;
  }
  catch(error){
    console.log(error);
  }
}

export { getGDP_PC }