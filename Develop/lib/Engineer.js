//define and export the Engineer class. inherit from Employee class.
const Employee = require("./Employee").Employee;

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // Super lets us take all of the methods from Employee
        super()
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
        this.role = "Engineer"
    }

    getGithub() {
        return this.github;
    }

}

module.exports.Engineer = Engineer