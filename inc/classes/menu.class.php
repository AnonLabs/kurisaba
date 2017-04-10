<?php
/*
 * This file is part of kusaba.
 *
 * kusaba is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * kusaba is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * kusaba; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 */
/**
 * Menu class
 *
 * @package kusaba
 */
class Menu {

	function GetMenu($savetofile = false, $option = false) {
		global $tc_db, $dwoo, $dwoo_data, $kusabaxorg;

		require_once KU_ROOTDIR.'lib/dwoo.php';

		/*$thread_random = $tc_db->GetOne("SELECT `value` FROM `" . KU_DBPREFIX . "kurisaba_ext_data` WHERE `name` = 'thread_random'");
		$thread_cirno  = $tc_db->GetOne("SELECT `value` FROM `" . KU_DBPREFIX . "kurisaba_ext_data` WHERE `name` = 'thread_cirno'");
		$thread_faq    = $tc_db->GetOne("SELECT `value` FROM `" . KU_DBPREFIX . "kurisaba_ext_data` WHERE `name` = 'thread_faq'");
		$thread_dev    = $tc_db->GetOne("SELECT `value` FROM `" . KU_DBPREFIX . "kurisaba_ext_data` WHERE `name` = 'thread_dev'");

		$thread_random_link = preg_replace('/^\/([^\/]+?)\/(.+?)$/','/$1/res/$2.html',$thread_random);
		$thread_cirno_link =  preg_replace('/^\/([^\/]+?)\/(.+?)$/','/$1/res/$2.html',$thread_cirno);
		$thread_faq_link =    preg_replace('/^\/([^\/]+?)\/(.+?)$/','/$1/res/$2.html',$thread_faq);
		$thread_dev_link =    preg_replace('/^\/([^\/]+?)\/(.+?)$/','/$1/res/$2.html',$thread_dev);

		$dwoo_data->assign('thread_random_link', $thread_random_link);
		$dwoo_data->assign('thread_cirno_link',  $thread_cirno_link);
		$dwoo_data->assign('thread_faq_link',    $thread_faq_link);
		$dwoo_data->assign('thread_dev_link',    $thread_dev_link);*/
		
		$dwoo_data->assign('boardpath', getCLBoardPath());

		$special_threads = $tc_db->GetOne("SELECT `value` FROM `" . KU_DBPREFIX . "kurisaba_ext_data` WHERE `name` = 'special_threads'");
		$special_threads = preg_replace('/ +/', ' ', $special_threads);
		$special_threads = explode("\n", $special_threads);
		$special_threads_html='';
		$current_board='';
		foreach ($special_threads as $special_thread)
		{
			$special_thread = explode(' ', trim($special_thread), 4);
			if($special_thread[0] == 'BOARD')
			{
				$special_threads_html .= '<li><strong>/'.$special_thread[1].'/:</strong></li>';
				$current_board=$special_thread[1];
			}
			else if($special_thread[0] == 'THREAD')
			{
				$special_threads_html .= '<li><a href="/'.$current_board.'/res/'.$special_thread[1].'.html" class="boardlink">&nbsp;&nbsp;'.$special_thread[2].' - '.$special_thread[3].'</a></li>';
			}
			else if($special_thread[0] == 'SPECIALTHREAD')
			{
				$special_threads_html .= '<li><a href="'.$special_thread[1].'" class="boardlink">&nbsp;&nbsp;'.$special_thread[2].' - '.$special_thread[3].'</a></li>';
			}
		}

		/*$special_threads_html = str_replace('{$thread_random_link}', $thread_random_link, $special_threads_html);
		$special_threads_html = str_replace('{$thread_cirno_link}',  $thread_cirno_link , $special_threads_html);
		$special_threads_html = str_replace('{$thread_faq_link}',    $thread_faq_link   , $special_threads_html);
		$special_threads_html = str_replace('{$thread_dev_link}',    $thread_dev_link   , $special_threads_html);*/
		
		$dwoo_data->assign('special_threads', $special_threads_html);
		
		
		if (KU_MENUTYPE == 'normal') {
			$dwoo_data->assign('styles', explode(':', KU_MENUSTYLES));
		}

		if ($savetofile) {
			$files = array('menu.html', 'menu_dirs.html');
		} else {
			$files = array('menu.php', 'menu.php');
		}

		$dwoo_data->assign('files', $files);

		$sections = Array();

		$results_boardsexist = $tc_db->GetAll("SELECT `id` FROM `".KU_DBPREFIX."boards` LIMIT 1");
		if (count($results_boardsexist) > 0) {
			$sections = $tc_db->GetAll("SELECT * FROM `" . KU_DBPREFIX . "sections` ORDER BY `order` ASC");
			foreach($sections AS $key=>$section) {
				$results = $tc_db->GetAll("SELECT * FROM `" . KU_DBPREFIX . "boards` WHERE `section` = '" . $section['id'] . "' ORDER BY `order` ASC, `name` ASC /* MENU.CLASS.PHP */");
				foreach($results AS $line) {
						$sections[$key]['boards'][] = $line;
				}
			}
		}
		$dwoo_data->assign('boards', $sections);

		for ($i = 0; $i < 2; $i++) {
			if ($i == 0) $dwoo_data->assign('showdirs', 0);
			else $dwoo_data->assign('showdirs', 1);

			$phrases=explode('#', KU_SEARCH_PHRASES);
			$dwoo_data->assign('search_phrases',implode("','",$phrases));
			$dwoo_data->assign('search_phrase',$phrases[array_rand($phrases)]);

			if ($savetofile) {
				if ($i == 0) {
					file_put_contents(KU_ROOTDIR . $files[0], $dwoo->get(KU_TEMPLATEDIR . '/menu.tpl', $dwoo_data));
				} else {
					file_put_contents(KU_ROOTDIR . $files[1], $dwoo->get(KU_TEMPLATEDIR . '/menu.tpl', $dwoo_data));
				}
			} else {
				if ($i == 0) {
					$menu_nodirs = $dwoo->get(KU_TEMPLATEDIR . '/menu.tpl', $dwoo_data);
					if ($option == 'nodirs') {
						return $menu_nodirs;
					}
				} else {
					if ($option == 'dirs') {
						$menu_dirs = $dwoo->get(KU_TEMPLATEDIR . '/menu.tpl', $dwoo_data);
						return $menu_dirs;
					}
				}
			}
		}

		if (isset($menu_nodirs) && isset($menu_dirs)) {
			return array($menu_nodirs, $menu_dirs);
		}
	}

	function Generate() {
		return $this->GetMenu(true);
	}

	function PrintMenu($option = false) {
		if ($option != false) {
			return $this->GetMenu(false, $option);
		} else {
			return $this->GetMenu(false);
		}
	}
}
?>