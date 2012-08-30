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
	
	<link type="text/css" rel="stylesheet" href="./dbato/css/dbato.css">
	<link type="text/css" rel="stylesheet" href="./css/bootstrap.css">
	<link type="text/css" rel="stylesheet" href="./css/bootstrap-responsive.css">
	<link type="text/css" rel="stylesheet" href="./css/bootstrap-wysihtml5.css">
	
	
	<script>
		var USER = {
			 EMAIL : '<%=(user!=null)?user.GetEmail():null%>'
			,NICK : '<%=(user!=null)?user.GetNick():null%>'
			,SHOW_HIDDEN_REPLIES : <%=(user!=null)?user.GetShowHiddenReplies():null%>
			,USE_NICK : <%=(user!=null)?user.GetUseNick():null%>
			,LOGOUT : '<%=logout%>'
		}
	</script>
	
	<script type='text/javascript' src='./js/jquery-1.7.1.min.js'></script>
	<script type='text/javascript' src='./js/wysihtml5-0.3.0_rc2.js'></script>
	<script type='text/javascript' src='./js/iris-0.4.1.js'></script>
	<script type='text/javascript' src='./js/bootstrap.js'></script>
	<script type='text/javascript' src='./js/bootstrap-wysihtml5.js'></script>
	<script type='text/javascript' src='./dbato/dbato.js'></script>
	
</head>
<body>
	<div data-id="header"></div>
	<div class="container">
		<div class="row">
			<div class="span2" data-id="sidebar">
				<!--Sidebar content-->
			</div>
			<div class="span10" data-id="main">
				<!--Body content-->
			</div>
		</div>
	</div>
	<div data-id="footer"></div>
</body>
</html>