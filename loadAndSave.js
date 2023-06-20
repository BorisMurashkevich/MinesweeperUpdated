/** This class is responsible for saving and loading size of the board
 provided by user.  */

class LoadAndSaveTheBoard {
  xValue;

  yValue;
  /** This method is responsible for loading previous values of board size  */

  valueLoad() { // loading previous value of X and Y
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
  /** Method which is used to change size of the board by x coordinate. */

  changeX() {
    document.getElementById('YInput').value = document.getElementById('XInput').value; // changing X and Y fields at the same time
    // (if changed separately there will be issues with opening empty fields)
  }
  /** Method which is used to size of the board by y coordinate.  */

  changeY() {
    document.getElementById('XInput').value = document.getElementById('YInput').value;
  }
  /** Saving the previous set x and y.  */

  valueSave() {
    sessionStorage.setItem('xValue', document.getElementById('XInput').value);
    sessionStorage.setItem('yValue', document.getElementById('YInput').value);
    sessionStorage.setItem('diffLevel', document.getElementById('diffLevel').value);
  }
}
