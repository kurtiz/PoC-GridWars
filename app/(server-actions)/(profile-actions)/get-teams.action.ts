"use server";

import {createClient} from "@/utils/supabase/server";
import {CyberTeam, GetTeamsListResponse} from "@/types/teams.type";

export const getTeamsListActions = async (): Promise<GetTeamsListResponse> => {
    const supabase = await createClient();

    try {
        // Fetch teams and their specializations in a single query
        const {data, error} = await supabase
            .from("cyber_team")
            .select(`
        id,
        team_name,
        team_role,
        has_specialization,
        color,
        specializations: specialization (
          id,
          specialization_title
        )
      `);

        if (error) {
            console.error("Error fetching teams:", error);
            throw new Error("Failed to fetch teams");
        }

        // Ensure data is defined and map it to the expected structure
        const teamsWithSpecialization: CyberTeam[] = (data || []).map((team) => ({
            id: team.id,
            team_name: team.team_name,
            team_role: team.team_role || null,
            has_specialization: team.has_specialization || false,
            color: team.color || "blue", // Default color if missing
            specializations: team.specializations || [], // Default to empty array if no specializations
        }));

        // Return the structured data
        return {teams: teamsWithSpecialization};
    } catch (err) {
        console.error("Error in getTeamsListActions:", err);
        throw new Error("An error occurred while fetching teams");
    }
};