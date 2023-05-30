import fetch from 'node-fetch';
import supabase from '../../utils/SupabaseCli';

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.from('container').select('*');

    if (error) {
      throw new Error(error.message);
    }
    console.log('UNSENT DATA');
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ containers: data })
    };

    const response = await fetch('http://127.0.0.1:5000/Receiver', options);
    
    if (response.ok) {
      console.log("this is the response data");
      const responseData = await response.json();
      console.log(responseData);
      //update the databse with the response 
      responseData.map(async (container) => {
        const {data,error} = await supabase.from("container").update({
          latitude:container.Longitude,
          longitude:container.Latitude,
          
        }).eq("containerID",container.container_id).eq("ownerID",container.owner_id);
        if(error){ 
          setError(error.message)
          throw error.message
        }
      })
      
      res.status(200).json({ message: 'Data sent successfully' ,coordinatesData: responseData });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (error) {
    console.error(error, '////////////////');
    res.status(500).json({ message: 'Error sending data' });
  }
}
