let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let players = ["X", "O"];

let currentPlayer;

let available = [];

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  currentPlayer = floor(random(players.length));

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

function checkWinner() {
  let winner = null;
  // horizontal

  for (let i = 0; i < 3; i++) {
    if (board[i][0] == "X" && board[i][1] == "X" && board[i][2] == "X") {
      winner = board[i][0];
    } else if (board[i][0] == "O" && board[i][1] == "O" && board[i][2] == "O") {
      winner = board[i][0];
    }
  }
  if (available.length == 0 && winner == null) {
    return "Tie";
  } else {
    return winner;
  }
}

function nextTurn() {
  let index = floor(random(0, available.length));
  let spot = available.splice(index, 1)[0];
  board[spot[0]][spot[1]] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

// function mousePressed() {
//   nextTurn();
// }

function draw() {
  background(255);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[j][i];
      textSize(32);

      if (spot == players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot == players[0]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }

      //   text(spot, x, y);
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    createP(result).style("color", "#000").style("font-size", "32pt");
  } else {
    nextTurn();
  }
}
