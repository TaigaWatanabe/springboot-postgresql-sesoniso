package com.example.demo.controller;

import java.text.ParseException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.entity.Comment;
import com.example.demo.entity.CommentUserReport;
import com.example.demo.entity.Report;
import com.example.demo.entity.ReportUser;
import com.example.demo.entity.User;
import com.example.demo.service.CommentService;
import com.example.demo.service.ReportService;
import com.example.demo.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@Controller
public class ForumController {
	@Autowired
	ReportService reportService;

	@Autowired
	UserService userService;

	@Autowired
	CommentService commentService;

	@Autowired
	HttpSession session;

	// Display Top page
	@GetMapping("/BullitinBoard")
	public ModelAndView top() {
		ModelAndView mav = new ModelAndView();

		// get info users with reports
		List<ReportUser> UsersPosts = reportService.findAllUsersReport();
		List<CommentUserReport> commentUserPost = commentService.findAllUserComment();

		// Getting login user informations
		List<User> user = (List<User>) session.getAttribute("loginUser");
		Integer userId = user.get(0).getId();
		User userData = userService.getUserInfo(userId);

		//get a filtered posts
		List<Report> contentFilterdData = reportService.findAllReportByUserId(userId);
		//get a filtered commentss
		List<Comment> commentFilterdData = commentService.findAllCommentByUserId(userId);

		// Set a top page
		mav.setViewName("top");
		// Store an object
		mav.addObject("UsersPosts", UsersPosts);
		mav.addObject("userInfo",userData);
		mav.addObject("commentUserPost", commentUserPost);
		mav.addObject("loginUser", session.getAttribute("loginUser"));
		mav.addObject("userContents", contentFilterdData);
		mav.addObject("userComments", commentFilterdData);

		return mav;
	}

	// Post function Ajax
	@PostMapping("/Add")
	@ResponseBody
	public String addContent(@ModelAttribute("formModel") Report report) {

		List<User> user = (List<User>) session.getAttribute("loginUser");
		Integer userId = user.get(0).getId();
		report.setUser_id(userId);

		// 投稿をテーブルに格納
		reportService.saveReport(report);

		// get info users with reports
		List<ReportUser> LatesUsersPost = reportService.findLatestUsersPost();


		return postJson(LatesUsersPost);
	}

	private String postJson(List<ReportUser> LatestPost){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(LatestPost);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// Post function Ajax

	// Delete function Ajax
	@DeleteMapping("/Delete/{id}")
	@ResponseBody
	public void deleteContent(@PathVariable Integer id) {
		// Delete post from DB
		reportService.deleteReport(id);
		commentService.deleteComment(id);
	}
	// Delete function Ajax

	// Edit func Ajax - bring info from DB
	@GetMapping("/Edit/{id}")
	@ResponseBody
	public String editContent(@PathVariable Integer id) {
		// 編集する投稿を取得
		Report report = reportService.editReport(id);

		return getEditJson(report);
	}

	private String getEditJson(Report editContent){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(editContent);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// Edit func Ajax - bring info from DB

	// Update func Ajax - update info of DB
	@PutMapping("/Updata/{id}")
	@ResponseBody
	public String updateContent (@PathVariable Integer id,@RequestParam  String content
			,@RequestParam  Integer user_id) {

		Report report = new Report();

		report.setContent(content);
		report.setId(id);
		report.setUser_id(user_id);

		// Update edited post
		reportService.saveReport(report);

		// get info users with reports
		ReportUser UsersPosts = reportService.findPostById(id);

		return putEditJson(UsersPosts);
	}

	private String putEditJson(ReportUser editContent){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(editContent);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// Update func Ajax - update info of DB

	// search function
	@GetMapping("/SearchPost")
	@ResponseBody
	public String narrowContent(@RequestParam String text) throws ParseException {
		List<ReportUser> narrowDownReport = reportService.narrowDownContent(text);
		return  ReportJson(narrowDownReport);
	}

    private String ReportJson(List<ReportUser> narrowContent){
        String retVal = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            retVal = objectMapper.writeValueAsString(narrowContent);
        } catch (JsonProcessingException e) {
            System.err.println(e);
        }
        return retVal;
    }
	// search function

	// get all post function
	@GetMapping("/AllPost")
	@ResponseBody
	public String allContent() throws ParseException {
		List<ReportUser> AllReport = reportService.findAllUsersReport();
		return  allReportJson(AllReport);
	}

    private String allReportJson(List<ReportUser> AllReport){
        String retVal = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            retVal = objectMapper.writeValueAsString(AllReport);
        } catch (JsonProcessingException e) {
            System.err.println(e);
        }
        return retVal;
    }
	// get all post function

}
