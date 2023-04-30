import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ;
const supabaseSecret = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ;


const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabaseSecret,supabaseKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecret);
export default supabase;