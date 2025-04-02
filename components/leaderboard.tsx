// components/LeaderboardTable.tsx
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface LeaderboardEntry {
    rank: number;
    username: string;
    score: number;
    team: string;
}

interface LeaderboardTableProps {
    data: LeaderboardEntry[];
}

export default function LeaderboardTable({ data }: LeaderboardTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">Rank</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Team</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((entry) => (
                    <TableRow key={entry.rank}>
                        <TableCell className="text-center font-medium">
                            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                                #{entry.rank}
                            </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{entry.username}</TableCell>
                        <TableCell>{entry.score}</TableCell>
                        <TableCell>
                            <Badge
                                className={`capitalize ${
                                    entry.team === 'Shady' || entry.team === 'Rogue'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-blue-500 text-white'
                                }`}
                            >
                                {entry.team}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}