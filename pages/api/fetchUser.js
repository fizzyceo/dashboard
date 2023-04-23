import supabase from "../../utils/SupabaseCli"

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
    console.log(data.user);
    res.status(200).json({ matricule: data.session.user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
