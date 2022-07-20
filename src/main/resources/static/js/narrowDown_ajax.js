
$(document).ready(function(){
	$('#practiceBtn').on('click', function(){
		var choice = $("#choice").val();
		var text = $(".searchText").val();
		if (choice == 1) {

			var postAjax = {
				url: "/SearchPost",
				type: "GET",
				data: {
					"text" : text,
				},
				dataType: "json"
			}

			var commentAjax = {
				url: "/AllComment",
				type: "GET",
				dataType: "json"
			}

			$.when(
				$.ajax(postAjax),
				$.ajax(commentAjax)
			)
			.done(function(postData,commentData){
//				post
				var data_stringify = JSON.stringify(postData);
				var data_json = JSON.parse(data_stringify);
				var i = Object.keys(data_json[0]).length;
//				comment
				var comment_data_stringify = JSON.stringify(commentData);
				var comment_data_json = JSON.parse(comment_data_stringify);
				var k = Object.keys(comment_data_json[0]).length;

				if(i != 0) {
					$(".left-contents").children().remove();  // Delete post HTML
					for(let a = 0; a < i; a++) {
						var data_id = data_json[0][a]["id"];
						var content = data_json[0][a]["content"];
						var user_name = data_json[0][a]["user"]["user_name"];
						var post_user_id = data_json[0][a]["user"]["id"];
						$(".left-contents").append(`
						<div class="contentes" id="${data_id}">
							<div id="common-wrapper" class="common_wrapper${data_id}">
								<div class="list_post" id="list_post${data_id}">
									<h5 id="userID${data_id}" class="PCUserNumber${post_user_id}">
										@${user_name}
									</h5>
									<p id="contentID${data_id}" style="display:inline;">${content}</p>
									<form method="post" action="/addComment">
										<input type="text" name="content" size="20" maxlength="20" style="height: 2rem;" class="reply${data_id}"/>
										<button onclick="comment('${post_user_id}','${data_id}','${data_id}')"
										 class="btn btn-info" type="button">Reply</button>
									</form>
								</div>
							</div>
						</div>`);

						if(k != 0) {
							for(let b = 0; b < k; b++) {
								var comment_data_id = comment_data_json[0][b]["id"];
								var comment = comment_data_json[0][b]["comment"];
								var comment_user_name = comment_data_json[0][b]["user"]["user_name"];
								var comment_content_id = comment_data_json[0][b]["reportuser"]["id"];
								var comment_user_id = comment_data_json[0][b]["user"]["id"];

								var list_post = "#list_post" + data_id;
								if (comment_content_id == data_id) {
									$(list_post).after(`
									<div id="postComment${comment_data_id}">
										<h5 id="commentUserId${comment_data_id}" class="PCUserNumber${comment_user_id}">
											@${comment_user_name}
										</h5>
										<p class="commentID${comment_data_id}" style="display:inline;">
											${comment}
										</p>
									</div>`);
								}
							}
						}

					}
				} else {
					window.alert('Matching Post didn\'t exist');
				}

			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error!");  // 通信に失敗した場合の処理
				console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
				console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
				console.log("errorThrown    : " + errorThrown.message); // 例外情報
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
					$(".left-contents").children().remove();  // Delete post HTML
					for(let a = 0; a < i; a++) {
						var data_id = data_json[a]["id"];
						var comment = data_json[a]["comment"];
						var user_name = data_json[a]["user"]["user_name"];
						var comment_user_id = data_json[a]["user"]["id"];

						$(".left-contents").append(`
						<div class="list_post" id="postComment${data_id}">
							<h5 id="commentUserId${data_id}" class="PCUserNumber${comment_user_id}">
								@${user_name}
							</h5>
							<p class="commentID${data_id}" style="display:inline;">
								 ${comment}
							</p>
						</div>`);
					}
				} else {
					window.alert('Matching Comment didn\'t exist');
				}

			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error!");  // 通信に失敗した場合の処理
				console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
				console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
				console.log("errorThrown    : " + errorThrown.message); // 例外情報
			})
		} else if (choice == 3) {

			var postAjax = {
				url: "/SearchPostUser",
				type: "GET",
				data: {
					"name" : text
				},
				dataType: "json"
			}

			var commentAjax = {
				url: "/AllComment",
				type: "GET",
				dataType: "json"
			}

			$.when(
				$.ajax(postAjax),
				$.ajax(commentAjax)
			)
			.done(function(postData,commentData){
//				user
				var data_stringify = JSON.stringify(postData);
				var data_json = JSON.parse(data_stringify);
				var i = Object.keys(data_json[0]).length;

//				comment
				var comment_data_stringify = JSON.stringify(commentData);
				var comment_data_json = JSON.parse(comment_data_stringify);
				var k = Object.keys(comment_data_json[0]).length;

				if(i != 0) {
					$(".postList_right").children().remove();  // Delete post HTML
					for(let a = 0; a < i; a++) {
						$(".left-contents").children().remove();  // Delete post HTML
						for(let a = 0; a < i; a++) {
							var data_id = data_json[0][a]["id"];
							var content = data_json[0][a]["content"];
							var user_name = data_json[0][a]["user_name"];
							var post_user_id = data_json[0][a]["user_id"];
							$(".left-contents").append(`
							<div class="contentes" id="${data_id}">
								<div id="common-wrapper" class="common_wrapper${data_id}">
									<div class="list_post" id="list_post${data_id}">
										<h5 id="userID${data_id}" class="PCUserNumber${post_user_id}">
											@${user_name}
										</h5>
										<p id="contentID${data_id}" style="display:inline;">${content}</p>
										<form method="post" action="/addComment">
											<input type="text" name="content" size="20" maxlength="20" style="height: 2rem;" class="reply${data_id}"/>
											<button onclick="comment('${post_user_id}','${data_id}','${data_id}')"
											 class="btn btn-info" type="button">Reply</button>
										</form>
									</div>
								</div>
							</div>`);

							if(k != 0) {
								for(let b = 0; b < k; b++) {
									var comment_data_id = comment_data_json[0][b]["id"];
									var comment = comment_data_json[0][b]["comment"];
									var comment_user_name = comment_data_json[0][b]["user"]["user_name"];
									var comment_content_id = comment_data_json[0][b]["reportuser"]["id"];
									var comment_user_id = comment_data_json[0][b]["user"]["id"];

									var list_post = "#list_post" + data_id;
									if (comment_content_id == data_id) {
										$(list_post).after(`
										<div id="postComment${comment_data_id}">
											<h5 id="commentUserId${comment_data_id}" class="PCUserNumber${comment_user_id}">
												@${comment_user_name}
											</h5>
											<p class="commentID${comment_data_id}" style="display:inline;">
												${comment}
											</p>
										</div>`);
									}
								}
							}
						}
					}
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error!");  // 通信に失敗した場合の処理
				console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
				console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
				console.log("errorThrown    : " + errorThrown.message); // 例外情報
			})

		}
	})

})