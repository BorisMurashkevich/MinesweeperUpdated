class LoadAndSaveTheBoard { // this class is responsible for saving and loading size of the board
  // provided by user
  xValue;

  yValue;

  valueLoad() {
    if (sessionStorage.getItem('xValue') !== null) {
      document.getElementById('XInput').value = sessionStorage.getItem('xValue');
      document.getElementById('YInput').value = sessionStorage.getItem('yValue');
      this.xValue = document.getElementById('XInput').value;
      this.yValue = document.getElementById('YInput').value;
      this.xValue = Number(this.xValue);
      this.yValue = Number(this.yValue);
    }
    if (sessionStorage.getItem('diffLevel') !== null) {
      document.getElementById('diffLevel').value = sessionStorage.getItem('diffLevel');
    }
    if (sessionStorage.getItem('xValue') === null) {
      this.xValue = document.getElementById('XInput').value;
      this.yValue = document.getElementById('YInput').value;
      this.xValue = Number(9);
      this.yValue = Number(9);
    }
  }

  changeX() { // changing X and Y fields at the same time
  // (if changed separately there will be issues with opening empty fields)
    document.getElementById('YInput').value = document.getElementById('XInput').value;
  }

  changeY() {
    document.getElementById('XInput').value = document.getElementById('YInput').value;
  }

  valueSave() { // saving the previous set x and y
    sessionStorage.setItem('xValue', document.getElementById('XInput').value);
    sessionStorage.setItem('yValue', document.getElementById('YInput').value);
    sessionStorage.setItem('diffLevel', document.getElementById('diffLevel').value);
  }
}
const load = new LoadAndSaveTheBoard();
