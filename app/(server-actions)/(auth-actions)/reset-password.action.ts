"use server";

import {createClient} from "@/utils/supabase/server";
import {encodedRedirect} from "@/utils/utils";

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            "/dashboard/reset-password",
            "Password and confirm password are required",
        );
    }

    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            "/dashboard/reset-password",
            "Passwords do not match",
        );
    }

    const {error} = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        encodedRedirect(
            "error",
            "/dashboard/reset-password",
            "Password update failed",
        );
    }

    encodedRedirect("success", "/dashboard/reset-password", "Password updated");
};
