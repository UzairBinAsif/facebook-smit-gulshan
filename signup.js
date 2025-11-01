// SIGNUP PAGE
// SIGNUP LOGIC

function validateRadioBtns(radioNames) {
    let radioBtns = document.getElementsByName(radioNames)
    for (var i = 0; i < radioBtns.length; i++) {
        if(radioBtns[i].checked) {
            return radioBtns[i].value
        }
    }
    return false
}

function validateEmail(emailId) {
    let email = document.getElementById(emailId).value
    email = email.trim()
    let includesAt = false

    if (email) {
        for (var i = 0; i < email.length; i++) {
            if (email[i] == "@" || includesAt) {
                includesAt = true
                if (email[i] == ".") {
                    return email
                }
            }
        }
    }
    return false
}

function validatePassword(passId) {
    let pass = document.getElementById(passId).value
    let sepcialChar = "!@#$%^&*()_-,.?"
    pass = pass.trim()
    
    if (pass) {
        if (pass.length > 8) {
            for (var i = 0; i < pass.length; i++) {
                if (sepcialChar.includes(pass[i])) {
                    return pass
                }
            }
        }
    }
    return false
}

function signup() {
    event.preventDefault()
    let firstName = document.getElementById("first-name").value
    firstName = firstName.trim()
    
    let surName = document.getElementById("sur-name").value
    surName = surName.trim()

    let selectedDay = document.getElementById("dob-day").value
    let selectedMonth = document.getElementById("dob-month").value
    let selectedYear = document.getElementById("dob-year").value
    let radioBtns = validateRadioBtns("gender")
    let email = validateEmail("email")
    let pass = validatePassword("pass")
    
    let dataStorage = localStorage.getItem("userData")
    dataStorage = JSON.parse(dataStorage) || []

    if (firstName) {
        if (surName) {
            if (radioBtns) {
                if (email) {
                    if (pass) {
                        let timerInterval;                    
                        Swal.fire({
                            title: "Signup Success!",
                            html: "Creating Account and Redirecting you to homepage in a sec.",
                            icon: "success",
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        })

                        let currentUserData = {
                            firstName : firstName,
                            surName : surName,
                            dobDay : selectedDay,
                            dobMonth : selectedMonth,
                            dobYear : selectedYear,
                            gender : radioBtns,
                            email : email,
                            pass : pass,
                        }

                        dataStorage.push(currentUserData)
                        
                        let jsonData = JSON.stringify(dataStorage)
                        localStorage.setItem("userData", jsonData)
                        
                        setTimeout(() => {
                            window.location.replace("/index.html")
                        }, 5000);
                        
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Enter a combination of at least eight numbers, letters and punctuation marks (such as ! and &) in your password and exclude any leading or trailing spaces."
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Please Enter email in correct format"
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Please Specify a Gender"
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please Enter a Valid Surname without leading or trailing spaces"
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please Enter a Valid First name without leading or trailing spaces"
        });
    }
}

// DATE OF BIRTH LOGIC

let dobSelectBoxDay = document.getElementById("dob-day")
let dobSelectBoxMonth = document.getElementById("dob-month")
let dobSelectBoxYear = document.getElementById("dob-year")

let currentDay = new Date().getDate()
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

for(var i = 1; i <= 31; i++) {
    if (i == currentDay) {
        dobSelectBoxDay.innerHTML += `<option value="${i}" selected>${i}</option>`
    } else {
        dobSelectBoxDay.innerHTML += `<option value="${i}">${i}</option>`
    }
}

for (var i = 0; i < monthArr.length; i++) {
    if (monthArr[i] == monthArr[currentMonth]) {
        dobSelectBoxMonth.innerHTML += `<option value="${monthArr[i]}" selected>${monthArr[i]}</option>`
    } else {
        dobSelectBoxMonth.innerHTML += `<option value="${monthArr[i]}">${monthArr[i]}</option>`
    }
}

for (var i = currentYear; i > 1905; i--) {
    dobSelectBoxYear.innerHTML += `<option value="${i}">${i}</option>`
}