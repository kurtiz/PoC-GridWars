import React from 'react';
import {cn} from "@/lib/utils";

interface ToggleCardProps {
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    className?: string,
    onClick?: () => void
}


const ToggleCard = ({icon, title, subtitle, className, onClick}: ToggleCardProps) => {
    return (
        <div onClick={onClick} className={
            cn(
                "flex flex-col items-center",
                "border-2 border-gray-200 dark:border-gray-800 py-6 px-8",
                "rounded-lg cursor-pointer hover:border-gray-800 dark:hover:border-gray-200",
                className
            )}>
            {icon}
            <span className="font-medium text-sm md:text-md">{title}</span>
            <span className="text-xs mt-1 opacity-80">{subtitle}</span>
        </div>
    );
};

export default ToggleCard;
