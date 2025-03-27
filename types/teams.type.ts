// Define the types
export interface Specialization {
    id: string;
    specialization_title: string;
}

export interface CyberTeam {
    id: string;
    team_name: string;
    team_role: string;
    has_specialization: boolean;
    color: string;
    specializations: Specialization[];
}

export interface GetTeamsListResponse {
    teams: CyberTeam[];
}