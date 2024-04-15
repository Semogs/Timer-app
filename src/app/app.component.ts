import { Component } from '@angular/core';
import { TimerComponent } from './components/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TimerComponent],
})
export class AppComponent {}
