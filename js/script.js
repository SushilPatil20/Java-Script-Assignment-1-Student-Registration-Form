
// onclick get the user Data from all the input fields.

// store it into the localstorage in the form of objects (Creating method store local)
// Call the update display method (creating method get local).


const errorMessageArray = [];
const studentData = [];



const submit = document.getElementById("submitBtn");

submit.addEventListener('click', (event) => {
    event.preventDefault();

    const getName = document.getElementById("std_name").value;
    const getId = document.getElementById("std_id").value;
    const email = document.getElementById("email").value;
    const contactNO = document.getElementById("contact").value;

    // if (getName && getId && email && contactNO) {
    //     if (!Validation.isAllChars(getName)) {
    //         errorMessageArray.push({
    //             "name": "Name must contain characters only."
    //         })
    //     }
    //     if (!Validation.isEmail(email)) {
    //         errorMessageArray.push({
    //             "email": "Enter valid email !!"
    //         })
    //     }
    //     if (!Validation.isNumber(getId)) {
    //         errorMessageArray.push({
    //             "std_id": "Id must be number"
    //         })
    //     }
    //     if (!Validation.isNumber(contactNO)) {
    //         errorMessageArray.push({
    //             "contact": "Contact no must contain number only"
    //         })
    //     }
    // }

    const newStudent = {
        name: getName,
        id: getId,
        email: email,
        contact: contactNO
    }
    const newStuden = new Student(newStudent);


    // console.log(getName, getId, email, contactNO);
})




function storeLocal() {
    localStorage.setItem("student_data", studentData)
}







class Student {

    constructor(name, std_id, email, contact) {
        this.name = name
        this.std_id = std_id
        this.email = email
        this.contact = contact
    }

    create() {
        const newStudent = {
            std_name: this.name.value,
            std_id: this.std_id,
            email: this.email,
            contact: this.contact
        }
        studentData.push(newStudent);
        storeLocal()
    }


}










// function fib() {
//     let a = 0
//     let b = 1
//     return function () {
//         const result = a
//         a = b
//         b = result + b
//         return result;
//     }
// }
// const xyz = fib();


























// ---------------------- Validate user enterd Data ----------------------
class Validation {
    /**
     * 
     * @param name 
     * @return bool
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
