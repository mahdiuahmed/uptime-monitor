import { supabase } from "./supabase";

export async function createCheck({
  userId,
  name,
  url,
}: // interval_minutes,
{
  userId: string;
  name: string;
  url: string;
  // interval_minutes: number;
}) {
  const { data, error } = await supabase.from("checks").insert([
    {
      user_id: userId,
      name,
      url,
      // interval_minutes,
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
}
