const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const team = [];
const inquirer = require('inquirer');
const fs = require('fs');
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlgenerator");



const questions = {

    Manager: [
        
    {

        type: "input",
        name: "name",
        message: "Please enter the managers name.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the managers name.'}
        },
    },

    {

        type: "input",
        name: "id",
        message: "Please enter the managers employee ID.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the managers employee ID.'}
        },
    },

    {

        type: "input",
        name: "email",
        message: "Please enter the managers email address.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the managers email address.'}
        },
    },

    {

        type: "input",
        name: "officeNumber",
        message: "Please enter the managers office number.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the managers office number.'}
        },
    },

    {
        type: "list",
        name: "addNewEmployee",
        message: "Would you like to add another employee?",
        choices: ["y", "n"]
    }
],

Engineer: [
        
    {

        type: "input",
        name: "name",
        message: "Please enter the engineers name.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the engineers name.'}
        },
    },

    {

        type: "input",
        name: "id",
        message: "Please enter the engineers employee ID.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the engineers employee ID.'}
        },
    },

    {

        type: "input",
        name: "email",
        message: "Please enter the engineers email address.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the engineers email address.'}
        },
    },

    {

        type: "input",
        name: "github",
        message: "Please enter the engineers GitHub username.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the engineers GitHub username.'}
        },
    },

    {
        type: "list",
        name: "addNewEmployee",
        message: "Would you like to add another employee?",
        choices: ["y", "n"]
    }
],

Intern: [
        
    {

        type: "input",
        name: "name",
        message: "Please enter the interns name.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the interns name.'}
        },
    },

    {

        type: "input",
        name: "id",
        message: "Please enter the interns employee ID.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the interns employee ID.'}
        },
    },

    {

        type: "input",
        name: "email",
        message: "Please enter the interns email address.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the interns email address.'}
        },
    },

    {

        type: "input",
        name: "school",
        message: "Please enter the interns school.",
        validate: (value) => {
            if (value) {return true}
            else {return 'Please enter the interns school.'}
        },
    },

    {
        type: "list",
        name: "addNewEmployee",
        message: "Would you like to add another employee?",
        choices: ["y", "n"]
    }
],


};

const employeeRole = [
    {
        type: "list",
        name: "employeeRole",
        message: "Please select a role for this employee",
        choices: ['Manager', 'Engineer', 'Intern'],
    }
];

function addNew() {
    inquirer.prompt(employeeRole)
    .then(answer => {

    if (answer.employeeRole === "Manager"){

    inquirer.prompt(questions.Manager)
    .then(answer => {
        const manager = new Manager
        (
            answer.name,
            answer.id,
            answer.email,
            answer.officeNumber
        );

        team.push(manager);
        if (answer.addNewEmployee === "y"){
            addNew();
        } else{
            endList();
        };
    });
    }

    else if (answer.employeeRole === "Engineer"){

    inquirer.prompt(questions.Engineer)
    .then(answer => {
        const engineer = new Engineer
        (
            answer.name,
            answer.id,
            answer.email,
            answer.github
        );

        team.push(engineer);
        if (answer.addNewEmployee === "y"){
            addNew();
        } else{
            endList();
        };
    });
    }

    else if (answer.employeeRole === "Intern"){

    inquirer.prompt(questions.Intern)
    .then(answer => {
        const intern = new Intern
        (
            answer.name,
            answer.id,
            answer.email,
            answer.school
        );

        team.push(intern);
        if (answer.addNewEmployee === "y"){
            addNew();
        } else{
            endList();
        };
    });
    };
     });


};

addNew();

function endList() {
fs.writeFileSync(outputPath, render(team), 'utf-8');
process.exit(0);
}



