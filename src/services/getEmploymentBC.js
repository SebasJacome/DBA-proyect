
async function getEmploymentBC() {
    try{
      const response = await fetch(
          "https://dba-backend-production.up.railway.app/api/employmentBC"
        );
        const data = await response.json();
        return data;
    }
    catch(error){
      console.log(error);
    }
}

export { getEmploymentBC }