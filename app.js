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
  let winner = {
    id: null,
    type: null,
    index: null,
    array: [],
  };

  function equal3(a, b, c) {
    return a == b && b == c && c == a && a != "";
  }
  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equal3(board[i][0], board[i][1], board[i][2])) {
      winner = { id: board[i][0], type: "row", index: i + 1 };
    }
  }
  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equal3(board[0][i], board[1][i], board[2][i])) {
      winner = { id: board[0][i], type: "column", index: i + 1 };
    }
  }
  // Diagonal

  if (equal3(board[0][0], board[1][1], board[2][2])) {
    winner = { id: board[0][0], type: "diag", index: 0 };
  } else if (equal3(board[0][2], board[1][1], board[2][0])) {
    winner = { id: board[0][2], type: "diag", index: 1 };
  }

  if (available.length == 0 && winner.id == null) {
    winner = { id: "Tie" };
    return winner;
  } else {
    return winner;
  }

  //   console.log(winner);
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
    }
  }

  let result = checkWinner();
  if (result.id != null) {
    noLoop();
    createP(result.id + " won" + " with a " + result.type)
      .style("color", "#000")
      .style("font-size", "32pt");

    if (result.type == "diag") {
      strokeWeight(10);
      stroke("red");
      if (result.index == 0) {
        line(w / 3, h / 3, w * 3 - w / 3, h * 3 - h / 3);
      } else {
        line(h / 3, h * 3 - h / 3, w * 3 - w / 3, h / 3);
      }
    } else if (result.type == "column") {
      strokeWeight(10);
      stroke("red");
      line(
        result.index * w - 0.5 * w,
        h / 3,
        result.index * w - 0.5 * w,
        (h / 3) * 8
      );
    } else if (result.type == "row") {
      strokeWeight(10);
      stroke("red");
      line(
        w / 3,
        h * result.index - 0.5 * h,
        w * 3 - w / 3,
        h * result.index - 0.5 * h
      );
    }
  } else {
    nextTurn();
  }
}
