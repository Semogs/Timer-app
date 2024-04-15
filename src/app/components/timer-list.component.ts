import { Component, OnInit, Input } from '@angular/core';

interface Timer {
  name: string;
  startTime: Date;
  endTime?: Date;
  elapsedTime: number;
}

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.css'],
})
export class TimerListComponent implements OnInit {
  @Input() pastTimers: Timer[] = [];

  ngOnInit() {}

  formatElapsedTime(elapsedTime: number): string {
    const hours = Math.floor(elapsedTime / (60 * 60 * 1000));
    const minutes = Math.floor((elapsedTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
