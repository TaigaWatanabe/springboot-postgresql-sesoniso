//$(document).ready( function(){
//	// add id
//	var moji = "comment"
//	var tmp = document.getElementsByClassName("comment") ;
//
//	for(var i=0;i<=tmp.length-1;i++){
//		tmp[i].setAttribute("id",moji+i);
//	}
//});

// comment
function comment(user_id, content_id) {

	var comment_reply = ".reply" + content_id;
	var comment = $(comment_reply).val();
	var n_comment = comment.length;

	if (n_comment > 0 && n_comment <= 20) {
		$.ajax({
			url: "/AddComment",
			type: "POST",
			data: {
				"comment": comment,
				"user_id": user_id,
				"content_id": content_id
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var comment = data_json["comment"];
			var user_name = data_json["user"]["user_name"];

			var list_post = "#list_post" + content_id;
			$(list_post).after(`
			<div id="postComment${data_id}">
				<h5 id="commentUserId${data_id}">@${user_name}</h5>
				<p  class="commentID${data_id}" style="display:inline;">${comment}</p>
			</div>`);  // Add HTML

			$(comment_reply).val("");

//			display on list
			$(".right_comments").prepend(`
			<div class="contentes" id="Comment${data_id}">
				<div id="comment_number${data_id}">
					<h4>${comment}</h4>
				</div>

				<div class="top-space">
					<!-- Edit func Ajax -->
					<div style="display:inline;" id="editComment${data_id}">
						<a action="/editComment/${data_id}" method="get">
							<button type="button" class="btn btn-outline-info" onclick="getComment('${data_id}')">
							Edit</button>
						</a>
					</div>
					<!-- Edit func Ajax -->
					<!-- Delete function -->
					<form action="/deleteComment/${data_id}" method="delete" style="display:inline;">
						<button type="button" onclick="deleteComment('${data_id}')" class="btn btn-outline-danger">Delete</button>
					</form>
					<!-- Delete function -->

				</div>
			</div>`);
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
// comment

//Edit func - get info
function getComment(id) {

	var edit_url = "/EditComment/" + id;

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
		var comment = data["comment"];
		var userId = data["user_id"];

		// relating post and input tag
		var comment_number = "#comment_number" + id;
		$(comment_number).children().remove();  // Delete post HTML
		$(comment_number).append(`
		<input type="text" name="comment" size="20" maxlength="20" id="updateComment${data_id}" value="${comment}"/>
		`);  // Add HTML

		// relating edit update btn
		var edit_btn = "#editComment" + id;
		$(edit_btn).children().remove();  // Delete edit btn
//		Add update btn
		$(edit_btn).append(`
		<a action="/updateComment/${data_id}" method="put">
			<button type="button" class="btn btn-info"
			onclick="updateComment('${data_id}','${userId}')">Update</button>
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
function updateComment(id, userId) {

	var updata_url = "/UpdateComment/" + id;
	var updated_comment = "#updateComment" + id;
	var updata_comment = $(updated_comment).val();

	const n_comment = updata_comment.length;

	if (n_comment > 0 && n_comment <= 20) {
		$.ajax({
			url: updata_url,
			type: "PUT",
			data: {
				"id": id,
				"comment": updata_comment,
				"user_id": userId
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var comment = data_json["comment"];
			var user_id = data_json["user"]["id"];
			var user_name = data_json["user"]["user_name"];

			//  relating comment and input tag
			var comment_number = "#comment_number" + id;
			$(comment_number).children().remove();  // Delete edit HTML
			$(comment_number).append(`<h4>${comment}</h4>`);  // Add HTML

			// relating update and edit btn
			var edit_btn = "#editComment" + id;
			$(edit_btn).empty();  // Delete edit btn
//			Add edit btn
			$(edit_btn).append(`
			<a action="/editComment/${data_id}" method="get">
				<button type="button" class="btn btn-outline-info"
				onclick="getComment('${data_id}')">Edit</button>
			</a>`);

			// relating left comment
			var commentID = ".commentID" + id;
			$(commentID).remove();  // Delete edit HTML
			var commentUserId = "#commentUserId" + id;
			$(commentUserId).after(`<p class="commentID${data_id}" style="display:inline;">${comment}</p>`);  // Add HTML

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
function deleteComment(id) {

	var delete_url = "/DeleteComment/" + id;
	var html_id = "#" + id;

	if(window.confirm('Do you want to delete this comment?')){
		$.ajax({
			url: delete_url,
			type: "delete",
			data: {
				id: id,
			}
		})
		.done(function() {

			var deleteComment = "#postComment" + id;
			$(deleteComment).remove();  // delete comment HTML

			var Comment = "#Comment" + id;
			$(Comment).remove();  // delete comment HTML
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