package com.dbato.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.dbato.exception.ParamsException;
import com.dbato.user.UserDto;
import com.dbato.user.UserManager;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class IndexFilter implements Filter {

	private FilterConfig filterConfig;

	public void doFilter(ServletRequest p_request, ServletResponse p_response, FilterChain filterChain) throws IOException, ServletException {
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		UserDto userDto = null;
		
		if( user != null ){
			UserManager userM = new UserManager();
			userDto = userM.GetByEmail( user.getEmail() );
			if( userDto == null ){
				userDto = new UserDto();
				userDto.SetEmail( user.getEmail() );
				userDto.SetNick( user.getNickname() );
				try {
					userM.Save( userDto );
				} catch (ParamsException e) {
					e.printStackTrace();
				}
			}
		}
		
		p_request.setAttribute("user", userDto);
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