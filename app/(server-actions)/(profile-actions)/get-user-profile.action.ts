"use server";

import {createClient} from "@/utils/supabase/server";

export const getUserProfileAction = async () => {
    const supabase = await createClient();
    const authUser = await supabase.auth.getUser();
    const profile = await supabase.from("profile").select("*").eq("user_id", authUser.data.user?.id).single();

    return {
        ...authUser.data.user,
        ...profile.data
    };
}