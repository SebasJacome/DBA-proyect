
async function getGeographySurfaceArea() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/geographySurfaceArea"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getGeographySurfaceArea }