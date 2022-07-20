package com.example.demo.controller;

import java.text.ParseException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.entity.Comment;
import com.example.demo.entity.CommentUserReport;
import com.example.demo.entity.ReportUser;
import com.example.demo.service.CommentService;
import com.example.demo.service.ReportService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class CommentController {

	@Autowired
	ReportService reportService;

	@Autowired
	CommentService commentService;

	@Autowired
	HttpSession session;

	// comment Ajax
	@PostMapping("/AddComment")
	@ResponseBody
	public String addComment(
			@RequestParam(name="comment") String comment_content,
			@RequestParam(name="user_id") Integer user_id,
			@RequestParam(name="content_id") Integer content_id) {

		Comment comment = new Comment();

		comment.setComment(comment_content);
		comment.setUser_id(user_id);
		comment.setContent_id(content_id);

		commentService.addComment(comment);

		CommentUserReport commentUser = new CommentUserReport();

		commentUser = commentService.getLatesComment();

		return commentJson(commentUser);
	}

	private String commentJson(CommentUserReport commentUser){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(commentUser);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// comment Ajax

	// Edit func Ajax - bring info from DB
	@GetMapping("/EditComment/{id}")
	@ResponseBody
	public String editContent(@PathVariable Integer id) {
		// get a comment to edit
		Comment comment = commentService.getComment(id);

		return getEditJson(comment);
	}

	private String getEditJson(Comment editComment){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(editComment);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// Edit func Ajax - bring info from DB

	// Update func Ajax - update info of DB
	@PutMapping("/UpdateComment/{id}")
	@ResponseBody
	public String updateComment (@PathVariable Integer id,
			@RequestParam(name="comment")  String newComment) {

		Comment comment = commentService.getComment(id);

		comment.setComment(newComment);

		// Update edited comment
		commentService.addComment(comment);

		// get info users with reports
		CommentUserReport commentUserReport = commentService.getCommentUserReport(id);

		return putEditJson(commentUserReport);
	}

	private String putEditJson(CommentUserReport commentUserReport) {
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(commentUserReport);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// Update func Ajax - update info of DB

	// Delete function Ajax
	@DeleteMapping("/DeleteComment/{id}")
	@ResponseBody
	public void deleteContent(@PathVariable Integer id) {
		// Delete post from DB
		commentService.deleteCommentById(id);
	}
	// Delete function Ajax

	// search function
	@GetMapping("/SearchComment")
	@ResponseBody
	public String narrowContent(@RequestParam String comment) throws ParseException {
		List<CommentUserReport> narrowDownComment = commentService.narrowDownComment(comment);
		return  CommentJson(narrowDownComment);
	}

	private String CommentJson(List<CommentUserReport> narrowComment){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(narrowComment);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// search function

	// get all comment function
	@GetMapping("/AllComment")
	@ResponseBody
	public String allContent() throws ParseException {
		List<CommentUserReport> AllComment = commentService.findAllUserComment();
		return  AllCommentJson(AllComment);
	}

	private String AllCommentJson(List<CommentUserReport> allComment){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(allComment);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// get all comment function

//	display commentPost page
	@GetMapping("/PostList")
	public ModelAndView userList() {
		ModelAndView mav = new ModelAndView();

		List<ReportUser> UsersPosts = reportService.findAllUsersReport();
		List<CommentUserReport> commentUserPost = commentService.findAllUserComment();

		mav.setViewName("postlist");
		mav.addObject("reportUser", UsersPosts);
		mav.addObject("commentUserReport", commentUserPost);
		mav.addObject("loginUser", session.getAttribute("loginUser"));
		return mav;
	}
//	display commentPost page


}
