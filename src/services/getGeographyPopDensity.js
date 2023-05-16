
async function getGeographyPopDensity() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/geographyPopDensity"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getGeographyPopDensity }