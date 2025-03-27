import {Card, CardContent} from '@/components/ui/card'
import {Shield, Users} from 'lucide-react'
import CircleSketch from "@/components/svg-components/circle-sketch";
import FingerprintScan from "@/components/svg-components/fingerprint-scan";
import InternetSpeedGraph from "@/components/svg-components/internet-speed-graph";
import Image from "next/image";

export default function FeaturesSection() {
    return (
        <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-3xl text-center mb-8 font-semibold">Features</div>
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-3">
                        <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
                            <CardContent className="relative m-auto size-fit pt-6">
                                <div className="relative flex h-24 w-56 items-center">
                                    <CircleSketch/>
                                    <span className="mx-auto block w-fit text-4xl font-semibold">Gamified</span>
                                </div>
                                <h2 className="mt-6 text-center text-3xl font-semibold">Cyber Security Training</h2>
                                <p className="text-center text-foreground mt-4">
                                    Experience immersive gamified cybersecurity scenarios that replicate real-world
                                    threats, turning learning into an engaging challenge
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                            <CardContent className="pt-6">
                                <div
                                    className="relative mx-auto flex aspect-square size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                    <FingerprintScan/>
                                </div>
                                <div className="relative z-10 mt-6 space-y-2 text-center">
                                    <h2 className="group-hover:text-secondary-950 text-lg font-medium transition dark:text-white">Built-in
                                        Security</h2>
                                    <p className="text-foreground">
                                        From day one, enjoy top-tier security that keeps your data safe while you train.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                            <CardContent className="pt-6">
                                <div className="pt-6 lg:px-6">
                                    <InternetSpeedGraph/>
                                </div>
                                <div className="relative z-10 mt-14 space-y-2 text-center">
                                    <h2 className="text-lg font-medium transition">Speedy Simulations</h2>
                                    <p className="text-foreground">
                                        Run simulations at lightning speed, so you can focus on honing your skills, not
                                        waiting.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3">
                            <CardContent className="grid pt-6 sm:grid-cols-2">
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                    <div
                                        className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                        <Shield className="m-auto size-5" strokeWidth={1}/>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="group-hover:text-secondary-950 text-lg font-medium text-zinc-800 transition dark:text-white">Stronger
                                            Protection</h2>
                                        <p className="text-foreground">
                                            Your data is protected with state-of-the-art security, ensuring safe
                                            training every time.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="rounded-tl-(--radius) relative -mb-6 -mr-6 mt-6 h-fit border-l border-t p-6 py-6 sm:ml-6">
                                    <div className="absolute left-3 top-2 flex gap-1">
                                        <span
                                            className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                        <span
                                            className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                        <span
                                            className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                    </div>

                                    <Shield className="m-auto size-43" strokeWidth={1}/>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3">
                            <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                    <div
                                        className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                        <Users className="m-auto size-6" strokeWidth={1}/>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-medium transition">Train Together</h2>
                                        <p className="text-foreground">
                                            Work as a team! Collaborate on tasks and sharpen both your offensive and
                                            defensive skills.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="before:bg-(--color-border) relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                                    <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                                        <div
                                            className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                                            <span
                                                className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">Likeur</span>
                                            <div className="ring-background size-7 ring-4">
                                                <Image
                                                    className="size-full rounded-full"
                                                    src="https://avatars.githubusercontent.com/u/102558960?v=4"
                                                    alt=""
                                                    height="100" width="100"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                                            <div className="ring-background size-8 ring-4">
                                                <Image
                                                    className="size-full rounded-full"
                                                    src="https://avatars.githubusercontent.com/u/47919550?v=4" alt=""
                                                    height="100" width="100"
                                                />
                                            </div>
                                            <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">M. Irung</span>
                                        </div>
                                        <div
                                            className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                                            <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">B. Ng</span>
                                            <div className="ring-background size-7 ring-4">
                                                <Image
                                                    className="size-full rounded-full"
                                                    src="https://avatars.githubusercontent.com/u/31113941?v=4"
                                                    alt=""
                                                    height="100" width="100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

    )
}
