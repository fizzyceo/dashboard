import fetch from 'node-fetch';

export default function handler(req, res) {
  const { container_id } =req.body;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ container_id })
};

  fetch('http://127.0.0.1:5000/Receiver', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(data => {
      console.log(data);
      res.status(200).json({ message: 'Data sent successfully' });
    })
    .catch(error => {
      console.error(error,"////////////////");
      res.status(500).json({ message: 'Error sending data' });
    });
}
