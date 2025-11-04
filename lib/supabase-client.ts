import { supabase } from "./supabase";

export async function createCheck({
  userId,
  name,
  url,
}: {
  userId: string;
  name: string;
  url: string;
}) {
  const { data, error } = await supabase.from("checks").insert([
    {
      user_id: userId,
      name,
      url,
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
}
