package com.dbato.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class IndexFilter implements Filter {

	private FilterConfig filterConfig;

	public void doFilter(ServletRequest p_request, ServletResponse p_response, FilterChain filterChain) throws IOException, ServletException {
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		p_request.setAttribute("user", user);
		p_request.setAttribute("logout", userService.createLogoutURL("/index.jsp"));
        filterChain.doFilter(p_request, p_response);
	}

	public FilterConfig getFilterConfig() {
		return filterConfig;
	}

	public void init(FilterConfig filterConfig) {
		this.filterConfig = filterConfig;
	}

	public void destroy() {
	}

}