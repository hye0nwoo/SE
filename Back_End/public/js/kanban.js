/* ***
*
*

Copyright (C) 2010  Leandro Vázquez Cervantes (leandro[-at-]leandro[-dot-]org)
Copyright (C) 2010  Octavio Benedí Sánchez (octaviobenedi[-at-]gmail[-dot-]com)
Copyright (C) 2010  Verónica Pazos (verocorella[-at-]gmail-dot-]com)

GNU LESSER GENERAL PUBLIC LICENSE

Version 3, 29 June 2007

Copyright © 2007 Free Software Foundation, Inc. <http://fs.org/>

Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

This version of the GNU Lesser General Public License incorporates the terms and conditions of version 3 of the GNU General Public License, supplemented by the additional permissions listed below.

version 0.3g Leandro  18 NOV 2012
AGPL to LGPL v3 change
*
*
*** */
var newJquery = newJquery.noConflict(true);
newJquery(document).ready(function() {


	// 칼럼 추가하는 함수
	newJquery('#add_col').click(function(){
		var id=newJquery(".task_pool").size();
		var current_col = newJquery(".task_pool_header:last").css('background');
		newJquery(".task_pool_header:last").addClass("dotted_separator");
		newJquery(".task_pool:last").addClass("dotted_separator");

		newJquery("#task_pool_header_container").append('<th class="task_pool_header"><div class="header_name click"><span class="title_text">'+id+'</span></div></th>');
		newJquery(".task_pool_header:last").css('background', current_col);
		newJquery("#task_pool_container").append('<td class="task_pool"><div /></td>');
		intialize_sortables();
		// 칼럼 추가 후 정보 정송
	});
	// 칼럼 삭제하는 함수
	newJquery('#remove_col').click(function(){
	   if(newJquery(".task_pool_header").size()>1){
	    	newJquery(".task_pool_header").last().remove();
    		newJquery(".task_pool").last().remove();

    		newJquery(".task_pool_header:last").removeClass("dotted_separator");
			newJquery(".task_pool:last").removeClass("dotted_separator");
		    intialize_sortables();
		    // 칼럼 삭제 후 정보 정송, 칼럼은 무조건 1개는 있어야 함
		}
	});
	// 내용 입력 받는 함수(column의 header, work list의 title, content 3가지가 이것을 이용)
	newJquery('.header_name').live('click',function(){
		var cur_name=newJquery(this).children("span").html();
		var header_new_html=' \
		<div class="header_input"> \
			<input onkeypress="javascript:save_edit_h(event)" class="input header_input_name" value="'+cur_name+'" /> \
			<div class="option save_header"><button class="btn close btn-xs"><span class="glyphicon glyphicon-ok"></span></button></div> \
		</div>  \
		<div class="clear"></div> \
		';
		// 내용 input 안에 넣는 함수 html 그대로 넣음

		newJquery(this).parent().html(header_new_html);
	});
	// 내용 html에 적용하는 함수
	newJquery('.save_header').live('click',function(){
    	var index=newJquery(this).parent().parent().index();
		var new_name=newJquery(this).parent().parent().children("div:eq(0)").first().children(".input").first().val();
		if(new_name == ""){
			alert("내용을 입력하세요.");
		}
		else{
			newJquery(this).parent().parent().html('<div class="header_name click"><span class="title_text">'+new_name+'</span></div>');
		}
	});
	//checklist 함수 위에 함수랑 기능 똑같은데 차이점은 체크 버튼
	newJquery('.header_check_name').live('click',function(){
		var cur_name=newJquery(this).children("span").html();
		var header_new_html=' \
		<div class="header_input"> \
			<input onkeypress="javascript:save_edit_h(event)" class="input header_input_name" value="'+cur_name+'" /> \
			<div class="option deletecheck"><button class="btn btn-xs"><span class="glyphicon glyphicon-remove"></span></button></div> \
			<div class="option save_header_check"><button class="btn btn-xs"><span class="glyphicon glyphicon-ok"></span></button></div> \
		</div>  \
		<div class="clear"></div> \
		';
		newJquery(this).parent().html(header_new_html);
	});
	//checklist 함수 위에 함수랑 기능 똑같은데 차이점은 체크 버튼
	newJquery('.save_header_check').live('click',function(){
    	var index=newJquery(this).parent().parent().index();
		var new_name=newJquery(this).parent().parent().children("div:eq(0)").first().children(".input").first().val();
		if(new_name == ""){
			alert("내용을 입력하세요.");
		}
		else{
			newJquery(this).parent().parent().html('<div class="header_check_name click"><span class="title_text">'+new_name+'</span></div>');
		    var chk = newJquery(this).is(":checked");//.attr('checked');
	    	// 체크리스트 체크
	    	if(chk) newJquery(this).next().children().children().css("text-decoration","line-through");
	    	// 체크리스트 체크 해제
	    	else  newJquery(this).next().children().children().css("text-decoration","none");
		}
	});

	//work list 새롭게 생성									검색용 태그 #task list #work list #list
	newJquery('#add_task').click(function(){
		var id=find_next_box_itm_free(1);
		newJquery(".task_pool").first().append(' \
		  <div class="big_container"> \
			  <div id="box_itm'+id+'"class="box_itm rounded"> \
			  	  <div id="name'+id+'" class="name"><div class="header_name click"><span>Item '+id+'</span></div></div>\
			  	  <div class="clear"></div> \
			  	  <div id="resp'+id+'" class="name"><div class="header_name click"><span>resp '+id+'</span></div></div>\
			  	  <div class="clear"></div> \
				  <div n="0" id="checkbox'+id+'"></div> \
				  <div class="small"> \
					  <div n="'+id+'" class="itm_box_option"><input n="'+id+'"  class="color colorete" type="color" data-text="hidden" data-colorlink="box_itm'+id+'" value="rgb(180,255,200)"></div> \
					  <div n="'+id+'" class="option close_remove itm_box_option"><button class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-remove"></i></button></div> \
					  <div n="'+id+'" class="option addcheck itm_box_option"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-check"></i></button></div>\
				  </div> \
				  <div class="clear"></div> \
			  </div> \
			  <div id="box_itm'+id+'_shadow" class="shadow" /> \
			</div> \
		');
//WIP		  <div n="'+id+'" class="option edit itm_box_option"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-ok"></i></button></div> \
//WIP		  <progress max="100" id="progress_bar'+id+'" class="pbar" value="0"></progress> \
		newJquery( "#box_itm"+id+" .itm_box_option input" ).mColorPicker();
		newJquery('.itm_box_option').hide();
	});
	// 버튼 hidden에서 show로
	newJquery('.box_itm').live('mouseover',function(){
		newJquery(this).children().children('.itm_box_option').show();
	});
	// 버튼 show에서 hidden으로
	newJquery('.box_itm').live('mouseout',function(){
		newJquery('.itm_box_option').hide();
	});
	// work list background 색깔 변경
	newJquery('.colorete').live('colorpicked', function () {
    	newJquery('#box_itm'+newJquery(this).attr('n')).css('background',newJquery(this).val());
	});
	// 배경 화면 색깔 변경
	newJquery('.colorete_background').live('colorpicked', function () {
		changeBackground(newJquery(this).val());
		newJquery('.container-fluid').css('background',newJquery(this).val());
	});
	// sidebar에서 선택한 색깔로 모든 work list와 columns 헤더 색깔 변경
	newJquery('.sel-box-color').click(function (){
		var sel_color = newJquery(this).css('background');
		newJquery('.box_itm').css('background', sel_color);
		newJquery('.task_pool_header').css('background', sel_color);
	});
	// sidebar에서 선택한 색깔로 배경 색깔 변경
	newJquery('.sel-background-color').click(function (){
		var sel_color = newJquery(this).css('background');
		newJquery('.container-fluid').css('background', sel_color);
	});

// edit 없어져서 일단 안씀
/**	newJquery(".save").live('click', function(){
		var id = newJquery(this).attr("n");
		var box_itm_name=newJquery('#name_input'+id).val();
		var box_itm_resp=newJquery('#resp_input'+id).val();
		var box_itm_checklist=newJquery('#checkbox'+id).html();
		var pbar_value=parseInt(newJquery('#progress_input'+id).val());
		pbar_value = check_number(pbar_value);
		var box_itm_new_html_start=' \
		    <div class="big_container"> \
				  <div id="name'+id+'" class="name">'+box_itm_name+'</div> \
				  <div class="dotted_hr"></div> \
				  <div id="resp'+id+'" class="name">'+box_itm_resp+'</div> \
				  <progress max="100" id="progress_bar'+id+'" class="pbar" value="'+pbar_value+'"></progress> \
		';
		var checklist_html='<div n='+newJquery("#checkbox"+id).attr("n")+' id="checkbox'+id+'">'+box_itm_checklist+'</div>';
		var box_itm_new_html_last=' \
				  <div class="small"> \
				    <div n="'+id+'" class="itm_box_option"><input n="'+id+'"  class="color colorete" type="color" data-text="hidden" data-colorlink="box_itm'+id+'" value="#f7941d"></div> \
					  <div n="'+id+'" class="option close itm_box_option"><button class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-remove"></i></button></div> \
					  <div n="'+id+'" class="option edit itm_box_option"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-ok"></i></button></div> \
				  </div> \
				  <div class="clear"></div> \
				<div> \
		';
		var box_itm_new_html = box_itm_new_html_start + checklist_html + box_itm_new_html_last;
		newJquery('#box_itm'+id).html(box_itm_new_html);
		newJquery( "#box_itm"+id+" .itm_box_option input" ).mColorPicker();

		newJquery('#box_itm'+id).live('mouseover',function(){
		  newJquery(this).children().children().children('.itm_box_option').show();
	  });
	  newJquery('#box_itm'+id).live('mouseout',function(){
		  newJquery('.itm_box_option').hide();
	  });

	  newJquery('.colorete').live('colorpicked', function () {
      newJquery('#box_itm'+newJquery(this).attr('n')).css('background',newJquery(this).val());
	  });

	  var boxH = newJquery('#box_itm'+id).height();
	  newJquery('#box_itm'+id).css('height',boxH-50+"px");
	});**/
	// 체크리스트 추가 함수
	newJquery(".addcheck").live('click', function(){
		var id = newJquery(this).attr("n");
		newJquery("#checkbox"+id).attr("n",Number(newJquery("#checkbox"+id).attr("n"))+1);
		newJquery("#checkbox"+id).append(' \
			<input class="check_left checked-list" type="checkbox" aria-label="Check"><div id="checkbox'+id+'" class="checkbox-list"><div class="header_check_name click"><span>checklist</span></div></div>\
			<div class="clear"></div> \
		');
		// 체크리스트 추가 되었습니다.
	});
	// 체크리스트 체크 버튼
	newJquery(".checked-list").live('click', function(){
	    var chk = newJquery(this).is(":checked");//.attr('checked');
	    // 체크리스트 체크
	    if(chk) newJquery(this).next().children().children().css("text-decoration","line-through");
	    // 체크리스트 체크 해제
	    else  newJquery(this).next().children().children().css("text-decoration","none");
	});
	// 체크리스트 삭제
	newJquery(".deletecheck").live('click',function(){
		var id = newJquery(this).parent().parent().parent().attr("id");
		newJquery("#"+id).attr("n",Number(newJquery("#"+id).attr("n"))-1);
		newJquery(this).parent().parent().prev().remove();
		newJquery(this).parent().parent().remove();
		// 체크리스트 삭제 되었습니다.
	});

// edit 안씀
/**	newJquery('.edit').live('click', function() {
		var id = newJquery(this).attr("n");
		var box_itm_name=newJquery('#name'+id).html();
		var box_itm_resp=newJquery('#resp'+id).html();
		var box_itm_checklist=newJquery('#checkbox'+id).html();
		var pbar_value=parseInt(newJquery('#progress_bar'+id).prop('value'));
		if (isNaN(pbar_value)){ var pbar_value=0;}
		var box_itm_new_html_start=' \
				<div><span class="small_left"><input onkeypress="javascript:save_edit(event)" id="name_input'+id+'" class="input" value="'+box_itm_name+'" /></span><span class="small_right">title</span></div>  \
				<div><span class="small_left"><input onkeypress="javascript:save_edit(event)" id="resp_input'+id+'" class="input" value="'+box_itm_resp+'" /></span><span class="small_right">content</span></div>  \
				<div><span class="small_left"><input onkeypress="javascript:save_edit(event)" id="progress_input'+id+'" class="input" value="'+pbar_value+'" /></span><span class="small_right">percent</span></div>  \
		';
		var checklist_html='<div n="'+newJquery("#checkbox"+id).attr("n")+'" id="checkbox'+id+'">'+box_itm_checklist+'</div>';
		var box_itm_new_html_last=' \
				<div class="small"> \
					<div n="'+id+'" class="option save"><button class="btn btn-success btn-xs"><i class="glyphicon glyphicon-ok"></i></button></div> \
				</div> \
				<div class="clear"></div> \
		';
		var box_itm_new_html = box_itm_new_html_start + checklist_html + box_itm_new_html_last;
		newJquery('#box_itm'+id).html(box_itm_new_html);
		var boxH = newJquery('#box_itm'+id).height();
		newJquery('#box_itm'+id).css('height',boxH+50+"px");
	});**/

	// work list 삭제
	newJquery('.close_remove').live('click', function() {
		var id = newJquery(this).attr("n");
		newJquery('#box_itm'+id).remove();
		newJquery('#box_itm'+id+'_shadow').remove();
		// 삭제되었습니다.
	});


	newJquery('#txt_btn').click(function(){
			newJquery('#texto').toggle('slow');
	});

        intialize_sortables();
});
// 메뉴 작동 시키는 함수 sidebar open, close 등
(function(newJquery){
	// Menu Functions
	newJquery(document).ready(function(){
  	newJquery('#menuToggle').click(function(e){
    	var newJqueryparent = newJquery(this).parent('.nav');
      newJqueryparent.toggleClass("open");
      var navState = newJqueryparent.hasClass('open') ? "hide" : "show";
      newJquery(this).attr("title", navState + " navigation");
			// Set the timeout to the animation length in the CSS.
			setTimeout(function(){
				console.log("timeout set");
				newJquery('#menuToggle > span').toggleClass("navClosed").toggleClass("navOpen");
			}, 200);
    	e.preventDefault();
  	});
  });
})(jQuery);


