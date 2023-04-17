// const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use((req, res) => {
//   res.status(404).end();
// });

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
        case "Add A Department":
          addDepartment();
          break;
        case "Quit":
          quit();
      }
    });
}

function viewAllEmployees() {
  let query = `SELECT employee.id,
  employee.first_name,
  employee.last_name,
  employee_role.title AS job_title,
  department.department_name,
  employee_role.salary,
  CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
  FROM employee
  LEFT JOIN employee_role ON employee.role_id = employee_role.id
  LEFT JOIN department ON employee_role.department_id = department.id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  ORDER By employee.id`;
  db.query(query, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

function viewAllDepartments() {
  let query = `SELECT * FROM department`;
  db.query(query, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

function viewAllRoles() {
  let query = `SELECT * FROM employee_role`;
  db.query(query, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

let departmentQuestion = [
  {
    type: "input",
    name: "department_name",
    message: "Please enter the department_name you would like to add:",
  },
];

function addDepartment() {
  inquirer.prompt(departmentQuestion).then((data) => {
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const newData = [data.department_name];
    db.query(sql, newData, (err) => {
      if (err) throw err;
      console.log("Your department has been added to the database");
      db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
      });
    });
  });
}

function quit() {
  console.table;
  process.exit();
}

init();
