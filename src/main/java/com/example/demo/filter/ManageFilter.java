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

public class ManageFilter implements Filter {

	private static final Logger logger = LoggerFactory.getLogger(ManageFilter.class);

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		logger.info("ManageFilter init");

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpSession session = ((HttpServletRequest) request).getSession();

		@SuppressWarnings("unchecked")
		List<User> user = (List<User>) session.getAttribute("loginUser");

		String errorMessages = null;

		String errorMessagesLogin = null;

		if (user == null) {
			errorMessagesLogin = "Please login";
			session.setAttribute("errorMessagesLogin", errorMessagesLogin);
			((HttpServletResponse) response).sendRedirect("login");

			return;

		} else if (user.get(0).getAdmin_user() != 1) {
			errorMessages = "Not authorized";
			session.setAttribute("errorMessages", errorMessages);
			((HttpServletResponse) response).sendRedirect("BullitinBoard");

			return;
		}

		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {

	}

}
