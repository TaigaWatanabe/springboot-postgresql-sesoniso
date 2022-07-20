package com.example.demo.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.entity.CommentUser;
import com.example.demo.entity.CommentUserReport;
import com.example.demo.entity.LimitedReportUser;
import com.example.demo.entity.ReportUser;
import com.example.demo.entity.User;
import com.example.demo.service.CommentService;
import com.example.demo.service.ReportService;
import com.example.demo.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class UserController {
	@Autowired
	ReportService reportService;

	@Autowired
	UserService userService;

	@Autowired
	CommentService commentService;

	@Autowired
	HttpSession session;

	// Edit func Ajax - bring info from DB
	@GetMapping("/UserEdit/{id}")
	@ResponseBody
	public String editContent(@PathVariable Integer id) {

		User user = userService.getUserInfo(id);

		return getEditJson(user);
	}

	private String getEditJson(User user){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(user);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// Edit func Ajax - bring info from DB

	// Update func Ajax - update info of DB
	@PutMapping("/UserUpdata/{id}")
	@ResponseBody
	public String updateContent (@PathVariable Integer id,
			@RequestParam(name="name") String name,
			@RequestParam(name="user_name") String user_name,
			@RequestParam(name="password") String password) {

		List<String> errorMessages = new ArrayList<String>();
		User UserLatestInfo = new User();
		UserLatestInfo.setId(id);
		List<ReportUser> UsersPosts = reportService.findAllUsersReport();
		List<CommentUserReport> commentUserPost = commentService.findAllUserComment();


		// get all accounts
		List<User> confirmName = userService.selectName(user_name);

		User UserInfo = userService.getUserInfo(id);

		// distinguish valid or not related to Name
		if (!StringUtils.hasText(name)) {
			UserLatestInfo.setName("0");
			errorMessages.add("error");
		} else if(!(name.length() <= 20)) {
			UserLatestInfo.setName("-1");
			errorMessages.add("error");
		} else {
			UserLatestInfo.setName(name);
		}

		// distinguish valid or not related to User Name
		if (!StringUtils.hasText(user_name)) {
			UserLatestInfo.setUser_name("0");
			errorMessages.add("error");
		} else if(user_name.matches(UserInfo.getUser_name())) {
			UserLatestInfo.setUser_name(user_name);
		} else if (confirmName.size() == 1) {
			UserLatestInfo.setUser_name("-1");
			errorMessages.add("error");
		} else if(!(user_name.length() <= 20)) {
			UserLatestInfo.setUser_name("-2");
			errorMessages.add("error");
		}  else {
			UserLatestInfo.setUser_name(user_name);
		}

		// distinguish valid or not related to Password
		if (!StringUtils.hasText(password)){
			UserLatestInfo.setPassword(UserInfo.getPassword());
		} else if (!(password.matches("^[a-zA-Z0-9]+$"))) {
			UserLatestInfo.setPassword("-1");
			errorMessages.add("error");
		} else if (!(password.length() >= 6)) {
			UserLatestInfo.setPassword("-2");
			errorMessages.add("error");
		} else if (!(password.length() <= 20)) {
			UserLatestInfo.setPassword("-3");
			errorMessages.add("error");
		}  else if (StringUtils.hasText(password)) {
			UserLatestInfo.setPassword(password);
		}

		UserLatestInfo.setAdmin_user(UserInfo.getAdmin_user());
		UserLatestInfo.setAccount_status(UserInfo.getAccount_status());

		if (errorMessages.size() == 0) {
			if (!StringUtils.hasText(password)) {
				userService.registUserNotencyptPassword(UserLatestInfo);
			} else if (StringUtils.hasText(password)) {
				userService.registUser(UserLatestInfo);
			}

			// Get edited user
			UserLatestInfo = userService.getUserInfo(id);
		}

		return putEditJson(UserLatestInfo);
	}

	private String putEditJson(User userLatestInfo){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(userLatestInfo);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// Update func Ajax - update info of DB


	//display User list page
	@GetMapping("/UserList")
	public ModelAndView userList() {
		ModelAndView mav = new ModelAndView();

		List<User> UserInfoAll = userService.findAllUser();
		List<ReportUser> UsersPosts = reportService.findAllUsersReport();
		List<CommentUserReport> commentUserPost = commentService.findAllUserComment();

		int count;
		// repoat number
		for (int i = 0; i < UserInfoAll.size(); i++) {
			count = 0;
			Integer user_id = UserInfoAll.get(i).getId();
			for (int j = 0; j < UsersPosts.size(); j++) {
				if(UsersPosts.get(j).getUser().getId() == user_id) {
					count = count + 1;
				}
			}
			UserInfoAll.get(i).setReportCount(count);
		}

		// comment number
		for (int i = 0; i < UserInfoAll.size(); i++) {
			count = 0;
			Integer user_id = UserInfoAll.get(i).getId();
			for (int j = 0; j < commentUserPost.size(); j++) {
				if(commentUserPost.get(j).getUser().getId() == user_id) {
					count = count + 1;
				}
			}
			UserInfoAll.get(i).setCommentCount(count);
		}

		mav.setViewName("userlist");
		mav.addObject("userInfoAll", UserInfoAll);
		mav.addObject("loginUser", session.getAttribute("loginUser"));
		return mav;
	}

	// change user status
	@PutMapping("/Change")
	@ResponseBody
	public String userStatus(
			@RequestParam(name="id") Integer user_id,
			@RequestParam(name="account_status") Integer status) {

		User UserStatus = new User();
		UserStatus = userService.getUserInfo(user_id);

		if (status == 0) {
			UserStatus.setAccount_status(1);
		} else {
			UserStatus.setAccount_status(0);
		}

		userService.registUserNotencyptPassword(UserStatus);

		return putUserJson(UserStatus);
	}

	// common component admin_user with user_status
	private String putUserJson(User userLatestInfo){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(userLatestInfo);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	//common component admin_user with user_status

	// change user status

	// change admin and general
	@PutMapping("/AdminGeneral")
	@ResponseBody
	public String userChange(
			@RequestParam(name="id") Integer user_id,
			@RequestParam(name="admin_user") Integer admin_user) {

		User UserStatus = new User();
		UserStatus = userService.getUserInfo(user_id);

		if (admin_user == 0) {
			UserStatus.setAdmin_user(1);
		} else {
			UserStatus.setAdmin_user(0);
		}

		userService.registUserNotencyptPassword(UserStatus);

		return putUserJson(UserStatus);
	}
	//common component admin_user with user_status
	//common component admin_user with user_status

	// change admin and general

	// search function comment by user_name
	@GetMapping("/SearchCommentUser")
	@ResponseBody
	public String narrowUser(@RequestParam String name) throws ParseException {

		List<CommentUser> narrowDownUserComment = commentService.findUserByUserName(name);

		return  UserCommentJson(narrowDownUserComment);
	}

	private String UserCommentJson(List<CommentUser> narrowDownUserComment){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(narrowDownUserComment);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// search function comment by user_name

	// search function report by user_name
	@GetMapping("/SearchPostUser")
	@ResponseBody
	public String narrowUserPost(@RequestParam String name) throws ParseException {

		List<LimitedReportUser> narrowDownUserPost = reportService.findUserByUserName(name);

		return  UserPostJson(narrowDownUserPost);
	}

	private String UserPostJson(List<LimitedReportUser> narrowDownUserPost){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(narrowDownUserPost);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// search function report by user_name

	// search function user by user_name
	@GetMapping("/SearchUser")
	@ResponseBody
	public String narrowDownUser(@RequestParam String name) throws ParseException {

		List<User> narrowDownUser = userService.findUserByUserName(name);//あいまい検索

		List<ReportUser> UsersPosts = reportService.findAllUsersReport();
		List<CommentUserReport> commentUserPost = commentService.findAllUserComment();

		int count;
		// repoat number
		for (int i = 0; i < narrowDownUser.size(); i++) {
			count = 0;
			Integer user_id = narrowDownUser.get(i).getId();
			for (int j = 0; j < UsersPosts.size(); j++) {
				if(UsersPosts.get(j).getUser().getId() == user_id) {
					count = count + 1;
				}
			}
			narrowDownUser.get(i).setReportCount(count);
		}

		// comment number
		for (int i = 0; i < narrowDownUser.size(); i++) {
			count = 0;
			Integer user_id = narrowDownUser.get(i).getId();
			for (int j = 0; j < commentUserPost.size(); j++) {
				if(commentUserPost.get(j).getUser().getId() == user_id) {
					count = count + 1;
				}
			}
			narrowDownUser.get(i).setCommentCount(count);
		}

		return  UserJson(narrowDownUser);
	}

	private String UserJson(List<User> narrowDownUser){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(narrowDownUser);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// search function user by user_name

	// get all users function
	@GetMapping("/AllUser")
	@ResponseBody
	public String allUser() throws ParseException {

		List<User> AllUser = userService.findAllUser();
		List<ReportUser> UsersPosts = reportService.findAllUsersReport();
		List<CommentUserReport> commentUserPost = commentService.findAllUserComment();

		int count;
		// repoat number
		for (int i = 0; i < AllUser.size(); i++) {
			count = 0;
			Integer user_id = AllUser.get(i).getId();
			for (int j = 0; j < UsersPosts.size(); j++) {
				if(UsersPosts.get(j).getUser().getId() == user_id) {
					count = count + 1;
				}
			}
			AllUser.get(i).setReportCount(count);
		}

		// comment number
		for (int i = 0; i < AllUser.size(); i++) {
			count = 0;
			Integer user_id = AllUser.get(i).getId();
			for (int j = 0; j < commentUserPost.size(); j++) {
				if(commentUserPost.get(j).getUser().getId() == user_id) {
					count = count + 1;
				}
			}
			AllUser.get(i).setCommentCount(count);
		}

		return  allReportJson(AllUser);
	}

	private String allReportJson(List<User> UserAll){
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			retVal = objectMapper.writeValueAsString(UserAll);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	// get all users function

}
