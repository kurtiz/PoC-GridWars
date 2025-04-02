// components/TabbedLeaderboard.tsx
'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import LeaderboardTable from "@/components/leaderboard";

// Sample data for Blue Team and Red Team
// components/TabbedLeaderboard.tsx

const blueTeamData = [
    {rank: 1, username: 'blueteam1', score: 2000, team: 'MTN Ghana'},
    {rank: 2, username: 'cyberblue', score: 1950, team: 'Vodafone Ghana'},
    {rank: 3, username: 'defender', score: 1900, team: 'AirtelTigo Ghana'},
    {rank: 4, username: 'shieldmaster', score: 1850, team: 'GCB Bank'},
    {rank: 5, username: 'firewall', score: 1800, team: 'Ecobank Ghana'},
    {rank: 6, username: 'securenet', score: 1750, team: 'Standard Chartered'},
    {rank: 7, username: 'cyberguard', score: 1700, team: 'Stanbic Bank'},
    {rank: 8, username: 'protector', score: 1650, team: 'Access Bank'},
    {rank: 9, username: 'networkhero', score: 1600, team: 'CalBank'},
    {rank: 10, username: 'datadefense', score: 1550, team: 'Fidelity Bank'},
    {rank: 11, username: 'cloudshield', score: 1500, team: 'Zenith Bank'},
    {rank: 12, username: 'cyberforce', score: 1450, team: 'Prudential Bank'},
    {rank: 13, username: 'safeguard', score: 1400, team: 'GT Bank'},
    {rank: 14, username: 'digitaldefender', score: 1350, team: 'Republic Bank'},
    {rank: 15, username: 'cyberlock', score: 1300, team: 'NIB Bank'},
    {rank: 16, username: 'networkshield', score: 1250, team: 'ADB Bank'},
    {rank: 17, username: 'cyberwall', score: 1200, team: 'UT Bank'},
    {rank: 18, username: 'datafortress', score: 1150, team: 'UBA Ghana'},
    {rank: 19, username: 'cyberfort', score: 1100, team: 'Barclays Bank'},
    {rank: 20, username: 'cyberbase', score: 1050, team: 'Energy Bank'},
];

const redTeamData = [
    {rank: 1, username: 'redteam1', score: 2100, team: 'Shady'},
    {rank: 2, username: 'cyberred', score: 2050, team: 'Rogue'},
    {rank: 3, username: 'attacker', score: 2000, team: 'Shady'},
    {rank: 4, username: 'exploitking', score: 1950, team: 'Rogue'},
    {rank: 5, username: 'payloadmaster', score: 1900, team: 'Shady'},
    {rank: 6, username: 'hackman', score: 1850, team: 'Rogue'},
    {rank: 7, username: 'shadowcoder', score: 1800, team: 'Shady'},
    {rank: 8, username: 'darknet', score: 1750, team: 'Rogue'},
    {rank: 9, username: 'ghosthacker', score: 1700, team: 'Shady'},
    {rank: 10, username: 'cryptoknight', score: 1650, team: 'Rogue'},
    {rank: 11, username: 'phoenix', score: 1600, team: 'Shady'},
    {rank: 12, username: 'viruslord', score: 1550, team: 'Rogue'},
    {rank: 13, username: 'malwareking', score: 1500, team: 'Shady'},
    {rank: 14, username: 'trojanmaster', score: 1450, team: 'Rogue'},
    {rank: 15, username: 'spyware', score: 1400, team: 'Shady'},
    {rank: 16, username: 'wormwarrior', score: 1350, team: 'Rogue'},
    {rank: 17, username: 'ruthless', score: 1300, team: 'Shady'},
    {rank: 18, username: 'chaosmaker', score: 1250, team: 'Rogue'},
    {rank: 19, username: 'stealthy', score: 1200, team: 'Shady'},
    {rank: 20, username: 'shadowstrike', score: 1150, team: 'Rogue'},
];

export default function TabbedLeaderboard() {
    return (
        <Tabs defaultValue="blue-team" className="w-full p-6">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="blue-team">Blue Team</TabsTrigger>
                <TabsTrigger value="red-team">Red Team</TabsTrigger>
            </TabsList>
            <TabsContent value="blue-team">
                <LeaderboardTable data={blueTeamData}/>
            </TabsContent>
            <TabsContent value="red-team">
                <LeaderboardTable data={redTeamData}/>
            </TabsContent>
        </Tabs>
    );
}