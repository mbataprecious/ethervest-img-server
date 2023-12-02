import { default as express } from "express";
import response from '../utils/reponses.mjs';


// import formidable from 'formidable';


export const router = express.Router();




 const getQuoteData = async (req, res) => {
const {query}=req
  try {

    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const searchQuery = {
        vs_currency: "usd",
      ...query
    };
    
    const queryParams = new URLSearchParams(searchQuery);
    const fullUrl = `${url}?${queryParams}`;
   console.log({fullUrl}) 
  const fetchRes= await fetch(fullUrl)
  console.log({fetchRes})
      const data= await fetchRes.json()   
    // console.log({mappedData})
    response(res, 200, "fetched successfully", data);
  } catch (err) {
    console.log(err);
    return response(res, 500, err.message, null);
  }
};



router.get("/markets", getQuoteData );


