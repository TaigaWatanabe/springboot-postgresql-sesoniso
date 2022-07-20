package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Controller
public class LoginLogoutController {

	@Autowired
	UserService userService;

	@Autowired
	HttpSession session;

	// about signup

	//display register page
	@GetMapping("/SignUp")
	public ModelAndView newContent() {
		ModelAndView mav = new ModelAndView();
		List<String> errorMessages = new ArrayList<String>();
		List<User> loginUser = (List<User>) session.getAttribute("loginUser");
		if(loginUser != null) {
			errorMessages.add("Input invalid letters");
			session.setAttribute("errorMessages", errorMessages);
			mav.setViewName("redirect:BullitinBoard");
			return mav;
		}

		User user = new User();

		mav.setViewName("signup");

		mav.addObject("formModel", user);
		return mav;
	}

	// register account
	@PostMapping("/SignUp")
	public ModelAndView addUser(@ModelAttribute("formModel") User user,
			@RequestParam(name = "name") String name,
			@RequestParam(name = "user_name") String user_name,
			@RequestParam(name = "confirmationPassword") String confirmationPassword) {
		ModelAndView mav = new ModelAndView();
		List<String> errorMessages = new ArrayList<String>();

		// get all accounts
		List<User> confirmName = userService.selectName(user_name);

		// distinguish valid or not related to Name
		if (!StringUtils.hasText(user.getName())) {
			errorMessages.add("Please input a Name");
		} else if(!(user.getName().length() <= 20)) {
			errorMessages.add("Please input the Name using 20 characters or less");
		}

		// distinguish valid or not related to User Name
		if (!StringUtils.hasText(user.getUser_name())) {
			errorMessages.add("Please input a User Name");
		} else if (confirmName.size() == 1) {
			errorMessages.add("Duplicate User Name");
		} else if(!(user.getUser_name().length() <= 20)) {
			errorMessages.add("Please input the User Name using 20 characters or less");
		}

		// distinguish valid or not related to Password
		if (!StringUtils.hasText(user.getPassword())) {
			errorMessages.add("Please input a Password");
			// If the password is full-width
		} else if (!(user.getPassword().matches("^[a-zA-Z0-9]+$"))) {
			errorMessages.add("Please input at least 6 single-byte alphanumerical characters for the Password");
			errorMessages.add("Please input the Password using up to 20 single-byte alphanumers.");
		} else if (!(user.getPassword().length() >= 6)) {
			errorMessages.add("Please input at least 6 single-byte alphanumerical characters for the Password");
		} else if (!(user.getPassword().length() <= 20)) {
			errorMessages.add("Please enter the Password using up to 20 single-byte alphanumers");
		}

		// distingish password == confarmation password
		if (!(user.getPassword().equals(confirmationPassword))) {
			errorMessages.add("The Password you inputed does not match with the Confirmation Password");
		}

		if (errorMessages.size() != 0) {
			User userValue = new User();
			userValue.setName(user.getName());
			userValue.setUser_name(user.getUser_name());
			mav.addObject("formModel", userValue);
			mav.addObject("errorMessages", errorMessages);
			mav.setViewName("signup");
			return mav;
		}

		userService.registUser(user);

		return new ModelAndView("redirect:Login");
	}


	// about login and logout

	//display login page
	@GetMapping("/Login")
	public ModelAndView login() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("login");
		mav.addObject("errorMessagesLogin", session.getAttribute("errorMessagesLogin"));
		return mav;
	}


	//login
	@PostMapping("/Login")
	public ModelAndView loginContent(HttpServletRequest request, HttpServletResponse response, Model model) {

		String name = request.getParameter("name");
		String user_name = request.getParameter("user_name");
		String password = request.getParameter("password");

		ModelAndView mav = new ModelAndView();
		List<String> errorMessages = new ArrayList<String>();

		if ((name == "") && (user_name == "") && (password == "")) {
			errorMessages.add("Please input a correct Name");
			errorMessages.add("Please input a correct User Name");
			errorMessages.add("Please input a correct Password");
			mav.addObject("errorMessagesLogin", errorMessages);
			session.removeAttribute("loginUser");
			mav.setViewName("login");
			return mav;
		} else if (name == "") {
			errorMessages.add("Please input a correct Name");
			mav.addObject("errorMessagesLogin", errorMessages);
			session.removeAttribute("loginUser");
			mav.setViewName("login");
			return mav;
		} else if (user_name == "") {
			errorMessages.add("Please input a correct User Name");
			mav.addObject("errorMessagesLogin", errorMessages);
			session.removeAttribute("loginUser");
			mav.setViewName("login");
			return mav;
		} else if (password == "") {
			errorMessages.add("Please input a correct Password");
			mav.addObject("errorMessagesLogin", errorMessages);
			session.removeAttribute("loginUser");
			mav.setViewName("login");
			return mav;
		}

		List<User> accountData = userService.selectAccount(name, password);

		if (accountData.size() == 0) {
			errorMessages.add("Wrong Name or User Name or Password");
			mav.addObject("errorMessagesLogin", errorMessages);
			session.removeAttribute("loginUser");
			mav.setViewName("login");
			return mav;
		}

		if (session.getAttribute("loginUser") != null) {
			errorMessages.add("This account is already logged in!");
			mav.addObject("errorMessagesLogin", errorMessages);
			session.removeAttribute("loginUser");
			mav.setViewName("login");
			return mav;
		}

		mav.addObject("loginUser", accountData);
		mav.setViewName("BullitinBoard");
		session.setAttribute("loginUser", accountData);
		session.removeAttribute("errorMessages");
		return mav;

	}


	// logout
	@GetMapping("/Logout")
	public ModelAndView logout(HttpServletRequest request, HttpServletResponse response){
		ModelAndView mav = new ModelAndView();
		// Session invalidation
		session.invalidate();
		mav.setViewName("login");
		return mav;
	}


}
