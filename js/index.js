const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
  res.status(404).end();
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "NeilYoung1!",
    database: "employee_tracker_db",
  },
  console.log(`Connected to the employee_tracker database.`)
);

// const questions = [
//   {
//     type: "list",
//     name: "options",
//     message: "What would you like us to do?",
//     choices: [
//       "View All Employees",
//       "Add Employee",
//       "Update Employee Role",
//       "View All Roles",
//       "Add Role",
//       "View All Departments",
//       "Add Department",
//       "Add A Role",
//       "Add An Employee",
//       "Update An Employee Role",
//       "Update Employee Manager",
//       "Delete Department",
//       "Delete Role",
//       "Delete Employee",
//       "Quit",
//     ],
//   },
// ];

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
        "Update An Employee Manager",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Quit":
          quit();
      }
    });
}

function viewAllEmployees() {
  let query = "SELECT * FROM employee";
  db.query(query, (err, rows) => {
    if (err) throw err;

    console.table(rows);
    init();
  });
}

function viewAllDepartments() {
  let query = "SELECT * FROM department";
  db.query(query, (err, rows) => {
    if (err) throw err;

    console.table(rows);
    init();
  });
}

function viewAllRoles() {
  let query = "SELECT * FROM employee_role";
  db.query(query, (err, rows) => {
    if (err) throw err;

    console.table(rows);
    init();
  });
}

function quit() {
  console.table;
  process.exit();
}

init();
