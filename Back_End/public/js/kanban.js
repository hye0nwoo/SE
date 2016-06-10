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
var tag = 0;

$(document).ready(function() {


    $.ajax({
        type: 'post',
        url: '/schedule',
        success : function(data)
        {
            for(var i = 0;i<data.titles.length;i++)
            {
                var current_col = $(".task_pool_header:last").css('background');
                $(".task_pool_header:last").addClass("dotted_separator");
                $(".task_pool:last").addClass("dotted_separator");
                $("#task_pool_header_container").append('<th class="task_pool_header" id = "colu'+data.titles[i].seq+'"><div class="header_name click"><span class="title_text">' + data.titles[i].content + '</span></div></th>');

                $(".task_pool_header:last").css('background', current_col);
                $("#task_pool_container").append('<td class="task_pool" id =' + data.titles[i].col + '><div /></td>');
                intialize_sortables();
            }
            for (var i = 0; i < data.cards.length; i++) {
                
                $('#' + data.cards[i].col).first().append(data.cards[i].content);
            }
        }
    })

	// 칼럼 추가하는 함수
    $('#add_col').click(function () {
        var id = $(".task_pool").size();
        var current_col = $(".task_pool_header:last").css('background');
        $(".task_pool_header:last").addClass("dotted_separator");
        $(".task_pool:last").addClass("dotted_separator");

        $("#task_pool_header_container").append('<th class="task_pool_header" id = "colu'+id+'"><div class="header_name click"><span class="title_text">' + id + '</span></div></th>');
        $(".task_pool_header:last").css('background', current_col);
        $("#task_pool_container").append('<td class="task_pool" id =' + id + '><div /></td>');
        intialize_sortables();
        $.blockUI();
        $.ajax({
            type: 'post',
            url: '/schedule/getSeq',
            success: function (data) {
               $.ajax({
                    type: 'post',
                    url: '/schedule/add_card',
                    data:
                    {
                        col: id,
                        title: '',
                        content: $("#task_pool_header_container").children().last().text(),
                        flag: 1
                    },
                    success: function () {
                 		
                        $.unblockUI();

                    }

                })
            }
            // 칼럼 추가 후 정보 정송
        });
    });
	// 칼럼 삭제하는 함수
    $('#remove_col').click(function () {
        if ($(".task_pool_header").size() > 1) {
	        if ($("#" + $(".task_pool_header").last().index()).children(".big_container").length !=0) {
                alert("칼럼을 지우기 전에 내부의 카드를 전부 제거해 주세요.")
	        }
	        else {
	            
                
	            $.blockUI();
	            $.ajax({
	                type: 'post',
	                url: '/schedule/remove_col',
	                data :
                        {
                            col: $(".task_pool").last().attr('id')
                        },
	                success:function()
                        {
                            $.unblockUI();
                        }
	            })
	            $(".task_pool_header").last().remove();
	            $(".task_pool").last().remove();

	            $(".task_pool_header:last").removeClass("dotted_separator");
	            $(".task_pool:last").removeClass("dotted_separator");
	            intialize_sortables();
	        }
		    // 칼럼 삭제 후 정보 정송, 칼럼은 무조건 1개는 있어야 함
		}
	});
	// 내용 입력 받는 함수(column의 header, work list의 title, content 3가지가 이것을 이용)
	$(document).on('click', '.header_name', function () {
		var cur_name=$(this).children("span").html();
		var header_new_html=' \
		<div class="header_input"> \
			<input onkeypress="javascript:save_edit_h(event)" class="input header_input_name" value="'+cur_name+'" /> \
			<div class="option save_header"><button class="btn close btn-xs"><span class="glyphicon glyphicon-ok"></span></button></div> \
		</div>  \
		<div class="clear"></div> \
		';
		// 내용 input 안에 넣는 함수 html 그대로 넣음

		$(this).parent().html(header_new_html);
	});
	// 내용 html에 적용하는 함수
	$(document).on('click', '.save_header', function () {
    	var index=$(this).parent().parent().index();
    	var new_name = $(this).parent().parent().children("div:eq(0)").first().children(".input").first().val();
    	var id = $(this).parent().parent().parent().parent().attr('id');
    	if (id == null) {
    	    id = $(this).parent().parent().attr('id');
    	    
    	    if (new_name == "") {
    	        alert("내용을 입력하세요.");
    	    }
    	    else {
    	        $(this).parent().parent().html('<div class="header_name click"><span class="title_text">' + new_name + '</span></div>');
    	    }
    	    
    	    updateContent(index, $('#' + id).text(), parseInt(id.substr(4, id.length - 1)))
    	}
    	else {
    	    if (new_name == "") {
    	        alert("내용을 입력하세요.");
    	    }
    	    else {
    	        $(this).parent().parent().html('<div class="header_name click"><span class="title_text">' + new_name + '</span></div>');
    	    }
    	    updateContent($('#' + id).parent().attr('id'), $('#' + id).outerHTML(), parseInt(id.substr(4, id.length - 1)))

    	}
        
	});
	//checklist 함수 위에 함수랑 기능 똑같은데 차이점은 체크 버튼
	$(document).on('click', '.header_check_name', function () {
		var cur_name=$(this).children("span").html();
		var header_new_html=' \
		<div class="header_input"> \
			<input onkeypress="javascript:save_edit_h(event)" class="input header_input_name" value="'+cur_name+'" /> \
			<div class="option deletecheck"><button class="btn btn-xs"><span class="glyphicon glyphicon-remove"></span></button></div> \
			<div class="option save_header_check"><button class="btn btn-xs"><span class="glyphicon glyphicon-ok"></span></button></div> \
		</div>  \
		<div class="clear"></div> \
		';
		$(this).parent().html(header_new_html);
	});
	//checklist 함수 위에 함수랑 기능 똑같은데 차이점은 체크 버튼
	$(document).on('click', '.save_header_check', function () {
	    var index = $(this).parent().parent().index();
	    var id = $(this).parent().parent().parent().parent().parent().attr('id');
		var new_name=$(this).parent().parent().children("div:eq(0)").first().children(".input").first().val();
		if(new_name == ""){
			alert("내용을 입력하세요.");
		}
		else{
			$(this).parent().parent().html('<div class="header_check_name click"><span class="title_text">'+new_name+'</span></div>');
		    var chk = $(this).is(":checked");//.attr('checked');
	    	// 체크리스트 체크
	    	if(chk) $(this).next().children().children().css("text-decoration","line-through");
	    	// 체크리스트 체크 해제
	    	else  $(this).next().children().children().css("text-decoration","none");
		}
		updateContent($("#" + id).parent().attr('id'), $("#" + id).outerHTML(), parseInt(id.substr(4, id.length - 1)));
	});

	//work list 새롭게 생성									검색용 태그 #task list #work list #list
	$('#add_task').click(function () {
	    $.blockUI();
	      $.ajax({
	        type: 'post',
	        url: '/schedule/getSeq',
	        success :function(data)
	        {
	            addCard(data, 0)
	            $.ajax({
	                type: 'post',
	                url: '/schedule/add_card',
	                data:
                    {
                        col: 0,
                        title:'',
                        content: $('#' + data).outerHTML(),
                            
                        flag : 0
                    },
	                success:function()
	                {
	                	var date = new Date();
	                	$.ajax({
				                type: 'post',
				                url: '/schedule/add_log',
				                data:
			                    {

			                    	log : 'add card by ' + ''
			                       
			                    }
				            })
	       				 
	                    $.unblockUI();
	                }
	            })
	        }
	    })
		
//WIP		  <div n="'+id+'" class="option edit itm_box_option"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-ok"></i></button></div> \
//WIP		  <progress max="100" id="progress_bar'+id+'" class="pbar" value="0"></progress> \
		
	});
	// 버튼 hidden에서 show로
	$(document).on('mouseover', '.box_itm', function () {
        $(this).children().children('.itm_box_option').show();
	});
	// 버튼 show에서 hidden으로
	$(document).on('mouseout', '.box_itm', function () {
		$('.itm_box_option').hide();
	});
	// work list background 색깔 변경
	$(document).on('colorpicked', '.mColorPicker', function () {
	    $('#box_itm' + $(this).attr('n')).css('background', $(this).val());
	    var id = $(this).parent().parent().parent().parent().attr('id');

	    updateContent($("#" + id).parent().attr('id'), $("#" + id).outerHTML(), parseInt(id.substr(4, id.length - 1)));
	});
	// 배경 화면 색깔 변경
	$(document).on('colorpicked', '.colorete_background', function () {
		changeBackground($(this).val());
		$('.container-fluid').css('background',$(this).val());
	});
	// sidebar에서 선택한 색깔로 모든 work list와 columns 헤더 색깔 변경
	$('.sel-box-color').click(function (){
		var sel_color = $(this).css('background');
		$('.box_itm').css('background', sel_color);
		$('.task_pool_header').css('background', sel_color);
	});
	// sidebar에서 선택한 색깔로 배경 색깔 변경
	$('.sel-background-color').click(function (){
		var sel_color = $(this).css('background');
		$('.container-fluid').css('background', sel_color);
	});

// edit 없어져서 일단 안씀
/**	$(".save").on('click', function(){
		var id = $(this).attr("n");
		var box_itm_name=$('#name_input'+id).val();
		var box_itm_resp=$('#resp_input'+id).val();
		var box_itm_checklist=$('#checkbox'+id).html();
		var pbar_value=parseInt($('#progress_input'+id).val());
		pbar_value = check_number(pbar_value);
		var box_itm_new_html_start=' \
		    <div class="big_container"> \
				  <div id="name'+id+'" class="name">'+box_itm_name+'</div> \
				  <div class="dotted_hr"></div> \
				  <div id="resp'+id+'" class="name">'+box_itm_resp+'</div> \
				  <progress max="100" id="progress_bar'+id+'" class="pbar" value="'+pbar_value+'"></progress> \
		';
		var checklist_html='<div n='+$("#checkbox"+id).attr("n")+' id="checkbox'+id+'">'+box_itm_checklist+'</div>';
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
		$('#box_itm'+id).html(box_itm_new_html);
		$( "#box_itm"+id+" .itm_box_option input" ).mColorPicker();

		$('#box_itm'+id).on('mouseover',function(){
		  $(this).children().children().children('.itm_box_option').show();
	  });
	  $('#box_itm'+id).on('mouseout',function(){
		  $('.itm_box_option').hide();
	  });

	  $('.colorete').on('colorpicked', function () {
      $('#box_itm'+$(this).attr('n')).css('background',$(this).val());
	  });

	  var boxH = $('#box_itm'+id).height();
	  $('#box_itm'+id).css('height',boxH-50+"px");
	});**/
	// 체크리스트 추가 함수
	$(document).on('click', ".addcheck", function () {
		var id = $(this).attr("n");
		$("#checkbox"+id).attr("n",Number($("#checkbox"+id).attr("n"))+1);
		$("#checkbox"+id).append(' \
			<input class="check_left checked-list" type="checkbox" aria-label="Check"><div id="checkbox'+id+'" class="checkbox-list"><div class="header_check_name click"><span>checklist</span></div></div>\
			<div class="clear"></div> \
		');
		var id = $(this).parent().parent().parent().attr('id');

		updateContent($("#" + id).parent().attr('id'), $("#" + id).outerHTML(), parseInt(id.substr(4, id.length - 1)));
		// 체크리스트 추가 되었습니다.
	});
	// 체크리스트 체크 버튼
	$(document).on('click', ".checked-list", function () {
	    
	    var chk = $(this).is(":checked");//.attr('checked');
	    // 체크리스트 체크
	    if (chk) {
	        $(this).next().children().children().css("text-decoration", "line-through");
	        $(this).attr('checked', 'checked');
	    }
	        // 체크리스트 체크 해제
	    else {
	        $(this).next().children().children().css("text-decoration", "none");
	        $(this).removeAttr('checked');
	    }
	    var id = $(this).parent().parent().parent().attr('id');
	    
	    updateContent($("#"+id).parent().attr('id'), $("#"+id).outerHTML(), parseInt(id.substr(4, id.length - 1)));
	});
	// 체크리스트 삭제
	$(document).on('click', ".deletecheck", function () {
	    var id2 = $(this).parent().parent().parent().attr("id");
	    var id = $(this).parent().parent().parent().parent().parent().attr('id');
		$("#"+id2).attr("n",Number($("#"+id2).attr("n"))-1);
		$(this).parent().parent().prev().remove();
		$(this).parent().parent().remove();
	    // 체크리스트 삭제 되었습니다.
		
		updateContent($("#" + id).parent().attr('id'), $("#" + id).outerHTML(), parseInt(id.substr(4, id.length - 1)));
	});

// edit 안씀
/**	$('.edit').on('click', function() {
		var id = $(this).attr("n");
		var box_itm_name=$('#name'+id).html();
		var box_itm_resp=$('#resp'+id).html();
		var box_itm_checklist=$('#checkbox'+id).html();
		var pbar_value=parseInt($('#progress_bar'+id).prop('value'));
		if (isNaN(pbar_value)){ var pbar_value=0;}
		var box_itm_new_html_start=' \
				<div><span class="small_left"><input onkeypress="javascript:save_edit(event)" id="name_input'+id+'" class="input" value="'+box_itm_name+'" /></span><span class="small_right">title</span></div>  \
				<div><span class="small_left"><input onkeypress="javascript:save_edit(event)" id="resp_input'+id+'" class="input" value="'+box_itm_resp+'" /></span><span class="small_right">content</span></div>  \
				<div><span class="small_left"><input onkeypress="javascript:save_edit(event)" id="progress_input'+id+'" class="input" value="'+pbar_value+'" /></span><span class="small_right">percent</span></div>  \
		';
		var checklist_html='<div n="'+$("#checkbox"+id).attr("n")+'" id="checkbox'+id+'">'+box_itm_checklist+'</div>';
		var box_itm_new_html_last=' \
				<div class="small"> \
					<div n="'+id+'" class="option save"><button class="btn btn-success btn-xs"><i class="glyphicon glyphicon-ok"></i></button></div> \
				</div> \
				<div class="clear"></div> \
		';
		var box_itm_new_html = box_itm_new_html_start + checklist_html + box_itm_new_html_last;
		$('#box_itm'+id).html(box_itm_new_html);
		var boxH = $('#box_itm'+id).height();
		$('#box_itm'+id).css('height',boxH+50+"px");
	});**/

	// work list 삭제
	$(document).on('click', '.close_remove', function () {
	    var id = $(this).attr("n");
	    var id2 = $('#box_itm' + id).parent().attr('id');
	    var seq = parseInt(id2.substr(4, id2.length - 1))
	    $.blockUI();
	    $.ajax({
	        type: 'post',
	        url: '/schedule/remove_card',
	        data:
                {
                    seq: seq
                },
	        success:function()
	                {
	                	var date = new Date();
	                	$.ajax({
				                type: 'post',
				                url: '/schedule/add_log',
				                data:
			                    {

			                    	log : 'remove card by ' + ''
			                       
			                    }
				            })
	       				 
	                    $.unblockUI();
	                }
	    })
		$('#box_itm'+id).parent().remove();
		$('#box_itm'+id+'_shadow').remove();
		// 삭제되었습니다.
	});


	$('#txt_btn').click(function(){
			$('#texto').toggle('slow');
	});

        intialize_sortables();
});
// 메뉴 작동 시키는 함수 sidebar open, close 등
(function($){
	// Menu Functions
	$(document).ready(function(){
  	$('#menuToggle').click(function(e){
    	var $parent = $(this).parent('.nav');
      $parent.toggleClass("open");
      var navState = $parent.hasClass('open') ? "hide" : "show";
      $(this).attr("title", navState + " navigation");
			// Set the timeout to the animation length in the CSS.
			setTimeout(function(){
				console.log("timeout set");
				$('#menuToggle > span').toggleClass("navClosed").toggleClass("navOpen");
			}, 200);
    	e.preventDefault();
  	});
  });
})(jQuery);


