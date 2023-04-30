// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import supabase, { supabaseAdmin } from "../../utils/SupabaseCli"

export default async function handler(req, res) {

    
    const checkusers = await supabaseAdmin.auth.admin.listUsers();


    const { data, error } = await supabase.from("user").select("*");
    if (error) {
      console.error(error);
      return res.status(400).json({error:error.message})
    } else {
      const usersWithVerifiedAt = await Promise.all(data.map(async user => {
        const verifiedAt = checkusers.data.users.some(u => u.email === user.email && u.email_confirmed_at !== null);
        const { data, error } = await supabase.from("user").update({ verified_at: verifiedAt }).eq("id", user.id);
        if (error) {
          console.error(error);
        }
        return { ...user, verified_at: verifiedAt };
      }));
      console.log(usersWithVerifiedAt);
      console.log(checkusers.data.users);
    
     res.status(200).json({ Users: data,checkedusers:usersWithVerifiedAt })
    }
        
}

