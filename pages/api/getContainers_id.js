import supabase from "../../utils/SupabaseCli"

export default async function handler(req, res) {
  // Set the path to the Python script
  const {identified_containers} =  req.body;
  console.log("haha",identified_containers);
  const {data,error} = await supabase.from("container").update({
    latitude:identified_containers.Latitude,
  longitude:identified_containers.Longitude 
  })
  .eq("containerID",identified_containers.container_id)
  .eq("ownerID",identified_containers.owner_id)
  console.log(data);
  if(error) res.status(400).json({error:error.message})
  //update the container's table with the new coordinates
  res.status(200).json({ identified_containers: identified_containers });
//   });
}
