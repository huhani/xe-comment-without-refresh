<?php
if(!defined('__XE__')){
	exit();
}

/**
 * @file board_extender.func.php
 * @author JAE HYEON JOE (mmia268@gmail.com)
 * @brief Function collections for the implementation of board_extender
 **/


function getCommentGrant(){
	$mid = Context::get('mid');
	$comment_srl = Context::get('comment_srl');
	$logged_info = Context::get('logged_info');

	if(!$comment_srl){
		return new Object(-1, "msg_invalid_request");
	}
		
	$is_manager = $logged_info ? checkIsBoardAdmin($mid) : false;
	if($comment_srl){
		$oCommentModel = getModel('comment');
		$oComment = $oCommentModel->getComment($comment_srl, $is_manager);
	}

	if(!$oComment->isExists())	{
		return new Object(-1, "msg_invalid_request");
	}

	$output = new Object();
	$output->add("grant", !$oComment->isGranted() ? 0 : 1);
	$output->setMessage('success');

	$oDisplayHandler = new DisplayHandler();
	$oDisplayHandler->printContent($output);

	exit();
}


function setCommentPage(){
	$document_srl = Context::get('document_srl');
	$cpage = Context::get('cpage');
	$comment_srl = Context::get('comment_srl');
	if(!($document_srl && !$cpage && $comment_srl)){
		return false;
	}

	$oDocumentModel = getModel('document');
	$oDocument = $oDocumentModel->getDocument($document_srl);
	if(!$oDocument->isExists()){
		return false;
	}

	$comment_list = $oDocument->getComments();
	$cpage = $oDocument->comment_page_navigation->cur_page;
	$comment_page = 1;
	if($comment_list){
		if(array_key_exists($comment_srl, $comment_list)){
			$comment_page = Context::get('cpage');
		} else {
			if($cpage > 1)	{
				$count = 0;
				while(++$count <= $cpage){
					Context::set($document_srl.'_cpage', $count);
					if(array_key_exists($comment_srl, $oDocument->getComments())) {
						$comment_page = $count;
						break;
					}
				}
			}

		}
	}

	Context::set('comment_srl', '');
	Context::set('cpage_detect', '');
	Context::set('cpage', $comment_page);

	return true;
}

function checkIsBoardAdmin($mid = false){
	$mid = $mid ? $mid : Context::get('mid');
	if(!$mid){
		return false;
	}

	$logged_info = Context::get('logged_info');
	if(!$logged_info){
		return false;
	}

	$oModuleModel = getModel('module');
	$module_info = $oModuleModel->getModuleInfoByMid($mid);
	$admin_member = $oModuleModel->getAdminId($module_info->module_srl);
	$is_module_admin = false;

	if($logged_info->is_admin == 'Y'){
		$is_module_admin = true;
	} else {

		if(!empty($admin_member)){
			foreach($admin_member as $value){
				if($value->member_srl === $logged_info->member_srl){
					$is_module_admin = true;
					break;
				}
			}
		}
		if(!$is_module_admin) {
			$getGrant = _getBoardAdminGroup($module_info);
			$member_group_list = $logged_info->group_list;
			foreach($getGrant as $value){
				if(isset($member_group_list[$value])){
					$is_module_admin = true;
				}
			}
		}

	}

	return $is_module_admin;
}

function _getBoardAdminGroup($module_info){
	if(!$module_info){
		$mid = Context::get('mid');
		$oModuleModel = getModel('module');
		$module_info = $oModuleModel->getModuleInfoByMid($mid);
	}

	$args = new stdClass();
	$args->module_srl = $module_info->module_srl;
	$output = executeQueryArray('module.getModuleGrants', $args);

	$oMemberModel = getModel('member');
	$group_list = $oMemberModel->getGroups($module_info->site_srl);
	$adminGroup_array = array();

	foreach($output->data as $manager_group){
		if($manager_group->name === "manager"){
			foreach($group_list as $val){
				if($val->group_srl === $manager_group->group_srl){
					array_push($adminGroup_array, $manager_group->group_srl);
				}
			}
		}
	}

	return $adminGroup_array;
}


/* End of file board_extender.func.php */
/* Location: ./addons/board_extender/board_extender.func.php */
