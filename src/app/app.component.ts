import { Component } from '@angular/core';
import { TimerComponent } from './components/timer.component';
import { TimerListComponent } from './components/timer-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TimerComponent, TimerListComponent],
})
export class AppComponent {}
