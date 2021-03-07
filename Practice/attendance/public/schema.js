const CF = class {
  constructor(name, date) {
    this.name = name;
    this.date = date;
  }
};

const sess1 = new CF("Session 1", "1-3-2021");
const sess2 = new CF("Session 2", "2-3-2021");
const sess3 = new CF("Session 3", "3-3-2021");
const sess4 = new CF("Session 4", "4-3-2021");
const sess5 = new CF("Session 5", "5-3-2021");

const CF43 = [sess1, sess2, sess3, sess4, sess5];

const Students = class {
  constructor(name) {
    this.name = name;
    this.sessions = CF43;
  }
};

const buildTable = (col) => {
  $("#session-header").attr("colspan", col);
  let html;
  for (let i = 1; i <= col; i++) {
    const th = `<th>Sess${i}</th>`;
    html += th;
  }
  const tr = `<tr>${html}</tr>`
  $("#student-table").append(tr);
  console.log("Table built..");
  return;
};

buildTable(CF43.length);
