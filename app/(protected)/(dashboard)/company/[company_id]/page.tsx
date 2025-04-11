"use client";

import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {useQuery} from "@tanstack/react-query";
import {companies} from "@/repository/companies";
import {useParams} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


const Company = () => {

    const {company_id} = useParams();
    const {data: company, isPending} = useQuery({
        queryKey: ["company"],
        queryFn: () => companies.find(company => company.id === company_id),
    });

    return (
        <div className="flex flex-1 flex-col px-4 md:px-8">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-4 p-2 md:gap-6 md:p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {isPending ? (
                            <div className="flex flex-1 gap-4 items-center flex-wrap">
                                {/* Company Avatar */}
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
                                    <div className="h-32 border-l border-accent-foreground mx-4 hidden md:block"/>
                                </div>

                                {/* Description */}
                                <div
                                    className="px-4 py-2 rounded-md flex-1 md:w-[30%]">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <div className="flex flex-col text-left text-sm leading-tight gap-2 w-full">
                                                <Skeleton className={cn("h-6 w-[300px] rounded-md")}/>
                                                <Skeleton className={cn("h-4 w-[250px] rounded-md")}/>
                                                <Skeleton className={cn("h-4 w-[200px] rounded-md")}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-1 gap-4 items-center flex-wrap">
                                {/* Company Avatar */}
                                <div className="flex gap-4 items-center flex-col lg:flex-row">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-col">
                                            <Avatar className="h-32 w-32 rounded-lg">
                                                <AvatarImage
                                                    src={`/api/avatar/${company?.id || Math.random() * 10}`}
                                                    alt={company?.name || "Company name"}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    {company?.name.substring(0, 2).toUpperCase() || "CO"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <span
                                                className="truncate font-semibold text-2xl">{company?.name}</span>
                                            <span
                                                className="truncate text-muted-foreground font-medium">@{company?.id}</span>
                                        </div>
                                    </div>
                                    {/* Vertical Divider */}
                                    <div className="h-32 border-l border-accent-foreground mx-4 hidden lg:block"/>
                                </div>

                                {/* Description */}
                                <div className="px-4 py-2 rounded-md flex-1 md:w-[30%]">
                                    <div className="flex gap-2 items-center">
                                        {company?.description}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <hr/>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:gap-6 md:p-4">
                        <div className="">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>View team members</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                </CardContent>
                            </Card>
                        </div>
                        <div className="">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>View team members</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                </CardContent>
                            </Card>
                        </div>
                        <div className="">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>View team members</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:gap-6 md:p-4">
                        <div className="col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>View team members</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>View team members</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Company;
