package com.example.demo.filter;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.demo.entity.User;

public class LoginFilter implements Filter{
	private static final Logger logger = LoggerFactory.getLogger(LoginFilter.class);
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		logger.info("LoginFilter init");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpSession session = ((HttpServletRequest) request).getSession();
		Object user = session.getAttribute("loginUser");

		@SuppressWarnings("unchecked")
		List<User> user_status = (List<User>) session.getAttribute("loginUser");

		String errorMessagesLogin = null;

		if (user == null) {
			errorMessagesLogin = "Please login";
			session.setAttribute("errorMessagesLogin", errorMessagesLogin);
			((HttpServletResponse) response).sendRedirect("login");
			return;
		}

		if (user_status.get(0).getAccount_status() != 0) {
			errorMessagesLogin = "This account is suspended!";
			session.setAttribute("errorMessagesLogin", errorMessagesLogin);
			session.removeAttribute("loginUser");
			((HttpServletResponse) response).sendRedirect("login");
			return;
		}

		session.removeAttribute(errorMessagesLogin);
		chain.doFilter(request, response);
	}
}
