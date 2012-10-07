<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.dbato.commons.Constant.ReplyType"%>
<%@page import="com.dbato.comments.CommentDto"%>
<%@page import="com.dbato.reply.ReplyDto"%>
<%@page import="com.dbato.discussion.DiscussionDto"%>
<%@page import="com.dbato.user.UserDto"%>
<%@page import="com.dbato.comments.CommentManager"%>
<%@page import="com.dbato.reply.ReplyManager"%>
<%@page import="com.dbato.tag.TagManager"%>
<%@page import="com.dbato.user.UserManager"%>
<%@page import="com.dbato.discussion.DiscussionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="true"%><%@page
	import="com.igzcode.java.gae.configuration.ConfigurationManager"%><%@page
	import="com.igzcode.java.gae.util.ConfigUtil"%>
<%
	DiscussionManager discussionM = new DiscussionManager();
	TagManager tagM = new TagManager();
	ReplyManager replyM = new ReplyManager();
	CommentManager commentM = new CommentManager();
	UserManager userM = new UserManager();

	discussionM.DeleteAll();
	tagM.DeleteAll();
	replyM.DeleteAll();
	commentM.DeleteAll();
	userM.DeleteAll();
	
	
	UserDto user = new UserDto();

	user.setEmail("alejandrogr@gmail.com");
	user.setNick("Ale");
	userM.Save(user);
	
	user = new UserDto();
	user.setEmail("lee.adama@dbato.com");
	user.setNick("Lee Adama");
	userM.Save(user);
	
	user = new UserDto();
	user.setEmail("kara.thrace@dbato.com");
	user.setNick("Starbuck");
	userM.Save(user);
	
	user = new UserDto();
	user.setEmail("boomer@dbato.com");
	user.setNick("Boomer");
	userM.Save(user);
	
	user = new UserDto();
	user.setEmail("saul.tigh@dbato.com");
	user.setNick("Colonel Tigh");
	userM.Save(user);
	
	user = new UserDto();
	user.setEmail("gaius.baltar@dbato.com");
	user.setNick("Gaius Baltar");
	userM.Save(user);
	
	user = new UserDto();
	user.setEmail("number.six@dbato.com");
	user.setNick("Six");
	userM.Save(user);
	
	user = new UserDto();
	user.setEmail("laura.roslin@dbato.com");
	user.setNick("Laura Roslin");
	userM.Save(user);
	
	DiscussionDto discussionDto;
	ReplyDto replyDto;
	CommentDto commentDto;
	
	int numDiscussions = 30;
	int numReplies, votes, numComments;
	ReplyType replyType = ReplyType.AGAINST;
	List<String> tagL = new ArrayList<String>();
	List<String> tagL2 = new ArrayList<String>();
	List<String> tags;

	tagL.add("politics");
	tagL.add("tech");
	tagL.add("sport");

	tagL2.add("politics");
	tagL2.add("religion");

	double tagList, re;
	int changeDate;
	Date replyDate;

	for (int i = 0; i < numDiscussions; i++) {
		tagList = Math.random();

		if (tagList > 0.5) {
			tags = tagL;
		} else {
			tags = tagL2;
		}

		for (int t = 0; t < tags.size(); t++) {
			tagM.AddUpdateTag(tags.get(t));
		}

		discussionDto = new DiscussionDto();

		discussionDto.setTitle("Tittle " + i);
		discussionDto.setText("Discussion " + i + " text.");
		discussionDto.setTags(tags);
		discussionDto.setOwner(user.getEmail());
		discussionDto.setOwnerId(user.getUserId());
		discussionM.Save(discussionDto);

		numReplies = (int) (Math.random() * 30);
		for (int r = 0; r < numReplies; r++) {

			votes = 0; //(int) ( Math.random() * 3 );

			re = Math.random();
			if (re < 0.5) {
				replyType = ReplyType.PRO;
			} else if (re >= 0.5) {
				replyType = ReplyType.AGAINST;
			}

			changeDate = (int) (Math.random() * 3);

			replyDto = new ReplyDto();
			replyDto.setDiscussionKey(discussionDto.getDiscussionId());
			replyDto.setReplyType(replyType);
			replyDto.setText("Reply text " + r);
			replyDto.setVotes(votes);
			replyDto.setOwner(user.getEmail());
			replyDto.setOwnerId(user.getUserId());

			replyDate = new Date();
			Calendar cal = Calendar.getInstance();
			cal.setTime(replyDate);
			cal.add(Calendar.DATE, -changeDate);
			replyDate.setTime(cal.getTimeInMillis());
			replyDto.setCreationDate(replyDate);

			replyM.Save(replyDto);

			double hasComments = Math.random();

			if (hasComments > 0.4) {
				numComments = (int) (Math.random() * 10);

				Long replyKey = replyDto.getReplyId();

				for (int c = 0; c < numComments; c++) {
					commentDto = new CommentDto();
					commentDto.setText("Comment" + c + " text");
					commentDto.setReplyKey(replyKey);
					commentM.Save(commentDto);
				} 
				replyDto = replyM.Get(replyKey);
				replyDto.setNumComments(numComments);
				replyM.Save(replyDto);
			}
		}

		discussionDto.setNumReplies(numReplies);
		discussionM.Save(discussionDto);
	}
	
%><!DOCTYPE HTML>
<html>
<head>
	<title>Dbato - init app</title>

	<meta http-equiv='X-UA-Compatible' content='IE=8'/>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="robots" content="noindex, nofollow">

	<style type="text/css">
		* { font-family: arial; }
	</style>
</head>
<body>
<h1>DBATO correctly initialized</h1>
<a href='/'>Goto DBATO</a>
</body>
</html>