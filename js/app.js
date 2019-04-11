// jQuery + JavaScript + Vuejs(!)
var logedInUser = "";
$(function() {
  /*************  report page stuff ************/
  //////////////Form validation///////////////
  $('#report').submit(function(e) {
    e.preventDefault();
    //getting data from form
    let title = $("#report-title").val();
    let detail = $("#report-detail").val();
    let responsible = $("#report-responsible").val();
    let obj = getJsonObj("reports");
    //first time visit shoul have 4 members, (admin, teacher, student)
    if (getJsonObj("currentUser").username != null) {
      //initialization the JSON array
      if (obj == null) {
        obj = JSON.parse('{"reports": []}');
      }
      moment.locale();
      let time = moment().format('lll');
      obj['reports'].push({
        "email": getJsonObj("currentUser").email,
        "title": title,
        "detail": detail,
        "responsible": responsible,
        "status": "open", //open - closed - ...
        "date": time,
        "satisfied": "",
        "newDetail": "",
      });
      setJsonObj("reports", obj);
      window.location.href = "report-list.html";
    }
  });

  /*************  sign-in page stuff ************/
  //////////////Form validation///////////////
  $('#signin').submit(function(e) {
    e.preventDefault();
    //getting data from form
    let userName = document.getElementById("emailOrUsername").value;
    let passWord = document.getElementById("pass").value;
    //check if the user data already existed
    let jsObj = getJsonObj("usersInfo");
    //check if the user data already existed
    for (var i = 0; i < jsObj['users'].length; i++) {
      if ((jsObj['users'][i].email == userName &&
          jsObj['users'][i].password == passWord) ||
        (jsObj['users'][i].username == userName &&
          jsObj['users'][i].password == passWord)) {
        logedInUser = jsObj['users'][i];
        setJsonObj("currentUser", logedInUser);
        window.location.href = "report.html";
        break;
      }
    }
    if (logedInUser == null || logedInUser == "") {
      alert("نام کاربری یا رمز عبور اشتباه است");
    }
  });
  /*************  sign-up page stuff ************/
  //////////////Form validation///////////////
  $('#signup').submit(function(e) {
    e.preventDefault();
    let filled = true; //flag for adding new data
    let username = $('#username').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let repassword = $('#repassword').val();
    let isStudent = document.getElementById("isStudent").checked;
    $(".error").remove();
    $(".text-success").remove();
    $('.br').remove();

    // USERNAME VALIDATION
    if (username.length < 1) {
      $('#username').after('<br class=br><span class="error">لطفا این قسمت را پر کنید</span>');
      filled = false;
    } else {
      $('#username').after('<br class=br><span class="text-success">نام معتبر است</span>');
    }
    // EMAIL VALIDATION
    let regEx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    let validEmail = regEx.test(email);
    if (email.length < 1) {
      $('#email').after('<br class=br><span class="error">لطفا این قسمت را پر کنید</span>');
      filled = false;
    } else if (!validEmail) {
      $('#email').after('<br class=br><span class="error">ایمیل معتبر وارد کنید</span>');
      filled = false;
    } else {
      $('#email').after('<br class=br><span class="text-success">ایمیل معتبر است</span>');
    }
    // PASSWORD
    // (?=.*[a-z]) -> password shoule at least have 1 character
    // (?=.*[0-9]) -> password shoule at least have 1 digit
    let regEX_pw = /^(?=.*[a-z])(?=.*[0-9])/;
    if (password.length < 8) {
      $('#password').after('<br class=br><span class="error">رمز عبور باید حداقل ۸ کاراکتر باشد</span>');
      filled = false;
    } else if (!regEX_pw.test(password)) {
      $('#password').after('<br class=br><span class="error">رمز عبور باید حداقل ۱ حرف و ۱ رقم داشته باشد</span>');
      filled = false;
    } else if (password.length == 0) {
      $('#password').after('<br class=br><span class="error">رمز عبور را وارد نکردید</span>');
      filled = false;
    } else if (password !== repassword) {
      $('#password').after('<br class=br><span class="error">!!!</span>');
      $('#repassword').after('<br class=br><span class="error">در وارد کردن رمز عبور دقت کنید</span>');
      filled = false;
    } else {
      $('#password').after('<br class=br><span class="text-success">رمز عبور معتبر است</span>');
    }
    ///////////storing data//////////
    //check if the user data already existed
    let jsObj = getJsonObj("usersInfo");
    //check if the user data already existed
    let isNewUser = true;
    for (var i = 0; i < jsObj['users'].length; i++) {
      // alert(jsObj['users'][i].email);
      if (jsObj['users'][i].email == email && filled) {
        alert("این ایمیل قبلا ثبت شده است.")
        filled = false;
        isNewUser = false;
        break;
      }
    }
    //adding new user to database
    if (filled && isNewUser) {
      let newUserObj = {
        "username": username,
        "email": email,
        "password": password,
        "isStudent": isStudent
      };
      setJsonObj("currentUser", newUserObj);
      jsObj['users'].push(newUserObj);
      setJsonObj("usersInfo", jsObj);
      window.location.href = "report.html";
    }
  });
  /********  edit profile page stuff *********/
  //////////////Form validation///////////////
  $('#edit-profile').submit(function(e) {
    e.preventDefault();
    let filled = true; //flag for adding new data
    let username = $('#username').val();
    let email = $('#email').val();
    let password = $('#password').val();
    $(".error").remove();
    $(".text-success").remove();
    $('.br').remove();

    // USERNAME VALIDATION
    if (username.length < 1) {
      $('#username').after('<br class=br><span class="error">لطفا این قسمت را پر کنید</span>');
      filled = false;
    } else {
      $('#username').after('<br class=br><span class="text-success">نام معتبر است</span>');
    }
    // EMAIL VALIDATION
    let regEx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    let validEmail = regEx.test(email);
    if (email.length < 1) {
      $('#email').after('<br class=br><span class="error">لطفا این قسمت را پر کنید</span>');
      filled = false;
    } else if (!validEmail) {
      $('#email').after('<br class=br><span class="error">ایمیل معتبر وارد کنید</span>');
      filled = false;
    } else {
      $('#email').after('<br class=br><span class="text-success">ایمیل معتبر است</span>');
    }
    // PASSWORD
    // (?=.*[a-z]) -> password shoule at least have 1 character
    // (?=.*[0-9]) -> password shoule at least have 1 digit
    let regEX_pw = /^(?=.*[a-z])(?=.*[0-9])/;
    if (password.length < 8) {
      $('#password').after('<br class=br><span class="error">رمز عبور باید حداقل ۸ کاراکتر باشد</span>');
      filled = false;
    } else if (!regEX_pw.test(password)) {
      $('#password').after('<br class=br><span class="error">رمز عبور باید حداقل ۱ حرف و ۱ رقم داشته باشد</span>');
      filled = false;
    } else if (password.length == 0) {
      $('#password').after('<br class=br><span class="error">رمز عبور را وارد نکردید</span>');
      filled = false;
    } else {
      $('#password').after('<br class=br><span class="text-success">رمز عبور معتبر است</span>');
    }
    ///////////storing data//////////
    //check if the user data already existed
    let jsObj = getJsonObj("usersInfo");
    let jsObjCurrentUser = getJsonObj("currentUser");
    let isProblem = true;
    //check if the user data already existed
    for (var i = 0; i < jsObj['users'].length; i++) {
      if (jsObj['users'][i].email == email && filled) {
        alert("این ایمیل قبلا ثبت شده است.")
        isProblem = true;
        filled = false;
        break;
      }
    }
    if (isProblem && filled) {
      let editedUserObj = {
        "username": username,
        "email": email,
        "password": password,
        "isStudent": jsObjCurrentUser.isStudent
      };
      //removing current data
      jsObj['users'].splice(jsObj['users'].indexOf(jsObjCurrentUser.email),1)
      // for (var i = 0; i < jsObj['users'].length; i++) {
      //   // alert(jsObj['users'][i].email);
      //   if (jsObj['users'][i].email == jsObjCurrentUser.email &&jsObj['users'][i].username == jsObjCurrentUser.username&& filled) {
      //     alert(email +" "+userName+" removed")
      //     jsObj['users'].splice(i,1)
      //     break;
      //   }
      // }
      jsObj['users'].push(editedUserObj);
      setJsonObj("usersInfo", jsObj);
      // jsObjCurrentUser.splice(1,1);
      setJsonObj("currentUser", editedUserObj);
      window.location.href = "report.html";
    }
  });
});
/************ Getting data from localStorage *************/
function getJsonObj(jsonName) {
  let data = localStorage.getItem(jsonName);
  let jsObj = JSON.parse(data);
  return jsObj;
}

function setJsonObj(jsonName, jsObj) {
  myJSON = JSON.stringify(jsObj);
  localStorage.setItem(jsonName, myJSON);
}
/******************initialization***********************/
function setup() {
  let jsObj = getJsonObj("usersInfo");
  //first time visit shoul have 3 members, (admin, prof and a user)
  if (jsObj == null) {
    //initialization the JSON array
    let jsonStr = `{"users": []}`;
    let obj = JSON.parse(jsonStr);
    obj['users'].push({
      "username": "admin",
      "email": "admin@g.co",
      "password": "adminadmin1",
      "isStudent": false
    });
    obj['users'].push({
      "username": "prof",
      "email": "prof@g.co",
      "password": "profprof1",
      "isStudent": false
    });
    obj['users'].push({
      "username": "student",
      "email": "student@g.co",
      "password": "student1",
      "isStudent": true
    });
    setJsonObj("usersInfo", obj);
  } else {
    //setting data to the report.html page
    if (getJsonObj("currentUser").username != null) {
      let tt = "خوش آمدید، " + getJsonObj("currentUser").username;
      $('#user-data').html(tt);
    }
  }
}
