// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import supabase from "../../utils/SupabaseCli"

export default async function handler(req, res) {

    const {containerId,ownerId} =JSON.parse(req.body);
    console.log(containerId);

    const {data,error} = await supabase.from("container").select("*").eq("containerID",parseInt(containerId) ).eq("ownerID", ownerId)
    console.log(data);
    if(error) res.status(400).json({error:error.message})
    
    else res.status(200).json({ longitude: data[0].longitude, latitude:data[0].latitude })
}

