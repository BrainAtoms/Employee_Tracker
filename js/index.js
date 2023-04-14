const inquirer = require("inquirer");

const questions = [{
    type: "list",
    name: "employee tracker",
    message: "What would you like us to do?", 
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Add A Role", "Add An Employee", "Update An Employee Role"],
}];

function init() {
  inquirer
    .prompt(questions)
}

init()