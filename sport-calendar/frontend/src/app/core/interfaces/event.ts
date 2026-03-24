import { Team } from "./team";

export interface SportEvent {
    id: number;
    starts_at: string;
    homeTeam: Team;
    awayTeam: Team;
}

export interface CreateEventRequest {
    starts_at: string;
    home_team_id: number;
    away_team_id: number;
}
