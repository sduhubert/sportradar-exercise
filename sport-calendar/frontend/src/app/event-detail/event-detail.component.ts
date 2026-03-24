import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { SportEvent } from '../core/interfaces/event';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  event?: SportEvent;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.event = await this.apiService.getEventById(parseInt(id)).toPromise();
    }
  }
}