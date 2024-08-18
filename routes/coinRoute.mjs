import { default as express } from "express";
import response from '../utils/reponses.mjs';


// import formidable from 'formidable';


export const router = express.Router();




const getQuoteData = async (req, res) => {
  const { query } = req
  try {

    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const searchQuery = {
      vs_currency: "usd",
      ...query
    };
    const keyArray=['CG-mmxhLYJTDGm9dNb3uJSKkgn9','CG-Ya7462oMzxHmdvBxvCBhQSgs']
// Generate a random index based on the array length
const randomIndex = Math.floor(Math.random() * keyArray.length);

// Use the random index to pick a random element
const selectedKey = keyArray[randomIndex];
    const queryParams = new URLSearchParams(searchQuery);
    const fullUrl = `${url}?${queryParams.toString()}`;
    console.log({ fullUrl })
    const fetchRes = await fetch(fullUrl,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': selectedKey,
      },
    })
    console.log({ fetchRes })
    if (!fetchRes.ok) {
      throw new Error(`HTTP error! status: ${fetchRes.status}`);
    }
    const data = await fetchRes.json()
    // console.log({mappedData})
    response(res, 200, "fetched successfully", data);
  } catch (err) {
    console.log(err);
    return response(res, 500, err.message, null);
  }
};



router.get("/markets", getQuoteData);


