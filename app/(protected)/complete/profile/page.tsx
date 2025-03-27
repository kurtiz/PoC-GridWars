"use client";

import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {SubmitButton} from "@/components/submit-button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Shield, Sword} from "lucide-react";
import ToggleCard from "@/components/toggle-card";
import {completeProfile} from "@/app/(server-actions)/(profile-actions)/complete-profile.action";
import {getTeamsListActions} from "@/app/(server-actions)/(profile-actions)/get-teams.action";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {GetTeamsListResponse} from "@/types/teams.type";
import {clsx} from "clsx";
import {Skeleton} from "@/components/ui/skeleton";


export default function CompleteProfile() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

    // Fetch teams using useQuery with explicit typing
    const {data: teams, isLoading, isError} = useQuery<GetTeamsListResponse>({
        queryKey: ["teams"],
        queryFn: getTeamsListActions,
    });

    // Set default values when teams are loaded
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (teams?.teams.length > 0) {
            // Set the default selected team to the first team
            setSelectedId(teams!.teams[0].id);
            // Set the default specialization to the first specialization of the first team
            if (teams!.teams[0].has_specialization && teams!.teams[0].specializations?.length > 0) {
                setSelectedSpecialization(teams!.teams[0].specializations[0].id);
            }
        }
    }, [teams]);


    if (isError) {
        return <div>Error loading teams. Please try again later.</div>;
    }

    // Find the currently selected team
    const selectedTeam = teams?.teams.find((team) => team.id === selectedId);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Profile Set Up</CardTitle>
                <CardDescription>Let&#39;s set your account profile up.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col">
                    <div className="flex flex-col gap-2 [&>input]:mb-3">
                        <Label htmlFor="username">Username</Label>
                        <Input name="username" placeholder="eg. hacker_24" required/>
                        <Label htmlFor="alias">Alias</Label>
                        <Input name="alias" placeholder="eg. John Doe" required/>
                        <Label htmlFor="selectedTeam">Team</Label>
                        {
                            (isLoading) ?
                                <div className="flex justify-around gap-2 items-center">
                                    <Skeleton className="w-[140px] h-[132px] rounded-md]"/>
                                    <Skeleton className="w-[140px] h-[132px] rounded-md]"/>
                                </div> :
                                (isError || !teams) ?

                                    <div>
                                        Error loading teams. Please try again later.
                                    </div>
                                    :
                                    /* Render Teams */
                                    (
                                        teams.teams.length > 0 ?
                                            (
                                                <div className="flex justify-around items-center">
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
                                                                // When the team is changed, set the specialization to the first of that team's specializations
                                                                if (team.has_specialization && team.specializations?.length > 0) {
                                                                    setSelectedSpecialization(team.specializations[0].id);
                                                                } else {
                                                                    setSelectedSpecialization(null); // Clear specialization if the team has none
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

                        {/* Conditionally Render Specializations */}
                        {selectedTeam?.has_specialization && selectedTeam?.specializations?.length > 0 && (
                            <>
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
                                                <SelectItem key={specialization.id} value={specialization.id}>
                                                    {specialization.specialization_title}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </>
                        )}

                        <input type="hidden" name="selectedTeam" value={selectedId ?? ""} required/>
                        <input type="hidden" name="selectedSpecialization" value={selectedSpecialization ?? ""}/>
                        <SubmitButton pendingText="Setting up your profile..." formAction={completeProfile}
                                      className="mt-4">
                            Complete Profile
                        </SubmitButton>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}