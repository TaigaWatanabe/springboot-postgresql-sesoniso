package com.example.demo.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfig  extends WebMvcConfigurerAdapter{

//	relating to login
	@Bean
	public FilterRegistrationBean<LoginFilter> loggingFilter2() {
		FilterRegistrationBean<LoginFilter> registrationBean = new FilterRegistrationBean<>();

		registrationBean.setFilter(new LoginFilter());
		registrationBean.addUrlPatterns("/UserList");
		registrationBean.addUrlPatterns("/BullitinBoard");
		registrationBean.addUrlPatterns("");

		return registrationBean;
	}

//	relating to authority
	@Bean
	public FilterRegistrationBean<ManageFilter> loggingFilter1() {
		FilterRegistrationBean<ManageFilter> registrationBean = new FilterRegistrationBean<>();

		registrationBean.setFilter(new ManageFilter());
		registrationBean.addUrlPatterns("/UserList");
		registrationBean.addUrlPatterns("/PostList");

		return registrationBean;
	}

}
