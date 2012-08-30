package com.dbato.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.dbato.user.UserDto;
import com.dbato.user.UserManager;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class LoginFilter implements Filter {

	private FilterConfig filterConfig;

	public void doFilter(ServletRequest p_request, ServletResponse p_response, FilterChain filterChain) throws IOException, ServletException {

		UserService userService = UserServiceFactory.getUserService();
		
		User user = userService.getCurrentUser();
		HttpServletRequest request = (HttpServletRequest) p_request;
		
        p_response.setContentType("application/json");
        if (user != null || request.getMethod() == "GET" ) {
        	if( user != null ){
        		
        		UserManager userM = new UserManager();
        		UserDto userDto = userM.GetByEmail( user.getEmail() );
        		if( userDto != null ){
        			p_request.setAttribute("userId", userDto.GetId());
        			String userDesc = userDto.GetEmail();
        			if ( userDto.GetUseNick().equals( true )){
        				userDesc = userDto.GetNick();
        			} 
            		p_request.setAttribute("userDesc", userDesc);
        			
        		} else {
            		p_request.setAttribute("userDesc", user.getEmail());
        		}
        	}
        	
        	filterChain.doFilter(p_request, p_response);
        } else {
            p_response.getWriter().println("{\"KO\":\"NEED LOGIN\"}");
        }
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