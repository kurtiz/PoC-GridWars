"use server";

import {encodedRedirect} from "@/utils/utils";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;

    if (error) {
        return encodedRedirect("error", "/sign-in", error.message);
    }

    const registration_completed = await supabase.from("profile").select("registration_complete").eq("user_id", user_id).single();

    if (!registration_completed.data) return redirect("/dashboard/complete/profile");

    return redirect("/dashboard");
};
