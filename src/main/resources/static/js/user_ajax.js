function resurrection() {
	if (window.confirm('Do you want to reactivate this account?')) {
		return true;
	} else {
		window.alert('Canceled');
		return false;
	}
}

// click funk
$(document).ready(function(){
//  all users get func
	$('#UserList').on('click', function() {
		$.ajax({
			url: "/AllUser",
			type: "GET",
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var i = Object.keys(data_json).length;

			if(i != 0) {
				$(".searchText").val("");
				$(".userlist").children().remove();  // Delete HTML
				for(let a = 0; a < i; a++) {
					var data_id = data_json[a]["id"];
					var name = data_json[a]["name"];
					var user_name = data_json[a]["user_name"];
					var password = data_json[a]["password"];
					var admin = data_json[a]["admin_user"];
					var status = data_json[a]["account_status"];
					var report_count = data_json[a]["reportCount"];
					var comment_count = data_json[a]["commentCount"];

					var loginUser = $("#loginUserId").val();

					$(".userlist").append(`
					<div class="contentes${data_id}">
						<div class="list" id="change_status${data_id}">

							<!-- add adminUseror not -->

							<h4>Name : ${user_name}</h4>
							<h4>User Name : @${user_name}</h4>
							<h4>Number of posts : ${report_count}</h4>
							<h4>Number of comments : ${comment_count}</h4>

							<!-- add User status -->

							<div class="userEdit" id="userEdit${data_id}">
								<a action="/userEdit/{data_id}" method="get">
									<button type="button" class="btn btn-outline-secondary"
									onclick="getUserEdit('${data_id}','${loginUser}')">Edit</button>
								</a>
							</div>
						</div>
					</div>`); // add html

//					adminUser or generalUser
					var change_status = "#change_status" + data_id;
					if (admin == 0) {
						$(change_status).prepend(`
						<div id="adminGeneral${data_id}">
							<h4 class="text-primary top-space">General User</h4>
							<form action="/adminGeneral">
								<button type="button" class="btn btn-outline-success"
								onclick="return adminGeneral('${data_id}','${admin}')">
								Change to Admin User</button>
							</form>
						</div>
						`);
					} else if (admin == 1) {
						$(change_status).prepend(`
						<div id="adminGeneral${data_id}">
							<h4 class="text-success top-space">Admin User</h4>
						</div>
						`);

						if (loginUser != data_id) {
							var adminGeneral = "#adminGeneral" + data_id;
							$(adminGeneral).append(`
							<form action="/adminGeneral">
								<button type="button" class="btn btn-outline-primary"
								onclick="return adminGeneral('${data_id}','${admin}')">
								Change to General User</button>
							</form>
							`);
						}
					}

//					user status
					var userEdit = "#userEdit" + data_id;
					if (status == 0) {
						$(userEdit).before(`
						<div class="top-space" id="account_status${data_id}">
							<h4>Status : <span class="text-success">Running</span></h4>
						</div>
						`);

						if (loginUser != data_id) {
							var account_status = "#account_status" + data_id;
							$(account_status).append(`
							<form action="/change" method="put">
								<button type="button" class="btn btn-outline-danger"
								onclick="return statuschange('${data_id}','${status}')">Suspend</button>
							</form>
							`);
						}
					} else if (status == 1) {
						$(userEdit).before(`
						<div class="top-space" id="account_status${data_id}">
							<h4>Status : <span class="text-danger">Stopping</span></h4>
							<form action="/change" method="put">
								<button  type="button" class="btn btn-outline-success"
								onclick="return statuschange('${data_id}','${status}')">Resume</button>
							</form>
						</div>
						`);
					}
				}
			} else {
				window.alert('User didn\'t exist');
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
	})

})
// click funk

//Edit User func - get info - top.html
function getUserEditFunk(id) {

	var userEdit_url = "/UserEdit/" + id;

	$.ajax({
		url: userEdit_url,
		type: "GET",
		data: {
			"id": id
		},
		dataType: "json"
	})
	.done(function(data) {

		var data_id = data["id"];
		var name = data["name"];
		var user_name = data["user_name"];

		// relating user info  and input tag
		$(".userInformation").children().remove();  // Delete post HTML
		$(".userInformation").append(`
		<input type="text" name="name" class="user_edit_ajax" placeholder="Name"
		id="name" value="${name}" size="20" maxlength="20"/>
		`);  // Add HTML
		$(".userInformation").append(`
		<input type="text" name="user_name" class="user_edit_ajax" placeholder="User Name"
		id="userName" value="${user_name}" size="20" maxlength="20"/>
		`);  // Add HTML
		$(".userInformation").append(`
		<input type="password" name="password" class="user_edit_ajax" placeholder="Password"
		id="password" size="20" maxlength="20" style="width: 80%;"/>
		<div  class="mt-1" style="display: inline-block;"><span id="buttonEye" class="fa fa-eye" onclick="pushHideButton()"></span></div>
		`);  // Add HTML
		$(".userInformation").append(`
		<input type="password" name="confirmationPassword" class="user_edit_ajax" placeholder="Confirmation Password"
		id="confirmationPassword" size="20" maxlength="20" style="width: 80%;"/>
		<div  class="mt-1" style="display: inline-block;"><span id="confirmationButtonEye" class="fa fa-eye" onclick="pushHideConfirmationButton()"></span></div>
		`);  // Add HTML

		// relating edit update btn
		$(".userEdit").children().remove();  // Delete edit btn

//		Add update btn
		$(".userEdit").append(`
		<a action="/userUpdata/${data_id}" method="put">
			<button type="button" class="btn btn-outline-secondary"
			onclick="userUpdataFunk('${data_id}')">
			Update</button>
		</a>`);


	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert("error!");
		console.log("jqXHR          : " + jqXHR.status);
		console.log("textStatus     : " + textStatus);
		console.log("errorThrown    : " + errorThrown.message);
	})

};
// Edit User func - get info - top.html

// Edit User func - updata info - top.html
function userUpdataFunk(id) {

	var updata_url = "/UserUpdata/" + id;

	var name_update = $("#name").val();
	var user_name_update = $("#userName").val();
	var password_update = $("#password").val();
	var conPassword_update = $("#confirmationPassword").val();

	if (password_update == conPassword_update) {
		$.ajax({
			url: updata_url,
			type: "PUT",
			data: {
				"id": id,
				"name": name_update,
				"user_name": user_name_update,
				"password": password_update,
				"confirmationPassword": conPassword_update
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var newName = data_json["name"];
			var newUserName = data_json["user_name"];
			var newPassword = data_json["password"];

			var errorMessages = new Set();

			// distinguish Name is correct or not
			if (newName == "0") {
				errorMessages.add("Please input a Name");
			} else if (newName == "-1") {
				errorMessages.add("Please input the Name using 20 characters or less");
			}

			// distinguish User Name is correct or not
			if (newUserName == "0") {
				errorMessages.add("Please input an User Name");
			} else if (newUserName == "-1") {
				errorMessages.add("Duplicate User Name");
			} else if (newUserName == "-2") {
				errorMessages.add("Please input the User Name using 20 characters or less");
			}

			// distinguish Password is correct or not
			if (newPassword == "-1") {
				errorMessages.add("Please input at least 6 single-byte alphanumerical characters for the Password");
				errorMessages.add("Please input the Password using up to 20 single-byte alphanumers.");
			} else if (newPassword == "-2") {
				errorMessages.add("Please input at least 6 single-byte alphanumerical characters for the Password");
			} else if (newPassword == "-3") {
				errorMessages.add("Please enter the Password using up to 20 single-byte alphanumers");
			}

			// display error message(s)
			if (errorMessages.size != 0 ) {
				var errorText = "This is error(s)\nPlease fix your input!\n";
				for (var value of errorMessages) {
					errorText = errorText + "\n" + value;
				}
				window.alert(errorText);
			} else {
				$(".userInformation").children().remove();  // Delete post HTML
				$(".userInformation").append(`<h1 style="padding-top: 3rem;">${newName}</h1>`);
				$(".userInformation").append(`<h4>@${newUserName}</h4>`);

				// relating edit update btn
				$(".userEdit").children().remove();  // Delete edit btn

//				Add update btn
				$(".userEdit").append(`
				<a action="/userEdit/${data_id}" method="get">
					<button type="button" class="btn btn-outline-secondary"
					onclick="getUserEditFunk('${data_id}')">
					Edit</button>
				</a>`);

				var PCUser = ".PCUserNumber" + data_id;
				$(PCUser).empty();
				$(PCUser).append(`${newUserName}`);

			}

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
	} else {
		window.alert('The Password you inputed does not match the Confirmation Password');
	}

};
// Edit User func - updata info - top.html

// Edit User func - get info - userList.html
function getUserEdit(id, loginUser) {

	var userEdit_url = "/UserEdit/" + id;

	$.ajax({
		url: userEdit_url,
		type: "GET",
		data: {
			"id": id
		},
		dataType: "json"
	})
	.done(function(data) {

		var data_id = data["id"];
		var name = data["name"];
		var user_name = data["user_name"];
		var password = data["password"];

		var display_all = "#change_status" + data_id;
		$(display_all).empty();  // Delete post HTML

		$(display_all).append(`
		<input type="text" name="name" class="user_edit_ajax" placeholder="Name"
		id="name" value="${name}" size="20" maxlength="20" style="margin-top: 3rem;"/>
		`);  // Add HTML
		$(display_all).append(`
		<input type="text" name="user_name" class="user_edit_ajax" placeholder="User Name"
		id="userName" value="${user_name}" size="20" maxlength="20"/>
		`);  // Add HTML
		$(display_all).append(`
		<input type="password" name="password" class="user_edit_ajax" placeholder="Password"
		id="password" size="20" maxlength="20" style="width: 80%;"/>
		<div  class="mt-1" style="display: inline-block;"><span id="buttonEye" class="fa fa-eye" onclick="pushHideButton()"></span></div>
		`);  // Add HTML
		$(display_all).append(`
		<input type="password" name="confirmationPassword" class="user_edit_ajax" placeholder="Confirmation Password"
		id="confirmationPassword" size="20" maxlength="20" style="width: 80%; margin-bottom: 1rem;"/>
		<div  class="mt-1" style="display: inline-block;"><span id="confirmationButtonEye" class="fa fa-eye" onclick="pushHideConfirmationButton()"></span></div>
		`);  // Add HTML

//		Add update btn
		$(display_all).append(`
			<div class="userEdit"><a action="/userUpdata/${data_id}" method="put">
			<button type="button" class="btn btn-outline-secondary"
			onclick="userUpdata('${data_id}','${loginUser}')">
			Update</button></a></div>`);

	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert("error!");
		console.log("jqXHR          : " + jqXHR.status);
		console.log("textStatus     : " + textStatus);
		console.log("errorThrown    : " + errorThrown.message);
	})

};
// Edit User func - get info - userList.html

// Edit User func - updata info - userList.html
function userUpdata(id, loginUser) {

	var updata_url = "/UserUpdata/" + id;

	var name_update = $("#name").val();
	var user_name_update = $("#userName").val();
	var password_update = $("#password").val();
	var conPassword_update = $("#confirmationPassword").val();

	if (password_update == conPassword_update) {
		$.ajax({
			url: updata_url,
			type: "PUT",
			data: {
				"id": id,
				"name": name_update,
				"user_name": user_name_update,
				"password": password_update,
				"confirmationPassword": conPassword_update
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var newName = data_json["name"];
			var newUserName = data_json["user_name"];
			var newPassword = data_json["password"]
			var admin_user = data_json["admin_user"];
			var account_status = data_json["account_status"];
			var report_count = data_json["reportCount"];
			var comment_count = data_json["commentCount"];

			var errorMessages = new Set();

			// distinguish Name is correct or not
			if (newName == "0") {
				errorMessages.add("Please input a Name");
			} else if (newName == "-1") {
				errorMessages.add("Please input the Name using 20 characters or less");
			}

			// distinguish User Name is correct or not
			if (newUserName == "0") {
				errorMessages.add("Please input an User Name");
			} else if (newUserName == "-1") {
				errorMessages.add("Duplicate User Name");
			} else if (newUserName == "-2") {
				errorMessages.add("Please input the User Name using 20 characters or less");
			}

			// distinguish Password is correct or not
			if (newPassword == "-1") {
				errorMessages.add("Please input at least 6 single-byte alphanumerical characters for the Password");
				errorMessages.add("Please input the Password using up to 20 single-byte alphanumers.");
			} else if (newPassword == "-2") {
				errorMessages.add("Please input at least 6 single-byte alphanumerical characters for the Password");
			} else if (newPassword == "-3") {
				errorMessages.add("Please enter the Password using up to 20 single-byte alphanumers");
			}

			// display error message(s)
			if (errorMessages.size != 0 ) {
				var errorText = "This is error(s)\nPlease fix your input!\n";
				for (var value of errorMessages) {
					errorText = errorText + "\n" + value;
				}
				window.alert(errorText);
			} else {
				var display_all = "#change_status" + data_id;
				$(display_all).empty();  // Delete post HTML

				if (admin_user == 0) {
					$(display_all).append(`
					<div id="adminGeneral${data_id}">
						<h4 class="text-primary">General User</h4>
						<form action="/adminGeneral">
							<button type="button" class="btn btn-outline-success"
							onclick="return adminGeneral('${data_id}','${admin_user}')">
							Change to Admin User</button>
						</form>
					</div>`); // add html
				} else if (admin_user == 1) {
					$(display_all).append(`
					<div id="adminGeneral${data_id}">
						<h4 class="text-success">Admin User</h4>
					</div>`); // add html

					var adminGeneral = "#adminGeneral" + data_id;
					if (data_id != loginUser) {
						$(adminGeneral).append(`
						<form action="/adminGeneral">
							<button type="button" class="btn btn-outline-primary"
							onclick="return adminGeneral('${data_id}','${admin_user}')">
							Change to General User</button>
						</form>
						`);// add html
					}
				}

				$(display_all).append(`
				<h4>Name : ${newName}</h4>
				<h4>User Name : @${newUserName}</h4>
				<h4>Number of posts : ${report_count}</h4>
				<h4>Number of comments : ${comment_count}</h4>
				`)

				if (account_status == 0) {
					$(display_all).append(`
					<div class="top-space" id="account_status${data_id}">
						<h4>Status : <span class="text-success">Running</span></h4>
					</div>`);

					var status = "#account_status" + data_id;
					if (data_id != loginUser) {
						$(status).append(`
						<form action="/change" method="put">
							<button type="button" class="btn btn-outline-danger"
							onclick="return statuschange('${data_id}','${account_status}')">Suspend</button>
						</form>`);
					}
				} else if (account_status == 1) {
					$(display_all).append(`
					<div class="top-space" id="account_status${data_id}">
						<h4>Status : <span class="text-danger">Stopping</span></h4>
						<form action="/change" method="put">
							<button  type="button" class="btn btn-outline-success"
							onclick="return statuschange('${data_id}','${account_status}')">Resume</button>
						</form>
					</div>`); // add html
				}

//				Add Edit btn
				$(display_all).append(`
				<div class="userEdit"><a action="/userEdit/${data_id}" method="get">
					<button type="button" class="btn btn-outline-secondary"
					onclick="getUserEdit('${data_id}','${loginUser}')">
					Edit</button>
				</a></div>`);
			}

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
	} else {
		window.alert('The Password you inputed does not match the Confirmation Password');
	}

};
// Edit User func - updata info - userList.html

// change status
function statuschange(user_id, status) {

	if (window.confirm('Do you want to change this account status?')) {
		$.ajax({
			url: "/Change",
			type: "PUT",
			data: {
				"id": user_id,
				"account_status": status
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var account_status = data_json["account_status"];

			var change_status = "#account_status" + data_id;
			$(change_status).remove();  // Delete edit HTML

			var change = "#change_status" + data_id;
			$(change).append(`
			<div class="top-space" id="account_status${data_id}"></div>`);  // Add HTML

			if (account_status == 0) {
				$(change_status).append(`
				<h4 class="top-space">Status : <span class="text-success">Running</span></h4>`);  // Add HTML
				$(change_status).append(`
				<form action="/change" method="put">
					<button type="button" class="btn btn-outline-danger"
					onclick="return statuschange('${data_id}','${account_status}')">
					Suspend</button>
				</form>`);  // Add HTML
			} else if (account_status == 1) {
				$(change_status).append(`
				<h4 class="top-space">Status : <span class="text-danger">Stopping</span></h4>`);  // Add HTML
				$(change_status).append(`
				<form action="/change" method="put">
					<button type="button" class="btn btn-outline-success"
					onclick="return statuschange('${data_id}','${account_status}')">
					Resume</button>
				</form>`);  // Add HTML
			}

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
		return true;
	} else {
		window.alert('Canceled');
		return false;
	}

};
// change status

// change admin general
function adminGeneral(user_id, admin) {

	if (window.confirm('Do you change to Admin or General User?')) {
		$.ajax({
			url: "/AdminGeneral",
			type: "PUT",
			data: {
				"id": user_id,
				"admin_user": admin
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var admin_user = data_json["admin_user"];

			var adminGeneral = "#adminGeneral" + data_id;
			$(adminGeneral).empty();  // Delete HTML

			if (admin_user == 1) {
				$(adminGeneral).append(`
				<h4 class="text-success top-space">Admin User</h4>`);  // Add HTML
				$(adminGeneral).append(`
				<form action="/adminGeneral">
					<button type="button" class="btn btn-outline-primary"
					onclick="return adminGeneral('${data_id}','${admin_user}')">
					Change to General User</button>
				</form>`)
			} else if (admin_user == 0) {
				$(adminGeneral).append(`
				<h4 class="text-primary top-space">General User</h4>`);  // Add HTML
				$(adminGeneral).append(`
				<form action="/adminGeneral">
					<button type="button" class="btn btn-outline-success"
					onclick="return adminGeneral('${data_id}','${admin_user}')">
					Change to Admin User</button>
				</form>`)
			}

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
		return true;
	} else {
		window.alert('Canceled');
		return false;
	}

};
// change admin general