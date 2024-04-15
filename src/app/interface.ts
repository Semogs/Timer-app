export interface Timer {
  name: string;
  startTime: Date;
  endTime?: Date;
  elapsedTime: number;
  isRunning: boolean;
  timerInterval?: any;
}