// activity 추가 함수 
function logging_activity(mem, mem_page_id, title, currentTime, work){
	newJquery(".collapse-activity").append('\
		<li class="message-preview">\
		    <div class="media">\
                <div class="activity-list">\
                    <p><a href="#'+mem_page_id+'"><strong style="float:left;"><br />'+mem+' &nbsp;</strong></a>\
                	<br />'+title+'을/를 '+work+'>\
                	<span class="small text-muted">'+currentTime+'</span></p>\
        </div></div></li>\
		');
}
function intialize_sortables(){
	newJquery( ".task_pool" ).sortable({
			connectWith: ".task_pool",
			delay:25,
			revert:true,
			dropOnEmpty: true,
			forcePlaceHolderSize: true,
 			helper: 'clone',
 			forceHelperSize: true,
			receive: function(event, ui) {
					var itms= newJquery(this).children(".big_container").length;
					var index=newJquery(this).index();
					var wip=  newJquery(this).parent().parent().children("tr th:eq("+index+")").children("div:eq(1)").first().attr("wip");
					wip = check_number(wip);
					if((wip!=0)&&(itms>wip))
					{
						newJquery(ui.sender).sortable('cancel');
						//alert("WIP exceded");
					}
				}
	});
	newJquery('.itm_box_option').hide();
};
function find_next_box_itm_free(id){
	if(newJquery('#box_itm'+id).length)
	{
		id++;
		return find_next_box_itm_free(id);
	}
	else
	{
		return id;
	}
}
function check_number(number){
    if(isNaN(number)||(number<0))
	{
		number=0;
	}
	else if (number>100)
	{
		number=100;
	}
	return number;
}
// 정보 저장하는 함수
function save_edit(e){
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;

	if(code==13) { newJquery(".save").click(); }
}
// 헤더 정보 저장하는 함수
function save_edit_h(e){
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;

	if(code==13) { newJquery(".save_header").click(); }
}
// 배경 색깔 변경 함수
function changeBackground(color) {
   document.body.style.background = color;
}
