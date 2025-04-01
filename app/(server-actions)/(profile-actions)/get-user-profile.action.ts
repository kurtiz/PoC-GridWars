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

export const getUserProfileWithTeamAction = async () => {
    const supabase = await createClient();
    const authUser = await supabase.auth.getUser();

    if (!authUser.data.user) {
        throw new Error("User not authenticated");
    }

    const {data: profile, error} = await supabase
        .from("profile")
        .select(`
            *,
            cyber_team: user_cyber_team (id, team_name, team_role, color, has_specialization),
            specialization: user_specialization (id, specialization_title, cyber_team_id)
        `)
        .eq("user_id", authUser.data.user.id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return {
        ...authUser.data.user,
        ...profile
    };
};
