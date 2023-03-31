import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://worldwide-recipes1.p.rapidapi.com/api/explore',
  headers: {
    'X-RapidAPI-Key': 'f1a3dd28f2msh166dbf53fa0e95dp10c1f1jsnfaba429a1c08',
    'X-RapidAPI-Host': 'worldwide-recipes1.p.rapidapi.com'
  }
};

  export const fetchFoods = async ({setFoods,setLoading}) => {
    
    try {
        setLoading(true);
        if(typeof setFoods === 'function') {
          const { data: { results } } = await axios.request(options);
          setFoods(results.feed);
        }

         return setLoading(false);
 
      } catch(err) {
        return err;
      }

  }

  export const fetchFood = async (id,setFood) => {
    try {
      if(typeof setFood === 'function') {
        const { data } = await axios.request({
          ...options, 
          params: {
            canonical_term:id
          }
        });
        return setFood(data.results.feed[0]);
    }

    return 'error';
    } catch(err) {
      return err;
    }
  }

  //food detail 

 