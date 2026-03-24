import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { CreateEventRequest, SportEvent } from '../core/interfaces/event'
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Sport } from '../core/interfaces/sport';
import { FormsModule } from '@angular/forms';
import { Team } from '../core/interfaces/team';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, DatePipe, FormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  events: SportEvent[] = [];
  defaultDate: string = "";
  sports: Sport[] = []

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.events = await this.apiService.getEvents().toPromise() ?? [];
    this.defaultDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    this.sports = await this.apiService.getSports().toPromise() ?? [];
  }


  async onAddEvent(date: string, homeId: string, awayId: string) {
    if (!date || !homeId || !awayId) {
      alert('Please select both teams and a date.');
      return;
    }

    const home_team_id = parseInt(homeId);
    const away_team_id = parseInt(awayId);

    if (home_team_id === away_team_id) {
      alert('A team cannot play against itself!');
      return;
    }

    const newEvent: CreateEventRequest = {
      starts_at: date,
      home_team_id: home_team_id,
      away_team_id: away_team_id
    };

    try {
      const result = await this.apiService.postEvent(newEvent).toPromise();

      if (result) {
        this.events = [result, ...this.events];
        alert('Event added successfully!');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save the event. Check the backend logs.');
    }
  }

  async onSearch(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const sportValue = (form.querySelector('#sport') as HTMLSelectElement).value;
    const sport = sportValue ? parseInt(sportValue) : undefined;
    const dateFrom = (form.querySelector('#date-from') as HTMLInputElement).value;
    const count = parseInt((form.querySelector('#count') as HTMLSelectElement).value);

    this.events = await this.apiService
      .getEvents(sport, dateFrom, count)
      .toPromise() ?? [];
    console.log(this.events)
  }

  filteredTeams: Team[] = [];

  async onSportChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const sportId = parseInt(select.value);

    if (sportId) {
      this.filteredTeams = await this.apiService.getTeamsBySport(sportId).toPromise() ?? [];
    } else {
      this.filteredTeams = [];
    }
  }
}