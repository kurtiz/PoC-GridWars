'use client'
import React from 'react'
import Link from 'next/link'
import {Logo} from '@/components/logo'
import {ArrowDown, Menu, Rocket, X} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Image from 'next/image'
import {ThemeSwitcher} from "@/components/theme-switcher";

// const menuItems: = []

export default function HeroSection() {
    const [menuState, setMenuState] = React.useState(false)

    return (
        <>
            <header>
                <nav data-state={menuState && 'active'}
                     className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent motion-preset-blur-down-lg">
                    <div className="m-auto max-w-5xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Link href="/public" aria-label="home" className="flex items-center space-x-2 gap-2">
                                    <Logo/> 00 Sec App
                                </Link>

                                <button onClick={() => setMenuState(!menuState)}
                                        aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                        className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0
                                    in-data-[state=active]:opacity-0 m-auto size-6 duration-200"/>

                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100
                                    in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180
                                    scale-0 opacity-0 duration-200"/>
                                </button>
                            </div>

                            <div
                                className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                                {/*<div className="lg:pr-4">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link href={item.href}
                                                      className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>*/}

                                <div
                                    className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="/sign-in">
                                            <span>Sign In</span>
                                        </Link>
                                    </Button>
                                    <Button asChild size="sm">
                                        <Link href="/sign-up">
                                            <span>Sign Up</span>
                                        </Link>
                                    </Button>
                                </div>

                                <ThemeSwitcher className="motion-preset-fade delay-300"/>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="overflow-hidden">
                <section>
                    <div className="relative pt-24">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="max-w-3xl text-center sm:mx-auto lg:mr-auto lg:mt-0 lg:w-4/5">
                                <Link href="/public"
                                      className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3 motion-preset-blur-up-lg">
                                    <span
                                        className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">New</span>
                                    <span className="text-sm">Introduction</span>
                                    <span className="bg-(--color-border) block h-4 w-px"></span>

                                    <ArrowDown className="size-4"/>
                                </Link>

                                <h1 className="mt-8 text-balance text-4xl font-semibold md:text-5xl xl:text-6xl xl:[line-height:1.125] motion-preset-blur-up-lg motion-delay-100">
                                    Unleash Your Cyber Skills: Red vs. Blue
                                </h1>
                                <p className="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg sm:block motion-preset-blur-up-lg motion-delay-[250ms]">
                                    Join the ultimate cybersecurity challenge. Whether you&#39;re attacking or
                                    defending,
                                    test your skills and build real-world experience in a simulated corporate
                                    environment.
                                </p>
                                <p className="mx-auto mt-6 max-w-2xl text-wrap sm:hidden motion-preset-blur-up-lg motion-delay-[250ms]">
                                    Ready to take on the challenge? Become part of the Red or Blue team and simulate
                                    real-world cyber attacks and defense scenarios.
                                </p>

                                <div className="mt-8 motion-preset-blur-up-lg motion-delay-[350ms]">
                                    <Button size="lg" asChild>
                                        <Link href="/sign-in">
                                            <Rocket className="relative size-4"/>
                                            <span className="text-nowrap">Start Your Mission</span>
                                        </Link>
                                    </Button>
                                </div>

                            </div>
                        </div>
                        <div className="relative mt-16">
                            <div aria-hidden
                                 className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"/>
                            <div className="relative mx-auto max-w-6xl overflow-hidden px-4">
                                <Image
                                    className="z-2 border-border/25 relative hidden rounded-2xl border dark:block motion-preset-blur-up-lg"
                                    src="/img/hero/dashboard-dark.png" alt="app screen" width={2796} height={2008}/>
                                <Image
                                    className="z-2 border-border/25 relative rounded-2xl border dark:hidden motion-preset-blur-up-lg"
                                    src="/img/hero/dashboard-light.png" alt="app screen" width={2796} height={2008}/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-background relative z-10 pb-16">
                    <div className="m-auto max-w-5xl px-6">
                        <h2 className="text-center text-lg font-medium">Your favorite companies are our partners.</h2>
                        <div
                            className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
                            <Image className="h-5 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/nvidia.svg" alt="Nvidia Logo"
                                   height="20" width="20"/>
                            <Image className="h-4 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/column.svg" alt="Column Logo"
                                   height="16" width="20"/>
                            <Image className="h-4 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/github.svg" alt="GitHub Logo"
                                   height="16" width="20"/>
                            <Image className="h-5 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/nike.svg" alt="Nike Logo" height="20"
                                   width="20"/>
                            <Image className="h-4 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/laravel.svg" alt="Laravel Logo"
                                   height="16" width="20"/>
                            <Image className="h-7 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/lilly.svg" alt="Lilly Logo" height="28"
                                   width="20"/>
                            <Image className="h-5 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                   alt="Lemon Squeezy Logo" height="20" width="20"/>
                            <Image className="h-6 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/openai.svg" alt="OpenAI Logo"
                                   height="24" width="20"/>
                            <Image className="h-4 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/tailwindcss.svg" alt="Tailwind CSS Logo"
                                   height="16" width="20"/>
                            <Image className="h-5 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/vercel.svg" alt="Vercel Logo"
                                   height="20" width="20"/>
                            <Image className="h-5 w-fit dark:invert"
                                   src="https://html.tailus.io/blocks/customers/zapier.svg" alt="Zapier Logo"
                                   height="20" width="20"/>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
