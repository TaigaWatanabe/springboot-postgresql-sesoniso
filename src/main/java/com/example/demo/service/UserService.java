package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Logic.CipherUtil;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

//	@Autowired
//	UserReportRepository userReportRepository;

	// Getting user all information
	public List<User> findAllUser() {
		return userRepository.findAll();
	}

	// Getting user info
	public List<User> selectName(String user_name) {
		return userRepository.findByUserName(user_name);
	}

	// Registor user
	public void registUser(User user) {
//		Password encryption
		String encyptPassword = CipherUtil.encrypt(user.getPassword());
		user.setPassword(encyptPassword);
//		Password encryption
		userRepository.save(user);
	}

	// Registor user Not encypt Password
	public void registUserNotencyptPassword(User user) {
		userRepository.save(user);
	}

	// Getting acount infomation
	public List<User> selectAccount(String account, String password) {
//		Password encryption
		String encyptPassword = CipherUtil.encrypt(password);
//		Password encryption
		return userRepository. findByAccount(account, encyptPassword);
	}

	// get the user info
	public User getUserInfo(Integer id) {
		User user = (User) userRepository.findById(id).orElse(null);
		return user;
	}

	// Get user after narrow down by user_name
	public List<User> findUserByUserName(String name) {
		return userRepository. findUserByUserName(name);
	}

}
