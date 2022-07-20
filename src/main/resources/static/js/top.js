function logincheck() {
	if (window.confirm('Do you want to Log in?')) {
		return true;
	} else {
		window.alert('Canceled');
		return false;
	}
}

function logoutcheck() {
	if (window.confirm('Do you want to Log out?')) {
		return true;
	} else {
		window.alert('Canceled');
		return false;
	}
}

function signupcheck() {
	if (window.confirm('Do you resist this account?')) {
		return true;
	} else {
		window.alert('Canceled');
		return false;
	}
}

function pushHideButton() {
    var txtPass = document.getElementById("password");
    var btnEye = document.getElementById("buttonEye");
    if (txtPass.type === "text") {
      txtPass.type = "password";
      btnEye.className = "fa fa-eye";
    } else {
      txtPass.type = "text";
      btnEye.className = "fa fa-eye-slash";
    }
 }

function pushHideConfirmationButton() {
    var txtPass = document.getElementById("confirmationPassword");
    var btnEye = document.getElementById("confirmationButtonEye");
    if (txtPass.type === "text") {
      txtPass.type = "password";
      btnEye.className = "fa fa-eye";
    } else {
      txtPass.type = "text";
      btnEye.className = "fa fa-eye-slash";
    }
 }
