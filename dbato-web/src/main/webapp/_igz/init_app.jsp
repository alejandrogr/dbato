<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="true"
%><%@page import="com.igzcode.java.gae.configuration.ConfigurationManager"
%><%@page import="com.igzcode.java.gae.util.ConfigUtil"
%><%
ConfigurationManager configurationManager = new ConfigurationManager();

configurationManager.SetPublicValues( new String[][]{
{"PUBLIC.EXAMPLE","This var is public"}
});

configurationManager.SetPrivateValues( new String[][]{
{"PRIVATE.EXAMPLE","This var is private"}
});

ConfigUtil.SetCachedValues();
%>
Creating Configuration Values ... [<font color='green'>OK</font>]
