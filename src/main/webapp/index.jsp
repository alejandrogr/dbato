<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" buffer="500kb"%>
<%@ page import="com.dbato.user.UserDto" %>
<%
UserDto user = (UserDto) request.getAttribute("user");
String logout = (String) request.getAttribute("logout");

%>
<!DOCTYPE HTML>
<html lang="es">
<head>

	<title>DBATO</title>
	
	<meta http-equiv='X-UA-Compatible' content='IE=8'/>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	
	<link type="text/css" rel="stylesheet" href="./css/bootstrap.css">
	<link type="text/css" rel="stylesheet" href="./css/bootstrap-responsive.css">
	<link type="text/css" rel="stylesheet" href="./css/bootstrap-wysihtml5.css">
	
	<link type="text/css" rel="stylesheet" href="./dbato/css/dbato.css">
	
	<script>
		var USER = {
			 EMAIL : '<%=(user!=null)?user.getEmail():null%>'
			,NICK : '<%=(user!=null)?user.getNick():null%>'
			,SHOW_HIDDEN_REPLIES : <%=(user!=null)?user.getShowHiddenReplies():null%>
			,USE_NICK : <%=(user!=null)?user.getUseNick():null%>
			,LOGOUT : '<%=logout%>'
		}
	</script>
	
	<script type='text/javascript' src='./js/jquery-1.7.1.min.js'></script>
	<script type='text/javascript' src='./js/wysihtml5-0.3.0_rc2.js'></script>
	<script type='text/javascript' src='./js/iris-0.4.2.js'></script>
	<script type='text/javascript' src='./js/bootstrap.js'></script>
	<script type='text/javascript' src='./js/bootstrap-wysihtml5.js'></script>
	<script type='text/javascript' src='./dbato/dbato.js'></script>
	
	
</head>
<body>
</body>
</html>