// narrow down
$(document).ready(function(){
	$('#practiceBtn').on('click', function(){
		var choice = $("#choice").val();
		var text = $(".searchText").val();

		if (choice == 1) {

			$.ajax({
				url: "/SearchPost",
				type: "GET",
				data: {
					"text" : text,
				},
				dataType: "json"
			})
			.done(function(data) {
				var data_stringify = JSON.stringify(data);
				var data_json = JSON.parse(data_stringify);

				var i = Object.keys(data_json).length;

				if(i != 0) {
					$(".postList_left").children().remove();  // Delete post HTML
					for(let a = 0; a < i; a++) {
						var data_id = data_json[a]["id"];
						var content = data_json[a]["content"];
						var user_name = data_json[a]["user"]["user_name"];

						$(".postList_left").append(`
						<div class="contentes" id="postMain_left${data_id}">
							<h5 id="User${data_id}">@${user_name}</h5>
							<p id="contentID${data_id}" style="display:inline;">${content}</p>
							<div class="top-space">
								<!-- Edit func Ajax -->
								<div style="display:inline;" class="edit${data_id}">
									<a action="/edit/{data_id}" method="get">
										<button type="button" class="btn btn-outline-info"
										onclick="getEditFunk('${data_id}')">Edit</button>
									</a>
								</div>
								<!-- Edit func Ajax -->

								<!-- Delete function -->
								<form action="/delete/${data_id}" method="delete" style="display:inline;">
									<button type="button" class="btn btn-outline-danger"
									onclick="deleteContent('${data_id}')">Delete</button>
								</form>
								<!-- /Delete function -->
							</div>
						</div>`);
					}
				}else {
					window.alert('Matching Post didn\'t exist');
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error!");
				console.log("jqXHR          : " + jqXHR.status);
				console.log("textStatus     : " + textStatus);
				console.log("errorThrown    : " + errorThrown.message);
			})
		} else if (choice == 2) {

			$.ajax({
				url: "/SearchComment",
				type: "GET",
				data: {
					"comment" : text,
				},
				dataType: "json"
			})
			.done(function(data) {
				var data_stringify = JSON.stringify(data);
				var data_json = JSON.parse(data_stringify);

				var i = Object.keys(data_json).length;

				if(i != 0) {
					$(".postList_right").children().remove();  // Delete post HTML
					for(let a = 0; a < i; a++) {
						var data_id = data_json[a]["id"];
						var comment = data_json[a]["comment"];
						var user_name = data_json[a]["user"]["user_name"];

						$(".postList_right").append(`
						<div class="contentes" id="postMain_right${data_id}">
							<h5 id="commentUser${data_id}">@${user_name}</h5>
							<p id="commentID${data_id}" style="display:inline;">${comment}</p>
							<div class="top-space">
								<!-- Edit func Ajax -->
								<div  style="display:inline;" class="editComment${data_id}">
									<a action="/editComment/{data_id}" method="get">
										<button type="button" class="btn btn-outline-info"
										onclick="getComment('${data_id}')">Edit</button>
									</a>
								</div>
								<!-- Edit func Ajax -->

								<!-- Delete function -->
								<form action="/deleteComment/{data_id}" method="delete" style="display:inline;">
									<button type="button" class="btn btn-outline-danger"
									onclick="deleteComment('${data_id}')">Delete</button>
								</form>
								<!-- /Delete function -->
							</div>
						</div>`);
					}
				}else {
					window.alert('Matching Comment didn\'t exist');
				}

			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error!");
				console.log("jqXHR          : " + jqXHR.status);
				console.log("textStatus     : " + textStatus);
				console.log("errorThrown    : " + errorThrown.message);
			})

		} else if (choice == 3) {
			$.ajax({
				url: "/SearchCommentUser",
				type: "GET",
				data: {
					"name" : text
				},
				dataType: "json"
			})
			.done(function(data) {

				var data_stringify = JSON.stringify(data);
				var data_json = JSON.parse(data_stringify);

				var i = Object.keys(data_json).length;

				if(i != 0) {
					$(".postList_right").children().remove();  // Delete post HTML
					for(let a = 0; a < i; a++) {
						var data_id = data_json[a]["id"];
						var comment = data_json[a]["comment"];
						var user_name = data_json[a]["user_name"];

						$(".postList_right").append(`
						<div class="contentes" id="postMain_right${data_id}">
							<h5 id="commentUser${data_id}">@${user_name}</h5>
							<p id="commentID${data_id}" style="display:inline;">${comment}</p>
							<div class="top-space">
								<!-- Edit func Ajax -->
								<div  style="display:inline;" class="editComment${data_id}">
									<a action="/editComment/{data_id}" method="get">
										<button type="button" class="btn btn-outline-info"
										onclick="getComment('${data_id}')">Edit</button>
									</a>
								</div>
								<!-- Edit func Ajax -->

								<!-- Delete function -->
								<form action="/deleteComment/{data_id}" method="delete" style="display:inline;">
									<button type="button" class="btn btn-outline-danger"
									onclick="deleteComment('${data_id}')">Delete</button>
								</form>
								<!-- /Delete function -->
							</div>
						</div>`);
					}
				}

				$.ajax({
					url: "/SearchPostUser",
					type: "GET",
					data: {
						"name" : text
					},
					dataType: "json"
				})
				.done(function(data) {

					var data_stringify = JSON.stringify(data);
					var data_json = JSON.parse(data_stringify);

					var j = Object.keys(data_json).length;

					if(j != 0) {
						$(".postList_left").children().remove();  // Delete post HTML
						for(let a = 0; a < j; a++) {
							var data_id = data_json[a]["id"];
							var content = data_json[a]["content"];
							var user_name = data_json[a]["user_name"];

							$(".postList_left").append(`
							<div class="contentes" id="postMain_left${data_id}">
								<h5 id="User${data_id}">@${user_name}</h5>
								<p id="contentID${data_id}" style="display:inline;">${content}</p>
								<div class="top-space">
									<!-- Edit func Ajax -->
									<div style="display:inline;" class="edit${data_id}">
										<a action="/edit/{data_id}" method="get">
											<button type="button" class="btn btn-outline-info"
											onclick="getEditFunk('${data_id}')">Edit</button>
										</a>
									</div>
									<!-- Edit func Ajax -->

									<!-- Delete function -->
									<form action="/delete/${data_id}" method="delete" style="display:inline;">
										<button type="button" class="btn btn-outline-danger"
										onclick="deleteContent('${data_id}')">Delete</button>
									</form>
									<!-- /Delete function -->
								</div>
							</div>`);
						}
					}

					if (i == 0 && j == 0) {
						window.alert('Matching Post didn\'t exist\nMatching Comment didn\'t exist');
					} else if (i == 0) {
						window.alert('Matching Comment didn\'t exist');
					} else if (j == 0) {
						window.alert('Matching Post didn\'t exist');
					}

				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					alert("error!");
					console.log("jqXHR          : " + jqXHR.status);
					console.log("textStatus     : " + textStatus);
					console.log("errorThrown    : " + errorThrown.message);
				})

			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error!");
				console.log("jqXHR          : " + jqXHR.status);
				console.log("textStatus     : " + textStatus);
				console.log("errorThrown    : " + errorThrown.message);
			})
		}
	})

//  all posts get func
	$('#PostList').on('click', function() {
		$.ajax({
			url: "/AllPost",
			type: "GET",
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var i = Object.keys(data_json).length;
			$(".searchText").val("");

			if(i != 0) {
				$(".postList_left").children().remove();  // Delete post HTML
				for(let a = 0; a < i; a++) {
					var data_id = data_json[a]["id"];
					var content = data_json[a]["content"];
					var user_name = data_json[a]["user"]["user_name"];

					$(".postList_left").append(`
					<div class="contentes" id="postMain_left${data_id}">
						<h5 id="User${data_id}">@${user_name}</h5>
						<p id="contentID${data_id}" style="display:inline;">${content}</p>
						<div class="top-space">
							<!-- Edit func Ajax -->
							<div style="display:inline;" class="edit${data_id}">
								<a action="/edit/{data_id}" method="get">
									<button type="button" class="btn btn-outline-info"
									onclick="getEditFunk('${data_id}')">Edit</button>
								</a>
							</div>
							<!-- Edit func Ajax -->

							<!-- Delete function -->
							<form action="/delete/${data_id}" method="delete" style="display:inline;">
								<button type="button" class="btn btn-outline-danger"
								onclick="deleteContent('${data_id}')">Delete</button>
							</form>
							<!-- /Delete function -->
						</div>
					</div>`);
				}
			}else {
				window.alert('Post didn\'t exist');
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
	})

//	all comment get func
	$('#CommentList').on('click', function() {
		$.ajax({
			url: "/AllComment",
			type: "GET",
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var i = Object.keys(data_json).length;
			$(".searchText").val("");

			if(i != 0) {
				$(".postList_right").children().remove();  // Delete post HTML
				for(let a = 0; a < i; a++) {
					var data_id = data_json[a]["id"];
					var comment = data_json[a]["comment"];
					var user_name = data_json[a]["user"]["user_name"];

					$(".postList_right").append(`
					<div class="contentes" id="postMain_right${data_id}">
						<h5 id="commentUser${data_id}">@${user_name}</h5>
						<p id="commentID${data_id}" style="display:inline;">${comment}</p>
						<div class="top-space">
							<!-- Edit func Ajax -->
							<div  style="display:inline;" class="editComment${data_id}">
								<a action="/editComment/{data_id}" method="get">
									<button type="button" class="btn btn-outline-info"
									onclick="getComment('${data_id}')">Edit</button>
								</a>
							</div>
							<!-- Edit func Ajax -->

							<!-- Delete function -->
							<form action="/deleteComment/{data_id}" method="delete" style="display:inline;">
								<button type="button" class="btn btn-outline-danger"
								onclick="deleteComment('${data_id}')">Delete</button>
							</form>
							<!-- /Delete function -->
						</div>
					</div>`);
				}
			}else {
				window.alert('Comment didn\'t exist');
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
// narrow down

// --------------post-------------------

// New Post on postList.html
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

			$(".postList_left").prepend(`
			<div class="contentes" id="postMain_left${data_id}">
				<h5 id="User${data_id}">@${user_name}</h5>
				<p id="contentID${data_id}" style="display:inline;">${content}</p>
				<div class="top-space">
					<!-- Edit func Ajax -->
					<div  style="display:inline;" class="edit${data_id}">
						<a method="get" action="/edit/${data_id}">
							<button type="button" class="btn btn-outline-info"
							onclick="getEditFunk('${data_id}')">Edit</button>
						</a>
					</div>
					<!-- Edit func Ajax -->

					<!-- Delete function -->
					<form action="/delete/${data_id}" method="delete" style="display:inline;">
						<button type="button" onclick="deleteContent('${data_id}')"
						class="btn btn-outline-danger">Delete</button>
					</form>
					<!-- /Delete function -->
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

//Edit func content - get info
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

		var original = "#contentID" + data_id;
		$(original).remove();

		var add_content = "#User" + data_id;
		$(add_content).after(`
		<input type="text" name="content" size="20" maxlength="20" id="update${data_id}" value="${content}"
		class="contentID${data_id}"/>
		`);

		var edit_btn = ".edit" + data_id;
		$(edit_btn).children().remove();
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
// Edit func content - get info

//Edit func content - updata info
function updataFunk(id,userId) {

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
//			var user_id = data_json["user_id"];
//			var user_name = data_json["user"]["user_name"];

			var input_tag = ".contentID" + data_id;
			$(input_tag).remove();

			var add_content = "#User" + data_id;
			$(add_content).after(`<p id="contentID${data_id}" style="display:inline;">${content}</p>`);

			var edit_btn = ".edit" + data_id;
			$(edit_btn).children().remove();
			$(edit_btn).append(`
			<a action="/edit/${data_id}" method="get">
				<button type="button" class="btn btn-outline-info"
				onclick="getEditFunk('${data_id}')">Edit</button>
			</a>`);

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
// Edit func content - updata info

//Delete function content
function deleteContent(id) {

	var delete_url = "/Delete/" + id;

	if(window.confirm('Do you want to delete this post?')){
		$.ajax({
			url: delete_url,
			type: "delete",
			data: {
				id: id,
			}
		})
		.done(function() {
			var delete_html = "#postMain_left" + id;
			$(delete_html).remove();  // delete post HTML



			$.ajax({
				url: "/AllComment",
				type: "GET",
				data: {

				},
				dataType: "json"
			})
			.done(function(data) {
				var data_stringify = JSON.stringify(data);
				var data_json = JSON.parse(data_stringify);

				var i = Object.keys(data_json).length;
				$(".searchText").val("");

				if(i != 0) {
					$(".postList_right").children().remove();  // Delete post HTML
					for(let a = 0; a < i; a++) {
						var data_id = data_json[a]["id"];
						var comment = data_json[a]["comment"];
						var user_name = data_json[a]["user"]["user_name"];

						$(".postList_right").append(`
						<div class="contentes" id="postMain_right${data_id}">
							<h5 id="commentUser${data_id}">@${user_name}</h5>
							<p id="commentID${data_id}" style="display:inline;">${comment}</p>
							<div class="top-space">
								<!-- Edit func Ajax -->
								<div  style="display:inline;" class="editComment${data_id}">
									<a action="/editComment/{data_id}" method="get">
										<button type="button" class="btn btn-outline-info"
										onclick="getComment('${data_id}')">Edit</button>
									</a>
								</div>
								<!-- Edit func Ajax -->

								<!-- Delete function -->
								<form action="/deleteComment/{data_id}" method="delete" style="display:inline;">
									<button type="button" class="btn btn-outline-danger"
									onclick="deleteComment('${data_id}')">Delete</button>
								</form>
								<!-- /Delete function -->
							</div>
						</div>`);
					}
				}else {
					window.alert('Comment didn\'t exist');
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error!");
				console.log("jqXHR          : " + jqXHR.status);
				console.log("textStatus     : " + textStatus);
				console.log("errorThrown    : " + errorThrown.message);
			})







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
//Delete function content

// --------------comment-------------------

//Edit func comment - get info
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

		var original = "#commentID" + data_id;
		$(original).remove();

		var add_content = "#commentUser" + data_id;
		$(add_content).after(`
		<input type="text" name="comment" size="20" maxlength="20" id="updateComment${data_id}" value="${comment}"/>
		`);

		var edit_btn = ".editComment" + data_id;
		$(edit_btn).children().remove();
		$(edit_btn).append(`
		<a action="/updataupdateComment/${data_id}" method="put">
			<button type="button" class="btn btn-info"
			onclick="updateComment('${data_id}')">Update</button>
		</a>`);

	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert("error!");
		console.log("jqXHR          : " + jqXHR.status);
		console.log("textStatus     : " + textStatus);
		console.log("errorThrown    : " + errorThrown.message);
	})

};
// Edit func comment - get info

//Edit func comment - updata info
function updateComment(id) {

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
				"comment": updata_comment
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var comment = data_json["comment"];
			$(updated_comment).remove();

			var add_content = "#commentUser" + data_id;
			$(add_content).after(`<p id="commentID${data_id}" style="display:inline;">${comment}</p>`);

			var edit_btn = ".editComment" + data_id;
			$(edit_btn).children().remove();
			$(edit_btn).append(`
			<a action="/edit/${data_id}" method="get">
				<button type="button" class="btn btn-outline-info"
				onclick="getComment('${data_id}')">Edit</button>
			</a>`);

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
// Edit func comment - updata info

//Delete function comment
function deleteComment(id) {

	var delete_url = "/DeleteComment/" + id;

	if(window.confirm('Do you want to delete this comment?')){
		$.ajax({
			url: delete_url,
			type: "delete",
			data: {
				id: id,
			}
		})
		.done(function() {
			var delete_html = "#postMain_right" + id;
			$(delete_html).remove();  // delete post HTML
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
//Delete function comment