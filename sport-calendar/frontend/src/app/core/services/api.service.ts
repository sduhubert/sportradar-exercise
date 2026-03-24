import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEventRequest, SportEvent } from '../interfaces/event';
import { Sport } from '../interfaces/sport';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {
  }

  getEvents(sportId?: number, dateFrom?: string, count?: number): Observable<SportEvent[]> {
    const params: Record<string, string> = {};

    if (sportId !== undefined) params['sport'] = sportId.toString();
    if (dateFrom) params['dateFrom'] = dateFrom;
    if (count !== undefined) params['count'] = count.toString();

    return this.http.get<SportEvent[]>(`${this.apiUrl}/events`, { params });
  }

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(`${this.apiUrl}/sports`);
  }

  getTeamsBySport(sportId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/teams/sports/${sportId}`);
  }

  postEvent(newEvent: CreateEventRequest): Observable<SportEvent> {
    return this.http.post<SportEvent>(`${this.apiUrl}/events/new`, newEvent);
  }
}
