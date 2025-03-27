import {signInAction} from "@/app/(server-actions)/(auth-actions)/sign-in.actions";
import {FormMessage, Message} from "@/components/form-message";
import {SubmitButton} from "@/components/submit-button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";

export default async function SignIn(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>
                    Enter your credentials to sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col">
                    <div className="flex flex-col gap-2 [&>input]:mb-3">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" placeholder="you@example.com" required/>
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                className="text-xs text-foreground underline"
                                href="/forgot-password"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            required
                        />
                        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                            Sign in
                        </SubmitButton>
                        <FormMessage message={searchParams}/>

                        <p className="text-xs text-muted-foreground">
                            Don&#39;t have an account?{" "}
                            <Link className="text-foreground font-medium underline" href="/sign-up">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
