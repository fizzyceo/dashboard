// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import supabase from "../../utils/SupabaseCli"

export default async function handler(req, res) {

    const {data,error} = await supabase.from("user").select("*")
    console.log(data);
    if(error) res.status(400).json({error:error.message})
    
    else res.status(200).json({ Users: data })
}

