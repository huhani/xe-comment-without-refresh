<?php
if(!defined('__XE__')){
	exit();
}
/**
 * @file board_extender.addon.php
 * @author JAE HYEON JOE (mmia268@gmail.com)
 * @brief board module extender
 **/
require_once(_XE_PATH_ . 'addons/board_extender/board_extender.func.php');

if($called_position == 'before_module_init'){
	$act = $this->act;
	switch($act){
		case "getCommentGrant":
			return getCommentGrant();
		break;
	}
} else if($called_position == 'before_module_proc'){
	$act = $this->act;
	switch($act){
		case "dispBoardContent":
			$use_cpage_detecter = Context::get('cpage_detect') ? TRUE : FALSE;
			if($use_cpage_detecter){
				$output = setCommentPage();
				if($output === false){
					return new Object(-1, "msg_invalid_request");
				}
			}
		break;
	}
}


?>
