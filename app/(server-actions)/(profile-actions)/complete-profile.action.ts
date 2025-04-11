"use server";

import {createClient} from "@/utils/supabase/server";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export const completeProfile = async (formData: FormData) => {
    const user_name = formData.get("username")?.toString();
    const user_alias = formData.get("alias")?.toString();
    const user_cyber_team = formData.get("selectedTeam")?.toString();
    const user_specialization = formData.get("selectedSpecialization")?.toString() || null;

    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const user = await supabase.auth.getUser();

    const user_id = user.data.user?.id
    const {error} = await supabase.from("profile").insert({
        user_name,
        user_alias,
        user_cyber_team,
        user_specialization,
        registration_complete: true,
    }).eq("user_id", user_id);

    if (error) {
        console.error("Error completing profile:", error);
        throw new Error("Failed to complete profile");
    }

    return redirect(`${origin}/map`);

};