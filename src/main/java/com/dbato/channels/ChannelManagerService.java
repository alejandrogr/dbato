package com.dbato.channels;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.dbato.service.DiscussionService;
import com.google.appengine.api.channel.ChannelPresence;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;

@Path("/channel")
public class ChannelManagerService {

	protected static final Logger logger = Logger.getLogger(DiscussionService.class.getName());

	@GET
	@Path("/token")
	@Produces("application/json;charset=UTF-8")
	public Response GetChannelToken(@Context HttpServletRequest p_request, @Context HttpServletResponse p_response) throws Exception {
		String channelKey = ChannelManager.getChannelKey();

		ChannelService channelService = ChannelServiceFactory.getChannelService();

		String token = channelService.createChannel( channelKey );

		return Response.ok().entity("{\"token\":\""+token+"\"}").build();
	}

	@POST
	@Path("/connected")
	@Produces("application/json;charset=UTF-8")
	public void ClientConnected(@Context HttpServletRequest p_request, @Context HttpServletResponse p_response) throws Exception {
		ChannelService channelService = ChannelServiceFactory.getChannelService();
		ChannelPresence presence = channelService.parsePresence(p_request);
		ChannelManager.registerClient( presence.clientId() );
	}

	@POST
	@Path("/disconnected")
	@Produces("application/json;charset=UTF-8")
	public void ClientDisconnected(@Context HttpServletRequest p_request, @Context HttpServletResponse p_response) throws Exception {
		ChannelService channelService = ChannelServiceFactory.getChannelService();
		ChannelPresence presence = channelService.parsePresence(p_request);
		ChannelManager.unregisterClient( presence.clientId() );
	}

}

