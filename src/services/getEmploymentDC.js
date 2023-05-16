
async function getEmploymentDC() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/employmentDC"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
  }
  
  export { getEmploymentDC }