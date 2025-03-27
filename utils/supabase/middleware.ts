import {createServerClient} from "@supabase/ssr";
import {type NextRequest, NextResponse} from "next/server";

// List of protected paths that require user registration to access
const protectedPaths = ['/dashboard', '/profile', '/settings']; // add more paths as needed

export const updateSession = async (request: NextRequest) => {
    try {
        // Create an unmodified response
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({name, value}) =>
                            request.cookies.set(name, value),
                        );
                        response = NextResponse.next({
                            request,
                        });
                        cookiesToSet.forEach(({name, value, options}) =>
                            response.cookies.set(name, value, options),
                        );
                    },
                },
            },
        );

        // This will refresh session if expired - required for Server Components
        const user = await supabase.auth.getUser();
        const user_id = user.data.user?.id;

        // Check if the user is authenticated
        if (!user.data.user) {
            // If the user is not logged in and trying to access a protected page, redirect to log in
            if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
                return NextResponse.redirect(new URL("/sign-in", request.url));
            }
            return response; // For public paths, just continue without any changes
        }

        // Check registration status if the user is authenticated
        const registration_completed = await supabase.from("profile")
            .select("registration_complete")
            .eq("user_id", user_id)
            .single();

        if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
            // If registration is not completed, redirect to profile completion page
            if (registration_completed.error || !registration_completed.data?.registration_complete) {
                return NextResponse.redirect(new URL("/complete/profile", request.url));
            }
        }

        // If the user is on the homepage and is logged in, redirect to dashboard if registration is completed
        if (request.nextUrl.pathname === "/" && user.data.user && registration_completed.data?.registration_complete) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // If the user is on the complete profile page but their profile is already complete, redirect to dashboard
        if (request.nextUrl.pathname === "/complete/profile" && user.data.user && registration_completed.data?.registration_complete) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return response;

    } catch (e) {
        console.error("Error in Supabase middleware:", e);
        // If there's an error, return a default response
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }
};
