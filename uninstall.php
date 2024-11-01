<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

delete_option('TellAFriend_Title');
delete_option('TellAFriend_Fromemail');
delete_option('TellAFriend_On_MyEmail');
delete_option('TellAFriend_On_Subject');
delete_option('TellAFriend_Caption');
delete_option('TellAFriend_Adminmail_Content');
delete_option('TellAFriend_Usermail_Content');
delete_option('TellAFriend_homeurl');
 
// for site options in Multisite
delete_site_option('TellAFriend_Title');
delete_site_option('TellAFriend_Fromemail');
delete_site_option('TellAFriend_On_MyEmail');
delete_site_option('TellAFriend_On_Subject');
delete_site_option('TellAFriend_Caption');
delete_site_option('TellAFriend_Adminmail_Content');
delete_site_option('TellAFriend_Usermail_Content');
delete_site_option('TellAFriend_homeurl');