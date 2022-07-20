// New Post
function post(loginUser_id) {

	var content = $(".content").val();
	var n_content = content.length;

	if (n_content > 0 && n_content <= 20) {
		$.ajax({
			url: "/Add",
			type: "POST",
			data: {
				"content": content
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json[0]["id"];
			var content = data_json[0]["content"];
			var user_name = data_json[0]["user"]["user_name"];
			var user_id = data_json[0]["user"]["id"];

			$(".left-contents").prepend(`
			<div class="contentes" id="${data_id}">
				<div id="common-wrapper" class="common_wrapper${data_id}">
					<div class="list_post" id="list_post${data_id}">
						<h5 id="userID${data_id}" class="PCUserNumber${user_id}">@${user_name}</h5>
						<p id="contentID${data_id}" style="display:inline;" class="PCUserAdd${user_id}">
							${content}
						</p>
						<form method="post" action="/addComment">
							<input type="text" name="content" size="20" maxlength="20" style="height: 2rem;" class="reply${data_id}"/>
							<button onclick="comment('${loginUser_id}','${data_id}')"
							 class="btn btn-info" type="button">Reply</button>
						</form>
					</div>
				</div>
			</div>`);// Add HTML

			$("#right-contents").prepend(`
			<div class="contentes" id="right${data_id}">
					<div id="content_number${data_id}">
						<h4 style="display:inline;">${content}</h4>
					</div>
					<div class="top-space">
						<!-- Edit func Ajax -->
						<div  style="display:inline;" class="edit${data_id}">
							<a action="/edit/${data_id}" method="get">
								<button type="button" class="btn btn-outline-info"
								onclick="getEditFunk('${data_id}')">Edit</button>
							</a>
						</div>
						<!-- Edit func Ajax -->
						<!-- Delete function -->
						<form action="/delete/${data_id}" method="delete" style="display:inline;">
							<button type="button" onclick="deleteContent('${data_id}')" class="btn btn-outline-danger">Delete</button>
						</form>
						<!-- Delete function -->
					</div>
			</div>`);

			$(".content").val("");
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
	} else {
		window.alert('Please input numbers and letters、using more than 1 characters but less than 20.');
	}

};
//New Post

// Edit func - get info
function getEditFunk(id) {

	var edit_url = "/Edit/" + id;

	$.ajax({
		url: edit_url,
		type: "GET",
		data: {
			"id": id
		},
		dataType: "json"
	})
	.done(function(data) {

		var data_id = data["id"];
		var content = data["content"];
		var userId = data["user_id"];

		// relating post and input tag
		var content_number = "#content_number" + id;
		$(content_number).children().remove();  // Delete post HTML
		$(content_number).append(`
		<input type="text" name="content" size="20" maxlength="20" id="update${data_id}" value="${content}"/>
		`);  // Add HTML

		// relating edit update btn
		var edit_btn = ".edit" + id;
		$(edit_btn).children().remove();  // Delete edit btn
//		Add update btn
		$(edit_btn).append(`
		<a action="/updata/${data_id}" method="put">
			<button type="button" class="btn btn-info"
			onclick="updataFunk('${data_id}','${userId}')">Update</button>
		</a>`);

	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert("error!");
		console.log("jqXHR          : " + jqXHR.status);
		console.log("textStatus     : " + textStatus);
		console.log("errorThrown    : " + errorThrown.message);
	})

};
// Edit func - get info

// Edit func - updata info
function updataFunk(id, userId) {

	var updata_url = "/Updata/" + id;
	var updated_content = "#update" + id;
	var updata_content = $(updated_content).val();

	const n_content = updata_content.length;

	if (n_content > 0 && n_content <= 20) {
		$.ajax({
			url: updata_url,
			type: "PUT",
			data: {
				"id": id,
				"content": updata_content,
				"user_id": userId
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var content = data_json["content"];
			var user_id = data_json["user_id"];
			var user_name = data_json["user"]["user_name"];

			//  relating post and input tag
			var content_number = "#content_number" + id;
			$(content_number).children().remove();  // Delete edit HTML
			$(content_number).append(`<h4>${content}</h4>`);  // Add HTML


			// relating update and edit btn
			var edit_btn = ".edit" + id;
			$(edit_btn).children().remove();  // Delete edit btn
//			Add edit btn
			$(edit_btn).append(`
			<a action="/edit/${data_id}" method="get">
				<button type="button" class="btn btn-outline-info"
				onclick="getEditFunk('${data_id}')">Edit</button>
			</a>`);

			var contentID = "#contentID" + id;
			$(contentID).remove();  // Delete edit HTML
			var userID = "#userID" + id;
			$(userID).after(`
			<p id="contentID${id}" style="display:inline;">${content}</p>`);  // Add HTML

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
	} else {
		window.alert('Please input numbers and letters、using more than 1 characters but less than 20.'); //
	}

};
// Edit func - updata info

//Delete function
function deleteContent(id) {

	var delete_url = "/Delete/" + id;
	var html_id = "#" + id;

	if(window.confirm('Do you want to delete the post?')){
		$.ajax({
			url: delete_url,
			type: "delete",
			data: {
				id: id,
			}
		})
		.done(function() {
			$(html_id).remove();  // delete post HTML

			var right_post = "#right" + id;
			$(right_post).remove();  // delete post HTML
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
		return true;
	}
	else{
		window.confirm('Canceled sending');
		return false; // suspend sending
	}

};
//Delete function
