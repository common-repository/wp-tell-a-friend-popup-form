/**
 *     wp tell a friend popup form
 *     Copyright (C) 2010 - 2022 www.gopiplus.com
 *     http://www.gopiplus.com/work/2012/05/21/wordpress-plugin-wp-tell-a-friend-popup-form/
 * 
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * 
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var http_req = false;
function PopupContactPOSTRequest(url, parameters) 
{
  http_req = false;
  if (window.XMLHttpRequest) 
  {
	 http_req = new XMLHttpRequest();
	 if (http_req.overrideMimeType) 
	 {
		http_req.overrideMimeType('text/html');
	 }
  } 
  else if (window.ActiveXObject) 
  {
	 try 
	 {
		http_req = new ActiveXObject("Msxml2.XMLHTTP");
	 } 
	 catch (e) 
	 {
		try 
		{
		   http_req = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (e) {}
	 }
  }
  if (!http_req) 
  {
	 alert('Cannot create XMLHTTP instance');
	 return false;
  }
  http_req.onreadystatechange = PopupContactContents;
  http_req.open('POST', url, true);
  http_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http_req.setRequestHeader("Content-length", parameters.length);
  http_req.setRequestHeader("Connection", "close");
  http_req.send(parameters);
}

function PopupContactContents() 
{
  //alert(http_req.readyState);
  //alert(http_req.responseText);
  if (http_req.readyState == 4) 
  {
	 if (http_req.status == 200) 
	 {
		result = http_req.responseText;
		result = result.trim();
		if(result == "invalid-email")
		{
			alert("Invalid email address.");
			document.getElementById('TellAFriend_alertmessage').innerHTML = "Invalid email address.";   
		}
		else if(result == "empty-email")
		{
			alert("Please enter email address.");
			document.getElementById('TellAFriend_alertmessage').innerHTML = "Please enter email address.";   
		}
		else if(result == "there-was-problem")
		{
			alert("There was a problem with the request.");
			document.getElementById('TellAFriend_alertmessage').innerHTML = "There was a problem with the request.";   
		}
		else if(result == "mail-sent-successfully")
		{
			alert("Mail sent successfully");
			document.getElementById('TellAFriend_alertmessage').innerHTML = "Mail sent successfully";   
			document.getElementById("TellAFriend_email").value = "";
			document.getElementById("TellAFriend_name").value = "";
			document.getElementById("TellAFriend_message").value = "";
			TellAFriend_AutoClose();
		}
		else
		{
			alert("There was a problem with the request.");
			document.getElementById('TellAFriend_alertmessage').innerHTML = "There was a problem with the request.";   
		}
	 } 
	 else 
	 {
		alert('There was a problem with the request.');
	 }
  }
}

function TellAFriend_AutoClose() 
{
	setTimeout(function(){ TellAFriend_HideForm('TellAFriend_BoxContainer','TellAFriend_BoxContainerFooter'); },2000); 
}

function TellAFriend_Submit(obj, url) 
{
	_e=document.getElementById("TellAFriend_email");
	_n=document.getElementById("TellAFriend_name");
	_m=document.getElementById("TellAFriend_message");
	_a=document.getElementById("TellAFriend_alertmessage");
	
	if(_n.value=="")
	{
		alert("Please enter your name.");
		_a.innerHTML = "";
		_n.focus();
		return false;    
	}
	else if(_e.value=="")
	{
		alert("Please enter friend email.");
		_a.innerHTML = "";
		_e.focus();
		return false;    
	}
	else if(_e.value!="" && (_e.value.indexOf("@",0)==-1 || _e.value.indexOf(".",0)==-1))
	{
		alert("Please enter valid email.");
		_a.innerHTML = "";
		_e.focus();
		_e.select();
		return false;
	} 
	else if(_m.value=="")
	{
		alert("Please enter your message.");
		_a.innerHTML = "";
		_m.focus();
		return false;    
	}
	document.getElementById('TellAFriend_alertmessage').innerHTML = "Sending..."; 
	var str = "TellAFriend_name=" + encodeURI( document.getElementById("TellAFriend_name").value ) + 
				"&TellAFriend_email=" + encodeURI( document.getElementById("TellAFriend_email").value ) + 
					"&TellAFriend_message=" + encodeURI( document.getElementById("TellAFriend_message").value ) + 
						"&TellAFriend_Link=" + encodeURI( document.getElementById("TellAFriend_Link").value ) +
							"&TellAFriend_captcha=nocaptcha";
							
	PopupContactPOSTRequest(url+'/?tellafriend=send-mail', str);
}
