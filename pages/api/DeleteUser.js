// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import supabase, { supabaseSecret } from "../../utils/SupabaseCli"

export default async function handler(req, res) {
    const {userid} = JSON.parse(req.body);
    const { data, error } = await supabase
    .from('user')
    .delete()
    .eq('user_id', userid)
  if (error) {
        
    return res.status(400).json({ error:"problem with the public table"})
  }
  console.log(supabaseSecret);
  const deleted_from_auth = await supabase.auth.admin.deleteUser(userid,supabaseSecret )
  if(deleted_from_auth.error) {
    return res.status(400).json({ error:"problem with the auth table"})
  }
  console.log(deleted_from_auth.data);
    
    return res.status(200).json({ deletedUser: deleted_from_auth.data })
}

