// todo: get html elements & declare global variables
let fullName = document.querySelector(".username"),
  mobNumber = document.querySelector(".mobNumber"),
  userEmail = document.querySelector(".email"),
  userPass = document.querySelector(".pass"),
  confirmPassInput = document.querySelector(".confirmPass"),
  logInEmail = document.querySelector(".logInEmail"),
  logInPass = document.querySelector(".logInPass"),
  signUpBtn = document.querySelector(".signUpBtn a"),
  logInBtn = document.querySelector(".loginBtn a"),
  signInLink = document.querySelector(".signInLink"),
  signupLink = document.querySelector(".signupLink"),
  forgetPassLink = document.querySelector(".forgetPassLink"),
  homeHeader = document.querySelector(".home-content"),
  accountsContainer = [],
  currentUser;

//todo: get saved data from local storege
if (localStorage.getItem("accounts") !== null) {
  accountsContainer = JSON.parse(localStorage.getItem("accounts"));
}

//todo: create a function that takes user inputs and save them
function createAccount() {
  userAccount = {
    username: fullName.value,
    mobile: mobNumber.value,
    email: userEmail.value,
    pass: userPass.value,
  };
  accountsContainer.push(userAccount);
  localStorage.setItem("accounts", JSON.stringify(accountsContainer));
  console.log(accountsContainer, fullName.value);
}

// todo: create a function that validates username
function validateName() {
  let regex = /^[A-Za-z\s_]{5,}$/gm;
  return regex.test(fullName.value);
}

//todo: create a function that validates mobile number
function validateMobileNo() {
  let regex = /^(01)[0125][0-9]{8}$/gm;
  return regex.test(mobNumber.value);
}

//todo: create a function that validates email
function validateEmail() {
  let regex =
    /^[A-Za-z]{1,}[A-Za-z0-9_\-\.]{1,}[a-zA-Z0-9]{1,}(@)(gmail|yahoo|outlook)\.(com)$/gm;
  return regex.test(userEmail.value);
}

//todo: create a function that validates password
function validatePass() {
  let regex = /[a-zA-Z0-9@_-]{8,}$/gm;
  return regex.test(userPass.value);
}

//todo: create a function that displays error msgs
function displayMsg(element, msg) {
  document.querySelector(element).innerHTML = msg;
}

//todo: create functions that show and hide password when click on eye icon
function showPass(passType, iconHide, iconShow) {
  if (passType.type === "password") {
    passType.type = "text";
    document
      .querySelector(iconShow)
      .classList.replace("d-inline-block", "d-none");
    document
      .querySelector(iconHide)
      .classList.replace("d-none", "d-inline-block");
  }
}

function hidePass(passType, iconHide, iconShow) {
  if (passType.type === "text") {
    passType.type = "password";
    document
      .querySelector(iconHide)
      .classList.replace("d-inline-block", "d-none");
    document
      .querySelector(iconShow)
      .classList.replace("d-none", "d-inline-block");
  }
}

//todo click on eye icons to show & hide passwords in login page
if (logInPass !== null) {
  document
    .querySelector(".showLogInPass")
    .addEventListener("click", function () {
      showPass(logInPass, ".hideLogInPass", ".showLogInPass");
    });
  document
    .querySelector(".hideLogInPass")
    .addEventListener("click", function () {
      hidePass(logInPass, ".hideLogInPass", ".showLogInPass");
    });
}

//todo click on eye icons to show & hide passwords in sign up page
if (userPass !== null) {
  document.querySelector(".showPass").addEventListener("click", function () {
    showPass(userPass, ".hidePass", ".showPass");
  });
  document.querySelector(".hidePass").addEventListener("click", function () {
    hidePass(userPass, ".hidePass", ".showPass");
  });
  document
    .querySelector(".showConfPass")
    .addEventListener("click", function () {
      showPass(confirmPassInput, ".hideConfPass", ".showConfPass");
    });
  document
    .querySelector(".hideConfPass")
    .addEventListener("click", function () {
      hidePass(confirmPassInput, ".hideConfPass", ".showConfPass");
    });
}

