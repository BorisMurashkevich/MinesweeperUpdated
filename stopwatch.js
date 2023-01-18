class Stopwatch {
  /** this class contains stopwatch which is located on the top of the board inside the info menu */
  start;

  timerId = null; // will be used to stop the stopwatch

  hours = 0;

  minutes = 0;

  seconds = 0;

  timeToString = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];

  startStopwatch() {
    this.timerId = window.setInterval(this.start = () => {
      const clock = document.getElementById('stopwatch');
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
      if (this.hours === 100) {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
      }
      for (let i = 0; i < this.timeToString.length; i++) {
        if (this.hours === i) {
          this.hours = this.timeToString[i];
        }
        if (this.minutes === i) {
          this.minutes = this.timeToString[i];
        }
        if (this.seconds === i) {
          this.seconds = this.timeToString[i];
        }
      }

      clock.value = `${this.hours}:${this.minutes}:${this.seconds}`;
      this.seconds++;
    }, 1000);
  }
}
stopwatch = new Stopwatch();
