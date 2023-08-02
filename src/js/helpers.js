import { TIME_OUT_SECONDS } from "./config.js";
import recipeView from "./views/recipeView.js";
const timeout = async function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
        try{

        }
        catch(err){
            reject(new Error(`Request took too long! Timeout after ${s} second`));

        }
            
        
    }, s * 1000);
  });
};
export const getJSON = async function(url){
    
    try{
    
    const response = await Promise.race([fetch(`${url}`,timeout(TIME_OUT_SECONDS))]);
    const JSONResponse = await response.json();
    console.log(response);
    if(!response.ok) throw new Error(`${JSONResponse.message} (${response.status})`)
    if(response.ok === true){
        
    console.log(JSONResponse);
    return JSONResponse;
    }
    
    }
    catch(err){
        console.log(err);
        recipeView.renderError(err.message);
    }
}

export const sendJSON = async function(url,uploadData){
  try{
    const fetchPro = fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro,timeout(TIME_OUT_SECONDS)]);
    const data = await res.json();
    if(!res.ok){
      throw new Error(`${data.message} (${data.status})`);
    }else{
      return data;
    }
  }catch(err){
    throw err;
  }
}