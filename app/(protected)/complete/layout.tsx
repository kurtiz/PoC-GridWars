import {ReactNode} from "react";
import {SparklesCore} from "@/components/ui/sparkles";
import {ThemeSwitcher} from "@/components/theme-switcher";
import LetterGlitch from "@/components/letter-glitch";

export default async function Layout({children}: { children: ReactNode; }) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            {/* SparklesCore will fill the full background */}
            <SparklesCore
                id="tsparticlescolorful"
                background={"transparent"}
                minSize={0.6}
                maxSize={1.8}
                particleDensity={400}
                className="absolute top-0 left-0 w-full h-full"
                particleColor="#3fff0c"
                speed={0.5}
            />

            <LetterGlitch
                glitchColors={["#000000", "#3fff0c", "#1673ff"]}
                glitchSpeed={50}
                centerVignette={false}
                outerVignette={false}
                smooth={true}
                className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-50"
            />

            {/*<div className="absolute top-0 left-0 w-full h-full bg-white/75 dark:bg-black/60"></div>*/}
            {/* Content on top of the sparkle background */}
            <div className="relative z-10 w-full max-w-sm motion-preset-pop">
                {children}
            </div>

            <div className="absolute bottom-5 right-10 justify-end">
                <div
                    className="inline-flex items-center justify-center whitespace-nowrap
                    rounded-md text-sm font-medium ring-offset-background transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                    shadow-xl shadow-black/30 dark:shadow-green-500/30 border border-input bg-background hover:bg-accent
                    hover:text-accent-foreground">
                    <ThemeSwitcher/>
                </div>
            </div>
        </div>
    );
}
