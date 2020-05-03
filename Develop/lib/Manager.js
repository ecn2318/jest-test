//define and export the Manager class. inherit from Employee class.
const Employee = require("./Employee").Employee;

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // Super lets us take all of the methods from Employee
        super()
        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports.Manager = Manager