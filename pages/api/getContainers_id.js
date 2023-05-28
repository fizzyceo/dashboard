
export default function handler(req, res) {
  // Set the path to the Python script
  const {identified_containers} =  req.body;
  console.log("haha",identified_containers);
  
  //update the container's table with the new coordinates
  res.status(200).json({ identified_containers: identified_containers });
//   });
}
