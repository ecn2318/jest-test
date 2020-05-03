//define and export the Intern class. inherit from Employee class.
const Employee = require("./Employee").Employee;

class Intern extends Employee {
    constructor(name, id, email, school) {
        // Super lets us take all of the methods from Employee
        super()
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school;
        this.role = "Intern";
    }

    getSchool() {
        return this.school;
    }
}

module.exports.Intern = Intern