package com.dbato.channels;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;

public class ChannelManager {

	protected static final Logger logger = Logger.getLogger(ChannelManager.class.getName());

	private static List<String> clients = new ArrayList<String>();

	public ChannelManager() {
	}

	public static String getChannelKey(){
		return UUID.randomUUID().toString();
	}

	public static void registerClient( String p_clientKey ){
		clients.add(p_clientKey);
	}

	public static void unregisterClient( String p_clientKey ){
		clients.remove(p_clientKey);
	}

	public static void sendMessageToAllClients( String p_message ){
		for( String client : clients){
			logger.info("Send update to: " + client);
			sendMessage(client, p_message);
		}
	}

	public static void sendMessage(String p_channelKey, String p_message) {
		ChannelService channelService = ChannelServiceFactory.getChannelService();
		channelService.sendMessage(new ChannelMessage(p_channelKey, p_message));
	}

}
