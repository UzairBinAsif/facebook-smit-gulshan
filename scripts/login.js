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

function login() {
    event.preventDefault()
    let email = validateEmail("email")
    let pass = validatePassword("pass")
    
    let dataStorage = localStorage.getItem("userData")
    dataStorage = JSON.parse(dataStorage) || []

    if (email) {
        if (pass) {
            for (var i = 0; i < dataStorage.length; i++) {
                if (email == dataStorage[i].email) {
                    if (pass == dataStorage[i].pass) {
                        let timerInterval;                    
                        Swal.fire({
                            title: "Login Success!",
                            html: "Redirecting you to homepage in a sec.",
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
                        
                        setTimeout(() => {
                            window.location.replace("/index.html")
                        }, 5000);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Incorrect Password!"
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Incorrect Email!"
                    });
                }
            }
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
}