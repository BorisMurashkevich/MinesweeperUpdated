class Game { // this class is responsible for game activity,
  // in this case changing difficulty and rendering info on the top of the board

  constructor() {
    this.renderInfoMenu();
    board.separateEmptyFields(0);
  }

  renderInfoMenu() {
    document.getElementById('minesCounter').value = mines.minesAmount;
    document.getElementById('info').style.width = `${60 * board.sizeX + 60 + board.sizeX * 3.2}px`;
    // formula for measuring size of the info menu (the one with the counter and stuff)
  }

  difficultyChange() {
    const difficultyLevel = document.getElementById('diffLevel');
    if (difficultyLevel.value === 'Easy') {
      document.getElementById('XInput').value = 9;
      document.getElementById('YInput').value = 9;
    } else if (difficultyLevel.value === 'Medium') {
      document.getElementById('XInput').value = 15;
      document.getElementById('YInput').value = 15;
    } else if (difficultyLevel.value === 'Hard') {
      document.getElementById('XInput').value = 20;
      document.getElementById('YInput').value = 20;
    }
  }
}
const game = new Game();
