
async function getCountryCode() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/countrycode"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getCountryCode }