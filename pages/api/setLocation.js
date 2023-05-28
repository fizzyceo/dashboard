import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { container_id ,ownerID} =JSON.parse(req.body);

  console.log(container_id,ownerID);
  if (!container_id || typeof container_id !== 'string') {
    res.status(400).json({ message: 'Invalid or missing container_id' });
    return;
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ container_id })
};

try{  

const response = await fetch('http://127.0.0.1:5000/Receiver', options)
  const data =await response.text();
  console.log(data);
  res.status(200).json(data);

}catch(error){
  console.error(error);
  res.status(500).json({ message: 'Error sending data' });

}
  
}
