
const errorMessageArray = [];
const submit = document.getElementById("submitBtn");
let studentData = JSON.parse(localStorage.getItem("student_data")) || []




// ------------------------------------ Helpers ------------------------------------

function deleteStudentData(index) {
    Student.delete(index);
}


class Student {

    /**
     * 
     * defining values for properties 
     * 
     * @param name 
     * @param std_id 
     * @param email 
     * @param contact 
     * 
     * @returns void
     */

    constructor(name, std_id, email, contact) {
        this.name = name
        this.std_id = std_id
        this.email = email
        this.contact = contact
    }

    /**
     * 
     *  Storing the user input in localstorage
     *  @returns void
     */

    static storeLocal() {
        localStorage.setItem("student_data", JSON.stringify(studentData))
    }

    /**
     * 
     * Create New User
     * 
     * @returns void
     */
    create() {
        const newStudent = {
            std_name: this.name,
            std_id: this.std_id,
            email: this.email,
            contact: this.contact
        }
        studentData.push(newStudent);
        Student.storeLocal()
    }

    /**
     * 
     * Delete data based on the index
     * 
     * @param index
     * @returns void
     */

    static delete(index) {
        studentData = studentData.filter((student, idx) => index !== idx)
        Student.storeLocal()
        Student.updateDisplay();
    }

    /**
     * Updating display
     * 
     * @param array 
     * @returns void
     */

    static updateDisplay() {
        const rowContainer = document.getElementById('row-container');
        rowContainer.innerHTML = " "
        studentData.forEach((student, index) => {
            const tableRow = document.createElement('tr');
            tableRow.setAttribute('class', 'table-info')
            tableRow.innerHTML = `<td scope="row">${index + 1}</th>
                                   <td scope="row">${student.std_name}</th>
                                  <td>${student.std_id}</td>
                                  <td>${student.email}</td>
                                  <td>${student.contact}</td>
                                  <td><button onclick="deleteStudentData(${index})" class="btn btn-danger">Delete</button>
                                  </td>
                                  `
            rowContainer.appendChild(tableRow);
        });
    }

}




// ---------------------- Validate user enterd Data ----------------------
class Validation {
    /**
     * 
     * @param name 
     * @returns bool
     */
    // check if name contains only characters
    static isAllChars = (name = null) => {
        if (name !== null) {
            // Reguler expression  
            const regex = /^[a-zA-Z]+$/
            // test is object use with Reguler expressions to check if pattern exist
            return regex.test(name) ? true : false;
        }
    }

    /**
     * 
     * @param email 
     * @returns bool
     */

    // check if input value is valid email
    static isEmail = (email = null) => {
        if (email !== null) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return regex.test(email) ? true : false
        }
    }

    /**
     * 
     * @param number 
     * @returns bool
     */

    // check if input value is valid number
    static isNumber = (number = null) => {
        if (number !== null) {
            return !isNaN(number) ? true : false
        }
    }
}
Student.updateDisplay();



submit.addEventListener('click', (event) => {
    event.preventDefault();
    const getName = document.getElementById("std_name").value;
    const getId = document.getElementById("std_id").value;
    const email = document.getElementById("email").value;
    const contactNO = document.getElementById("contact").value;

    if (getName && getId && email && contactNO) {

        if (!Validation.isAllChars(getName)) {
            errorMessageArray.push({
                "name": "Name must contain characters only."
            })
        }
        if (!Validation.isEmail(email)) {
            errorMessageArray.push({
                "email": "Enter valid email !!"
            })
        }
        if (!Validation.isNumber(getId)) {
            errorMessageArray.push({
                "std_id": "Id must be number"
            })
        }
        if (!Validation.isNumber(contactNO)) {
            errorMessageArray.push({
                "contact": "Contact no must contain number only"
            })
        }

        // Create new user
        new Student(getName, getId, email, contactNO).create();


        document.getElementById("std_name").value = " ";
        document.getElementById("std_id").value = " ";
        document.getElementById("email").value = " ";
        document.getElementById("contact").value = " ";
        // After adding new user update display 
        Student.updateDisplay();
    }
    else {
        alert("Input field is empty")
    }
})
