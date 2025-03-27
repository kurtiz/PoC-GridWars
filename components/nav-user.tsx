import {IconCreditCard, IconDotsVertical, IconLogout, IconNotification, IconUserCircle} from "@tabler/icons-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar";
import {useQuery} from "@tanstack/react-query";
import {getUserProfileAction} from "@/app/(server-actions)/(profile-actions)/get-user-profile.action";
import {Skeleton} from "@/components/ui/skeleton";
import {signOutAction} from "@/app/(server-actions)/(auth-actions)/sign-out.action";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

export function NavUser() {
    const {isMobile} = useSidebar();

    const {data: userData, isPending} = useQuery({
        queryKey: ["user"],
        queryFn: getUserProfileAction,
    });

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {isPending ? (
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="flex flex-1 gap-4 items-center">
                                    {/* Avatar Skeleton */}
                                    <Skeleton className="w-[40px] h-[35px] rounded-full"/>

                                    <div className="flex flex-col gap-2 w-full">
                                        {/* Name Skeleton */}
                                        <Skeleton className="w-1/2 h-4 rounded-md"/>

                                        {/* Email Skeleton */}
                                        <Skeleton className="w-5/6 h-4 rounded-md"/>
                                    </div>
                                </div>
                            </SidebarMenuButton>
                        ) : (
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground motion-preset-fade"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={userData?.avatar || `/api/avatar/${userData?.user_id || Math.random() * 10}`}
                                        alt={userData?.user_name || "user"}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {userData?.user_name.substring(0, 2).toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{userData?.user_name}</span>
                                    <span className="text-muted-foreground truncate text-xs">{userData?.email}</span>
                                </div>
                                <IconDotsVertical className="ml-auto size-4"/>
                            </SidebarMenuButton>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            {isPending ? (
                                <div className="flex flex-1 gap-2 items-center px-1">
                                    {/* Avatar Skeleton */}
                                    <Skeleton className="w-[40px] h-[35px] rounded-full"/>

                                    <div className="flex flex-col gap-2 w-full">
                                        {/* Name Skeleton */}
                                        <Skeleton className="w-1/2 h-4 rounded-md"/>

                                        {/* Email Skeleton */}
                                        <Skeleton className="w-5/6 h-4 rounded-md"/>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex items-center gap-2 px-1 py-1.5 text-left text-sm motion-preset-fade">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={userData?.avatar || `/api/avatar/${userData?.user_id || Math.random() * 10}`}
                                            alt={userData?.user_name || "user"}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {userData?.user_name.substring(0, 2).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{userData?.user_name}</span>
                                        <span
                                            className="text-muted-foreground truncate text-xs">{userData?.email}</span>
                                    </div>
                                </div>
                            )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            {/* Use onSelect to close the dropdown menu */}
                            <DropdownMenuItem onSelect={() => redirect("/account")}>
                                <IconUserCircle/>
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => console.log("Billing clicked")}>
                                <IconCreditCard/>
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => console.log("Notifications clicked")}>
                                <IconNotification/>
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <form action={signOutAction}>
                            <DropdownMenuItem className="flex justify-start" onSelect={(e) => e.preventDefault()}>
                                <Button className="w-full" type="submit" variant="ghost">
                                    <IconLogout/>
                                    Log out
                                </Button>
                            </DropdownMenuItem>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}