
$(document).ready(function(){
	$('#practiceBtn').on('click', function(){
		var choice = $("#choice").val();
		var text = $(".searchText").val();
		if (choice == 3) {

			$.ajax({
				url: "/SearchUser",
				type: "GET",
				data: {
					"name" : text,
				},
				dataType: "json",
			})
			.done(function(data) {
				var data_stringify = JSON.stringify(data);
				var data_json = JSON.parse(data_stringify);

				var i = Object.keys(data_json).length;

				if(i != 0) {
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

//						adminUser or generalUser
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

//						user status
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
					window.alert('Matching User didn\'t exist');
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error!");  // 通信に失敗した場合の処理
				console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
				console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
				console.log("errorThrown    : " + errorThrown.message); // 例外情報
			})

		} else {
			$(".searchText").val("");
			window.alert('You cannot narrow down Post and Comment on this page');
		}
	})

})

// New Post
function post(loginUser_id) {
	$(".content").val("");
	window.alert('You cannot post on this page');
};
//New Post