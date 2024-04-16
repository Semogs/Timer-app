import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Timer } from '../interface';
import { TimerListComponent } from './timer-list.component';
import { TimerService } from '../services/timer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TimerListComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  standalone: true,
})
export class TimerComponent implements OnInit {
  timers: Timer[] = [];
  timerName: string = '';
  dataLoaded: boolean = false;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.loadTimers();
  }

  loadTimers() {
    this.timers = this.timerService.getTimers();
    this.dataLoaded = true;
  }

  createTimer() {
    const newTimer: Timer = {
      name: this.timerName,
      startTime: new Date(),
      elapsedTime: 0,
      isRunning: false,
    };
    this.timerService.createTimer(newTimer);
    this.timerName = '';
    this.timerService.startTimer(newTimer);
  }

  exportToXLSX() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.timers);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'timers.xlsx');
  }

  exportToJSON() {
    const json = JSON.stringify(this.timers, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'timers.json');
  }

  exportToTXT() {
    const txt = this.timers
      .map(
        (timer) =>
          `${timer.name}, ${timer.startTime}, ${timer.elapsedTime}, ${timer.isRunning}`
      )
      .join('\n');
    const blob = new Blob([txt], { type: 'text/plain' });
    saveAs(blob, 'timers.txt');
  }
}
