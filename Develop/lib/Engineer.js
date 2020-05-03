// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee").Employee;

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // Super lets us take all of the methods from Emplyee
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