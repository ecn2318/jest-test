const inquirer = require("inquirer");
const Manager = require("./lib/Manager").Manager;
const Engineer = require("./lib/Engineer").Engineer;
const Intern = require("./lib/Intern").Intern;
const fs = require('fs');
const fsPromises = require("fs").promises;
const util = require('util');
const htmlRenderer = require('./lib/htmlRenderer.js');

const writeFileAsync = util.promisify(fs.writeFile);

//set parameter to empty array - recursive function
const collectInputs = async (inputs = []) => {

    //prompt questions with validation using validate:
    const questions = [
        {
            type: "rawlist",
            name: "empType",
            message: "Employee Type",
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Name',
            validate: function validate(name) {
                if (name !== '') {
                    return true;
                } else {
                    return 'cannot be left blank'
                };
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'ID',
            validate: function validate(id) {
                if (id !== '') {
                    return true;
                } else {
                    return 'cannot be left blank'
                };
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'E-mail',
            validate: function validate(email) {
                if (email !== '') {
                    return true;
                } else {
                    return 'cannot be left blank'
                };
            }
        },
        //use when: - conditional prompts based on earlier answer (choices of employee type)
        {
            type: 'input',
            name: 'intSchool',
            message: 'School',
            when: (answers) => answers.empType === 'Intern',
            validate: function validate(school) {
                if (school !== '') {
                    return true;
                } else {
                    return 'cannot be left blank'
                };
            }
        },
        {
            type: 'input',
            name: 'engGithub',
            message: 'Github link',
            when: (answers) => answers.empType === 'Engineer',
            validate: function validate(link) {
                if (link !== '') {
                    return true;
                } else {
                    return 'cannot be left blank'
                };
            }
        },
        {
            type: 'input',
            name: 'mngrNumber',
            message: 'Office Number',
            when: (answers) => answers.empType === 'Manager',
            validate: function validate(number) {
                if (number !== '') {
                    return true;
                } else {
                    return 'cannot be left blank'
                };
            }
        },
        {
            type: 'confirm',
            name: 'next',
            message: 'Enter another employee? ',
            default: true
        }
    ];

    //es6 destructuring - if 'next' - enter another employee? = Y, spread other inputted properties into answers object, rerun inquirer prompt questions again
    //... - rest of, etc.
    const { next, ...answers } = await inquirer.prompt(questions);

    //create new array, merge inputs array and answers object
    const newInputs = [...inputs, answers];
    //check 'next' - y/n - return new inputs or call collect inputs again
    return next ? collectInputs(newInputs) : newInputs;
};

//team array in global scope
const team = [];

//(employee_obj) is answers from prompt
const getRole = (array) => {
    for (i = 0; i < array.length; i++)
        // Evaluate what the employee type is based on the prompt answer
        if (array[i].empType == "Manager") {
            //return new instance
            const newMng = new Manager(array[i].name, array[i].id, array[i].email, array[i].mngrNumber)
            team.push(newMng);
            // console.log(team);
        } else if (array[i].empType == "Engineer") {
            const newEng = new Engineer(array[i].name, array[i].id, array[i].email, array[i].engGithub)
            team.push(newEng);
            //console.log(team);
        } else if (array[i].empType == "Intern") {
            const newInt = new Intern(array[i].name, array[i].id, array[i].email, array[i].intSchool)
            team.push(newInt);
            //console.log(team);
        } else {
            console.log("Something went wrong");
        }
}

//initalize function
const init = async () => {

    try {
        const inputs = await collectInputs();
        console.log(inputs);

        //getRole(team array of employee objects)
        getRole(inputs);

        console.log(team);
        const html = htmlRenderer.render(team);

        fsPromises.mkdir('output').then(function () {
            console.log('Directory created successfully');
        }).catch(function () {
            console.log('failed to create directory');
        });
        await writeFileAsync("output/TEAM.html", html);
        console.log("Successfully wrote html");
    }
    catch (err) {
        console.log(err);
    }
};

//call init function
init();


