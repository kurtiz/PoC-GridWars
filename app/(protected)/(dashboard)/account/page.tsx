"use client";

import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getUserProfileWithTeamAction} from "@/app/(server-actions)/(profile-actions)/get-user-profile.action";
import {Skeleton} from "@/components/ui/skeleton";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {GetTeamsListResponse} from "@/types/teams.type";
import {getTeamsListActions} from "@/app/(server-actions)/(profile-actions)/get-teams.action";
import ToggleCard from "@/components/toggle-card";
import {Shield, Sword} from 'lucide-react';
import clsx from 'clsx';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const Account = () => {

    const {data: userData, isPending} = useQuery({
        queryKey: ["user-data-with-team"],
        queryFn: getUserProfileWithTeamAction,
    });

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

    // Fetch teams using useQuery with explicit typing
    const {data: teams, isLoading, isError} = useQuery<GetTeamsListResponse>({
        queryKey: ["teams"],
        queryFn: getTeamsListActions,
    });

    // Set default values when teams are loaded
    useEffect(() => {
        // Check if teams are loaded
        if (teams && teams?.teams?.length > 0) {
            // Set the user's cyber team as the selected team
            const userCyberTeamId = userData?.user_cyber_team; // Get user's cyber team ID
            const selectedTeam = teams?.teams.find((team) => team.id === userCyberTeamId);

            if (selectedTeam) {
                setSelectedId(selectedTeam.id); // Set selected team

                // If the user has a specialization, set it as the selected specialization
                if (userData?.user_specialization) {
                    setSelectedSpecialization(userData.user_specialization);
                }
                // Otherwise, set the first specialization of the team if available
                else if (selectedTeam.has_specialization && selectedTeam.specializations?.length > 0) {
                    setSelectedSpecialization(selectedTeam.specializations[0].id);
                }
            }
        }
    }, [teams, userData]);


    // Find the currently selected team
    const selectedTeam = teams?.teams.find((team) => team.id === selectedId);

    return (
        <div className="flex flex-1 flex-col px-4 md:px-8">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-4 p-2 md:gap-6 md:p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {isPending ? (
                            <div className="flex flex-1 gap-4 items-center flex-wrap">
                                {/* User Avatar */}
                                <div className="flex gap-4 items-center flex-col md:flex-row">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex">
                                            <Skeleton className={cn("h-32 w-32 rounded-full")}/>
                                        </div>
                                        <div className="flex flex-col text-left text-sm leading-tight gap-2">
                                            <Skeleton className={cn("h-6 w-28 rounded-md")}/>
                                            <Skeleton className={cn("h-4 w-24 rounded-md")}/>
                                            <Skeleton className={cn("h-4 w-16 rounded-md")}/>
                                        </div>
                                    </div>
                                    {/* Vertical Divider */}
                                    <div className="h-32 border-l border-muted mx-4 hidden md:block"/>
                                </div>

                                {/* Cyber Team */}
                                <div
                                    className="border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-md flex-1 md:w-[30%]">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex">
                                            <Skeleton className={cn("h-32 w-32 rounded-lg")}/>
                                        </div>
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <div className="flex flex-col text-left text-sm leading-tight gap-2">
                                                <Skeleton className={cn("h-6 w-28 rounded-md")}/>
                                                <Skeleton className={cn("h-4 w-24 rounded-md")}/>
                                                <Skeleton className={cn("h-4 w-16 rounded-md")}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Bio */}
                                <div
                                    className="border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-md flex-1 md:w-[30%]">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex">
                                            <Skeleton className={cn("h-32 w-32 rounded-lg")}/>
                                        </div>
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <div className="flex flex-col text-left text-sm leading-tight gap-2">
                                                <Skeleton className={cn("h-6 w-28 rounded-md")}/>
                                                <Skeleton className={cn("h-4 w-24 rounded-md")}/>
                                                <Skeleton className={cn("h-4 w-16 rounded-md")}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-1 gap-4 items-center flex-wrap">
                                {/* User Avatar */}
                                <div className="flex gap-4 items-center flex-col md:flex-row">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-col">
                                            <Avatar className="h-32 w-32 rounded-lg">
                                                <AvatarImage
                                                    src={userData?.avatar || `/api/avatar/${userData?.user_id || Math.random() * 10}`}
                                                    alt={userData?.user_name || "user"}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    {userData?.user_name.substring(0, 2).toUpperCase() || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <span
                                                className="truncate font-semibold text-2xl">{userData?.user_name}</span>
                                            <span
                                                className="truncate text-muted-foreground font-medium">@{userData?.user_alias}</span>
                                            <span
                                                className="text-muted-foreground truncate text-xs">{userData?.email}</span>
                                        </div>
                                    </div>
                                    {/* Vertical Divider */}
                                    <div className="h-32 border-l border-muted mx-4 hidden md:block"/>
                                </div>

                                {/* Cyber Team */}
                                <div
                                    className="border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-md flex-1 md:w-[30%]">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-col">
                                            <Image
                                                className="rounded-md"
                                                src={"/img/cyber_teams/blue-team.png"}
                                                alt="Team"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <span className="truncate font-semibold text-2xl">
                                                {userData?.cyber_team?.team_name || "Team Name"}
                                            </span>
                                            <span className="truncate text-muted-foreground font-medium">
                                                {userData?.specialization?.specialization_title}
                                            </span>
                                            <span className="text-muted-foreground truncate text-xs">
                                                {Number(Math.random() * 100000).toLocaleString("en")} points
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Bio */}
                                <div
                                    className="border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-md flex-1 md:w-[30%]">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-col">
                                            <Image
                                                className="rounded-md"
                                                src="/img/companies/gcb-bank.png"
                                                alt="Company"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <span className="truncate font-semibold max-w-[10rem]">
                                                Ghana Commercial Bank is a very long company name.
                                            </span>
                                            <span className="truncate text-muted-foreground font-medium">
                                                SOC Analyst
                                            </span>
                                            <span className="text-muted-foreground truncate text-xs">
                                                {Number(Math.random() * 100000).toLocaleString("en")} points
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <hr/>

                    <div className="flex flex-col gap-4 p-2 md:gap-6 md:p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-lg font-semibold">Account Settings</span>
                                <span className="text-muted-foreground">Manage your account settings</span>
                            </div>
                        </div>
                        <div>
                            <form className="flex flex-col md:w-2/3">
                                {/* Account Info Section */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        {/* Username Field */}
                                        <div className="flex flex-col w-full md:w-1/2 gap-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input name="username" placeholder="eg. hacker_24" required
                                                   value={userData?.user_name} disabled/>
                                        </div>

                                        {/* Alias Field */}
                                        <div className="flex flex-col w-full md:w-1/2 gap-2">
                                            <Label htmlFor="alias">Alias</Label>
                                            <Input name="alias" placeholder="eg. John Doe" required
                                                   value={userData?.user_alias} disabled/>
                                        </div>
                                    </div>
                                </div>

                                {/* Team Info Section */}
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="selectedTeam">Team</Label>
                                        {
                                            isLoading ? (
                                                <div className="flex justify-around gap-2 items-center">
                                                    <Skeleton className="w-[140px] h-[132px] rounded-md"/>
                                                    <Skeleton className="w-[140px] h-[132px] rounded-md"/>
                                                </div>
                                            ) : isError || !teams ? (
                                                <div>Error loading teams. Please try again later.</div>
                                            ) : (
                                                teams.teams.length > 0 ? (
                                                    <div className="flex gap-8 items-center">
                                                        {teams.teams.map((team) => (
                                                            <ToggleCard
                                                                key={team.id}
                                                                icon={
                                                                    team.team_name === "Blue Team" ? (
                                                                        <Shield
                                                                            className={clsx(
                                                                                "w-8 h-8 mb-2",
                                                                                selectedId === team.id
                                                                                    ? `text-${team.color}-800`
                                                                                    : "text-gray-400"
                                                                            )}
                                                                        />
                                                                    ) : (
                                                                        <Sword
                                                                            className={clsx(
                                                                                "w-8 h-8 mb-2",
                                                                                selectedId === team.id
                                                                                    ? `text-${team.color}-800`
                                                                                    : "text-gray-400"
                                                                            )}
                                                                        />
                                                                    )
                                                                }
                                                                title={team.team_name}
                                                                subtitle={team.team_role}
                                                                className={clsx(
                                                                    "transition-all duration-200 ease-in-out",
                                                                    `hover:border-${team.color}-600`,
                                                                    selectedId === team.id
                                                                        ? `border-2 border-${team.color}-600 dark:border-${team.color}-600 text-${team.color}-800 bg-${team.color}-600/20`
                                                                        : `border-2 hover:bg-${team.color}-600/20 ${selectedId !== team.id ? "text-gray-400" : ""}`,
                                                                    "cursor-pointer"
                                                                )}
                                                                onClick={() => {
                                                                    setSelectedId(team.id);
                                                                    if (team.has_specialization && team.specializations?.length > 0) {
                                                                        setSelectedSpecialization(team.specializations[0].id);
                                                                    } else {
                                                                        setSelectedSpecialization(null);
                                                                    }
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div>No teams available. Please contact support.</div>
                                                )
                                            )
                                        }
                                    </div>

                                    {/* Conditionally Render Specializations */}
                                    {selectedTeam?.has_specialization && selectedTeam?.specializations?.length > 0 && (
                                        <div className="flex flex-col gap-2 mt-4">
                                            <Label htmlFor="specialization">Specialization</Label>
                                            <Select
                                                value={selectedSpecialization ?? ""}
                                                onValueChange={setSelectedSpecialization}
                                                defaultValue={selectedTeam?.specializations[0]?.id ?? ""}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Specialization"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {selectedTeam.specializations.map((specialization) => (
                                                            <SelectItem key={specialization.id}
                                                                        value={specialization.id}>
                                                                {specialization.specialization_title}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="mt-4">
                                    <Button>
                                        Update Profile
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Account;
