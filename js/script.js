
const submit = document.getElementById("submitBtn");
let studentData = JSON.parse(localStorage.getItem("student_data")) || []
const takeAllInput = document.querySelectorAll('input');


// ------------------------------------ Helpers ------------------------------------

function deleteStudentData(index) {
    Student.delete(index);
}

function editStudentData(index) {
    Student.edit(index);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}


//----------------- Hiding the dynamic form -----------------
function hiddenForm() {
    const formToHide = document.querySelector('#dynamicFormClass')
    if (formToHide.classList.contains('showSlow')) {
        formToHide.classList.remove('showSlow')
        formToHide.style.top = "-50%"
    }
}
document.getElementById('hideForm').addEventListener('click', () => hiddenForm())




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
        Student.read();
    }


    /**
     * Edit the data based on data
     * 
     * @param index 
     * @returns void
     */
    static edit(index) {
        const studentToEdit = studentData.filter((student, idx) => idx === index)[0]
        // console.log(studentToEdit)
        const hiddenForm = document.querySelector('#dynamicFormClass');
        const dynamicInputs = document.getElementById('dynamicFormInputs')
        hiddenForm.classList.add('showSlow');
        hiddenForm.style.top = "50%"
        dynamicInputs.innerHTML = `<section>
                                      <label for="updatedName" class="form-label">Name</label>
                                      <input type="text" value="${studentToEdit.std_name}" class="form-control" id="updatedName">
                                   </section>
                                   <section>
                                      <label for="updatedStdId" class="form-label">Student ID</label>
                                      <input type="text" value="${studentToEdit.std_id}" class="form-control" id="updatedStdId">
                                   </section>
                                   <section>
                                      <label for="updatedEmail" class="form-label">Email</label>
                                      <input type="text" value="${studentToEdit.email}" class="form-control" id="updatedEmail">
                                   </section>
                                   <section>
                                      <label for="updatedContact" class="form-label">Contact</label>
                                      <input type="text" value="${studentToEdit.contact}" class="form-control" id="updatedContact">
                                   </section>
                                   <section class="text-center my-4">
                                      <button class="btn btn-success" onclick="Student.update(event, ${index})" id="updateDetails">Update</button>
                                   </section>
                                   `
    }


    /**
     * Update the new Data
     * 
     * @param event
     * @param index 
     * @returns void
     */

    static update(event, index) {
        event.preventDefault()

        // find object based on index
        const studentToUpdate = studentData.filter((student, idx) => idx === index)[0]


        const updatedName = document.getElementById('updatedName').value;
        const updatedStdId = document.getElementById('updatedStdId').value;
        const updatedEmail = document.getElementById('updatedEmail').value;
        const updatedContact = document.getElementById('updatedContact').value;

        let errorMessageArray = [];

        if (updatedName && updatedStdId && updatedEmail && updatedContact) {
            if (!Validation.isAllChars(updatedName)) {
                errorMessageArray.push("Name must contain characters only.")
            }

            if (!Validation.isEmail(updatedEmail)) {
                errorMessageArray.push("Enter valid email")
            }

            if (!Validation.isNumber(updatedStdId)) {
                errorMessageArray.push("Id must be number")
            }

            if (!Validation.isNumber(updatedContact)) {
                errorMessageArray.push("Contact no must contain number only")
            }

            if (!Validation.checkIfContactNo(updatedContact)) {
                errorMessageArray.push("Enter 10 digit valid phone number")
            }



            // Check if there is a error in the array
            if (errorMessageArray.length !== 0) {
                // errorMessageArray.forEach((element) => {
                //     const errorItem = document.createElement('li')
                //     errorItem.setAttribute('class', 'text-danger')
                //     errorItem.style.margin = "1rem 0";
                //     errorItem.style.listStyle = "none";
                //     errorItem.innerHTML = element
                //     errorContainer.appendChild(errorItem);
                // });
            }
            else {

                // Asigning updated value
                studentToUpdate.std_id = updatedStdId;
                studentToUpdate.std_name = updatedName;
                studentToUpdate.email = updatedEmail;
                studentToUpdate.contact = updatedContact;

                // Clear error messages
                errorMessageArray = [];
                // errorContainer.innerHTML = " ";

                Student.storeLocal();
                Student.read();
                hiddenForm();
            }
        }
        else {
            alert("Input field is empty")
        }





    }



    /**
     * Updating display
     * 
     * @param array 
     * @returns void
     */

    static read() {
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
                                  <td><button onclick="editStudentData(${index})" class="btn btn-primary">Edit</button>
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


    // Check if given contact number have valid 10 digits
    static checkIfContactNo(number = null) {
        const limit = 10

        console.log(typeof limit, typeof number)
        return limit === number.length
    }

}
Student.read();


submit.addEventListener('click', (event) => {
    event.preventDefault();
    const getName = document.getElementById("std_name").value.trim();
    const getId = document.getElementById("std_id").value.trim();
    const email = document.getElementById("email").value.trim();
    const contactNO = document.getElementById("contact").value.trim();
    let errorMessageArray = []


    if (getName && getId && email && contactNO) {

        if (!Validation.isAllChars(getName)) {
            errorMessageArray.push("Name must contain characters only.")
        }

        if (!Validation.isEmail(email)) {
            errorMessageArray.push("Enter valid email")
        }

        if (!Validation.isNumber(getId)) {
            errorMessageArray.push("Id must be number")
        }

        if (!Validation.isNumber(contactNO)) {
            errorMessageArray.push("Contact no must contain number only")
        }

        if (!Validation.checkIfContactNo(contactNO)) {
            errorMessageArray.push("Enter 10 digit valid phone number")
        }

        // container to shocase errors
        const errorContainer = document.getElementById('showError');
        errorContainer.innerHTML = " "

        // Check if there is a error in the array
        if (errorMessageArray.length !== 0) {
            errorMessageArray.forEach((element) => {
                const errorItem = document.createElement('li')
                errorItem.setAttribute('class', 'text-danger')
                errorItem.style.margin = "1rem 0";
                errorItem.style.listStyle = "none";
                errorItem.innerHTML = element
                errorContainer.appendChild(errorItem);
            });
        }
        else {
            // Create new user
            new Student(getName, getId, email, contactNO).create();

            // clearing input fields
            document.getElementById("std_name").value = " ";
            document.getElementById("std_id").value = " ";
            document.getElementById("email").value = " ";
            document.getElementById("contact").value = " ";


            // Clear error messages
            errorMessageArray = [];
            errorContainer.innerHTML = " ";

            // After adding new user update display 
            Student.read();

            // Scroll to top after creating new student.
            scrollToTop()
        }
    }
    else {
        alert("Input field is empty")
    }
})


// --------------------------- Adding the dynamic responsiveness ---------------------------

function adjustFormClass() {
    const form = document.getElementById('form');
    if (window.innerWidth < 780) {
        form.classList.remove('offset-2');
    } else {
        form.classList.add('offset-2');
    }
}
// Call the function once to set the initial state
adjustFormClass();

// Add an event listener to adjust on window resize
window.addEventListener('resize', adjustFormClass);