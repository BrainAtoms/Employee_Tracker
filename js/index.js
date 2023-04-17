const db = require('../config/connection')
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

function init() {
inquirer.prompt(
      {
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
        case "Add A Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update An Employee Role":
          updateEmployee();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Employee":
          deleteEmployee();
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
      console.log("Your department has been added to the database.");
      db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
      });
    });
  });
}

let roleQuestions = [
  {
    name: "title",
    type: "input",
    message: "Please enter the title of employee_role you would like to add:",
  },
  {
    name: "salary",
    type: "input",
    message:
      "Please enter the salary for the role you are adding (numbers only):",
  },
  {
    name: "department_id",
    type: "number",
    message: "Please enter the department_id for the role you are adding:",
  },
];

function addRole() {
  inquirer.prompt(roleQuestions).then((data) => {
    const sql = `INSERT INTO employee_role (title, salary, department_id)
                VALUES (?, ?, ?);`;
    const newData = [data.title, data.salary, data.department_id];
    db.query(sql, newData, (err) => {
      if (err) throw err;
      console.log("Your employee_role has been added to the database.");
      db.query(`SELECT * FROM employee_role`, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
      });
    });
  });
}

let employeeQuestions = [
  {
    name: "first_name",
    type: "input",
    message: "Please enter the first_name of the employee you want to add:",
  },
  {
    name: "last_name",
    type: "input",
    message: "Please enter the last_name of the employee you want to add:",
  },
  {
    name: "role_id",
    type: "number",
    message:
      "Please enter the role_id for the employee you want to add (numbers only):",
  },
  {
    name: "manager_id",
    type: "number",
    message:
      "Please enter the manager_id for the employee you want to add (numbers only):",
  },
];

function addEmployee() {
  inquirer.prompt(employeeQuestions).then((data) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
    const newData = [
      data.first_name,
      data.last_name,
      data.role_id,
      data.manager_id,
    ];
    db.query(sql, newData, (err) => {
      if (err) throw err;
      console.log("Your employee has been added to the database.");
      db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
      });
    });
  });
}

let updateEmployeeQuestions = [
  {
    name: "first_name",
    type: "input",
    message: "Please enter the first_name of the employee you want to update:",
  },
  {
    name: "role_id",
    type: "number",
    message:
      "Please enter the role_id for the employee you want to update (numbers only):",
  },
];

function updateEmployee() {
  inquirer.prompt(updateEmployeeQuestions).then((data) => {
    const sql = `UPDATE employee
    SET role_id = (?) WHERE first_name = (?)`;
    const newData = [data.role_id, data.first_name];
    db.query(sql, newData, (err) => {
      if (err) throw err;
      console.log("Your employee has been updated.");
      db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
      });
    });
  });
}

let deleteDepartmentQuestion = [
  {
    type: "input",
    name: "department_name",
    message: "Please enter the department_name you would like to delete:",
  },
]

function deleteDepartment () {
  inquirer.prompt(deleteDepartmentQuestion).then((data) => {
    const sql = `DELETE FROM department WHERE
    department_name = (?)`;
    const newData = [data.department_name];
    db.query(sql, newData, (err) => {
      if (err) throw err;
      console.log("Your department has been deleted from the database.");
      db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
      });
    });
  });
}

let deleteRoleQuestion = [
  {
    name: "title",
    type: "input",
    message: "Please enter the title of the employee_role you would like to delete:",
  }
]

function deleteRole () {
  inquirer.prompt(deleteRoleQuestion).then((data) => {
    const sql = `DELETE FROM employee_role WHERE
    title = (?)`;
    const newData = [data.title, data.salary, data.department_id];
    db.query(sql, newData, (err) => {
      if (err) throw err;
      console.log("Your employee_role has been deleted from the database.");
      db.query(`SELECT * FROM employee_role`, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
      });
    });
  });
}

deleteEmployeeQuestions = [
  {
    name: "last_name",
    type: "input",
    message: "Please enter the last_name of the employee you want to add:",
  }
]

function deleteEmployee () {
  inquirer.prompt(deleteEmployeeQuestions).then((data) => {
    const sql = `DELETE FROM employee WHERE
    last_name = (?)`;
    const newData = [data.last_name];
    db.query(sql, newData, (err) => {
      if (err) throw err;
      console.log("Your employee has been deleted from the database.");
      db.query(`SELECT * FROM employee_role`, (err, rows) => {
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