// todo: call createAccount when user click on signup btn (create account btn)
if (signUpBtn !== null) {
  signUpBtn.addEventListener("click", function (event) {
    if (
      validateName() === true &&
      validateMobileNo() === true &&
      validateEmail() === true &&
      validatePass() === true &&
      confirmPass() === true
    ) {
      if (isAccountExist() === true) {
        event.preventDefault();
        displayMsg(
          ".errorEmail",
          `This Email Exists, please enter another one`
        );
      } else if (isAccountExist() !== true) {
        displayMsg(".errorEmail", ``);
        createAccount();
        signUpBtn.setAttribute("href", "index.html");
      }
    } else {
      event.preventDefault();
      if (validateName() !== true) {
        displayMsg(
          ".errorName",
          `Your Username should be at least 5 characters, and accepts
      uppercase & lowercase letters, space and _`
        );
      } else if (validateName() === true) {
        displayMsg(".errorName", ``);
      }

      if (validateMobileNo() !== true) {
        displayMsg(
          ".errorMob",
          `Invalid mobile number, please enter a valid one.`
        );
      } else if (validateMobileNo() === true) {
        displayMsg(".errorMob", ``);
      }
      if (validateEmail() !== true) {
        displayMsg(
          ".errorEmail",
          `Invalid email address. Your email address can start with
        letters, and accepts numbers, uppercase & lowercase letters and
        special characters (_ - .)`
        );
      } else if (validateEmail() === true) {
        displayMsg(".errorEmail", ``);
      }
      if (validatePass() !== true) {
        displayMsg(
          ".errorPass",
          `Your Password must be at least 8 characters, and can have
        letters, special character (@ or _ or - only) or numbers.`
        );
      } else if (validatePass() === true) {
        displayMsg(".errorPass", ``);
      }
      if (confirmPass() !== true) {
        displayMsg(
          ".errorConfirm",
          `Unmatched passwords, please enter the right password.`
        );
      } else if (confirmPass() === true) {
        displayMsg(".errorConfirm", ``);
      }
    }
  });
}

//todo: create a function that confirm password
function confirmPass() {
  return userPass.value === confirmPassInput.value;
}

// todo: validateAccount when user click on login btn
if (logInBtn !== null) {
  logInBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (localStorage.getItem("accounts") !== null) {
      accountsContainer = JSON.parse(localStorage.getItem("accounts"));
      e.preventDefault();
      for (let i = 0; i < accountsContainer.length; i++) {
        if (accountsContainer[i].email !== logInEmail.value) {
          displayMsg(".notExistMsg", "Email does not exist");
        } else if (accountsContainer[i].email === logInEmail.value) {
          displayMsg(".notExistMsg", "");

          if (
            accountsContainer[i].email === logInEmail.value &&
            accountsContainer[i].pass !== logInPass.value
          ) {
            displayMsg(".notExistMsg", "Incorrect Password");
          } else if (
            accountsContainer[i].email === logInEmail.value &&
            accountsContainer[i].pass === logInPass.value
          ) {
            currentUser = i;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            displayMsg(".notExistMsg", "");
            window.open("home.html", "_self");
          }
        }
      }
    } else {
      displayMsg(".notExistMsg", "Email does not exist");
    }
  });
}

// todo: display user name in the home page when email is validated
if (homeHeader !== null) {
  accountsContainer = JSON.parse(localStorage.getItem("accounts"));
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  displayMsg(
    ".home-content h1",
    `Welcome back ${accountsContainer[currentUser].username}`
  );
}

//todo: create a function that prevents user from creating duplicate accounts
function isAccountExist() {
  for (let i = 0; i < accountsContainer.length; i++) {
    if (userEmail.value === accountsContainer[i].email) {
      return true;
    }
  }
}
