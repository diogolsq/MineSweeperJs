// I'll have 2 states:
// Open / Unopened.
// With mine or not.


const columnNumber = 13;
const rowsNumber = 40;

let col = 1;

const body = document.getElementById('minesweeper');

// Creating my grid of the game
while (col < columnNumber) {
  body.insertAdjacentHTML('beforeend', `<tr class="column${col}">
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  <td class="unopened"></td>
  </tr>`);
  col += 1;
}

function myIndex(td) {
  if (td - 1 || td + 1) {
    const cellColumn = td.cellIndex;
    const cellRow = td.parentElement.rowIndex;
    console.log(cellColumn);
    console.log(cellRow);
    return [cellColumn, cellRow]// My position in [X,Y]
  }
}

function findTd(array) {
  const x = array[0];
  const y = array[1];

  const fullColumn = document.querySelectorAll("tr")[x];
  const myTd = fullColumn.querySelectorAll("td")[y];
  return myTd;
}


const markingNeighbor = (td) => {
  console.log(td)
  console.log(td[0]);

  const neighborInFront = findTd([td[0] + 1, td[1]]);
  console.log(neighborInFront);
  const neighborInBack = findTd([td[0] - 1, td[1]]);
  const neighborAbove = findTd([td[0], td[1] - 1]);
  const neighborBellow = findTd([td[0], td[1] + 1]);
  const neighborFrontUpDiag = findTd([td[0] + 1, td[1] - 1]);
  const neighborFrontdownDiag = findTd([td[0] + 1, td[1] + 1]);
  const neighborBackUpDiag = findTd([td[0] - 1, td[1] - 1]);
  const neighborBackDownDiag = findTd([td[0] - 1, td[1] + 1]);

  const allNeighbors = [neighborInFront, neighborInBack, neighborAbove, neighborFrontUpDiag, neighborFrontdownDiag, neighborBackUpDiag, neighborBackDownDiag];
  let bombsNear = 0;
  allNeighbors.forEach((cell) => {
    if (cell.classList.contains('with_mine')) {
      bombsNear += 1;
    }
  });
  console.log(td);
  return bombsNear;
  // console.log(td);
};

const Gamestop = () => {
  alert("KABOOOOOMMM! you now are in pieces, best lucky in your next live");
  location.reload();
};


const tdsArray = document.querySelectorAll('td');

const minePopped = (message) => {
  const array = [true, false, false, false, false];
  return array[Math.floor(Math.random() * array.length)];
}; // frequency of mine will be 20%;


tdsArray.forEach((td) => {
  if (minePopped()) {
    td.classList.add('with_mine');
  }

  td.addEventListener('click', (event) => {
    const clicked = event.currentTarget;
    console.log(clicked);
    const mycell = myIndex(clicked);
    const bombs = markingNeighbor(mycell);
    clicked.classList.add(`mine-neighbour-${bombs}`);
    clicked.classList.remove('unopened');
    clicked.classList.add('opened');
    if (td.classList.contains('with_mine') && (td.classList.contains('opened'))) {
      td.classList.remove(`mine-neighbour-${bombs}`);
      td.classList.add('mine');
      Gamestop();
  }});
});