// activity 추가 함수 
function logging_activity(mem, currentTime, work){
	$(".collapse-activity").append('\
		<li class="message-preview">\
		    <div class="media">\
                <div class="activity-list">\
                    '+work + ' by ' +mem+'\
                    <br /> '+currentTime+'\
			        </div></div></li>\
		');
}
function intialize_sortables(){
	$( ".task_pool" ).sortable({
			connectWith: ".task_pool",
			delay:25,
			revert:true,
			dropOnEmpty: true,
			forcePlaceHolderSize: true,
 			helper: 'clone',
 			forceHelperSize: true,
			receive: function(event, ui) {
					var itms= $(this).children(".big_container").length;
					var index=$(this).index();
					var wip=  $(this).parent().parent().children("tr th:eq("+index+")").children("div:eq(1)").first().attr("wip");
					wip = check_number(wip);
					if((wip!=0)&&(itms>wip))
					{
						$(ui.sender).sortable('cancel');
						//alert("WIP exceded");
					}
					var children = $(this).children(".big_container");
					
					children.each(function () {
					    var id = $(this).attr('id');
					    
					    updateContent($("#" + id).parent().attr('id'), $("#" + id).outerHTML(), parseInt(id.substr(4, id.length - 1)));
					})
                    
					
				}
	});
	$('.itm_box_option').hide();
};
function find_next_box_itm_free(id){
	if($('#box_itm'+id).length)
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

	if(code==13) { $(".save").click(); }
}
// 헤더 정보 저장하는 함수
function save_edit_h(e){
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;

	if(code==13) { $(".save_header").click(); }
}
// 배경 색깔 변경 함수
function changeBackground(color) {
   document.body.style.background = color;
}
function addCard(id2,col)
{
    var id = find_next_box_itm_free(1);
    $("#"+col).first().append(' \
		         <div class="big_container" id='+ id2 + '> \
			  <div id="box_itm'+ id + '"class="box_itm rounded"> \
			  	  <div id="name'+ id + '" class="name"><div class="header_name click"><span>Item ' + id + '</span></div></div>\
			  	  <div class="clear"></div> \
			  	  <div id="resp'+ id + '" class="name"><div class="header_name click"><span>resp ' + id + '</span></div></div>\
			  	  <div class="clear"></div> \
				  <div n="0" id="checkbox'+ id + '"></div> \
				  <div class="small"> \
					  <div n="'+ id + '" class="itm_box_option"><input n="' + id + '"  class="color colorete" type="color" data-text="hidden" data-colorlink="box_itm' + id + '" value="rgb(180,255,200)"></div> \
					  <div n="'+ id + '" class="option close_remove itm_box_option"><button class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-remove"></i></button></div> \
					  <div n="'+ id + '" class="option addcheck itm_box_option"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-check"></i></button></div>\
				  </div> \
				  <div class="clear"></div> \
			  </div> \
			  <div id="box_itm'+ id + '_shadow" class="shadow" /> \
			</div> \
		');
    $("#box_itm" + id + " .itm_box_option input").mColorPicker();
    $('.itm_box_option').hide();

    
}
function addCard2(data,col)
{
    $("#" + col).first().append(data);
}

function updateContent(col,content,seq)
{
    $.blockUI();

    $.ajax({
        type: 'post',
        url: '/schedule/update',
        data:
            {
                col: col,
                content: content,
                seq : seq
            },
        success:function()
	                {
	                	var date = new Date();
	                	$.ajax({
				                type: 'post',
				                url: '/schedule/add_log',
				                data:
			                    {

			                    	log : 'update card by ' + ''
			                       
			                    }
				            })
	       				 
	                    $.unblockUI();
	                }
    });
}

$.fn.outerHTML = function () {
    var el = $(this);
    if (!el[0]) return "";

    if (el[0].outerHTML) {
        return el[0].outerHTML;
    } else {
        var content = el.wrap('<p/>').parent().html();
        el.unwrap();
        return content;
    }
}