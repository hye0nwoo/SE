$(document).ready(function(){	

    var clickDate = "";
    var clickAgendaItem = "";
	
    /**
	 * Initializes calendar with current year & month
	 * specifies the callbacks for day click & agenda item click events
	 * then returns instance of plugin object
	 */
    var jfcalplugin = $("#mycal").jFrontierCal({
        date: new Date(),
        dayClickCallback: myDayClickHandler,
        agendaClickCallback: myAgendaClickHandler,
        agendaDropCallback: myAgendaDropHandler,
        agendaMouseoverCallback: myAgendaMouseoverHandler,
        dragAndDropEnabled: true
    }).data("plugin");
	
    /**
	 * Do something when dragging starts on agenda div
	 */
	
	
    /**
	 * Do something when dragging stops on agenda div
	 */

	
    /**
	 * Custom tooltip - use any tooltip library you want to display the agenda data.
	 * for this example we use qTip - http://craigsworks.com/projects/qtip/
	 *
	 * @param divElm - jquery object for agenda div element
	 * @param agendaItem - javascript object containing agenda data.
	 */
   
    $.ajax({
        type: 'post',
        url: 'calendar/down',
        data:
        {
            pid:$('#session').val()
        },
        success:function(data)
        {
            for (var i = 0; i < data.length;i++)
            {
                var startDateObj = new Date(parseInt(data[i].start_date[0] + data[i].start_date[1] + data[i].start_date[2] + data[i].start_date[3]), parseInt(data[i].start_date[5] + data[i].start_date[6]) - 1, parseInt(data[i].start_date[8] + data[i].start_date[9]), data[i].start_date[11] + data[i].start_date[12], data[i].start_date[14] + data[i].start_date[15], 0, 0);
                var endDateObj = new Date(parseInt(data[i].end_date[0] + data[i].end_date[1] + data[i].end_date[2] + data[i].end_date[3]), parseInt(data[i].end_date[5] + data[i].end_date[6]) - 1, parseInt(data[i].end_date[8] + data[i].end_date[9]), data[i].end_date[11] + data[i].end_date[12], data[i].end_date[14] + data[i].end_date[15], 0, 0);
                var flag;
                if (data[i].flag == 0) flag = 'private';
                else flag = 'public';
                addAgendaItem(jfcalplugin, data[i].title, startDateObj, endDateObj, flag,what, data[i].content, data[i].color_background, data[i].color_lang, false,true);
               
            }
        }
    })

    function myApplyTooltip(divElm,agendaItem){

        // Destroy currrent tooltip if present
        if(divElm.data("qtip")){
            divElm.qtip("destroy");
        }
		
        var displayData = "";
        var calcal =agendaItem.calcal;
        var title = agendaItem.title;
        var startDate = agendaItem.startDate;
        var endDate = agendaItem.endDate;
        var allDay = agendaItem.allDay;
        var data = agendaItem.data;
        displayData += "<br><b>" + title+ "</b><br><br>";
        if(allDay){
            displayData += "(All day event)<br><br>";
        }else{
            displayData += "<b>Starts:</b> " + startDate + "<br>" + "<b>Ends:</b> " + endDate + "<br><br>";
        }
        for (var propertyName in data) {
            displayData += "<b>" + propertyName + ":</b> " + data[propertyName] + "<br>"
        }
        // use the user specified colors from the agenda item.
        var backgroundColor = agendaItem.displayProp.backgroundColor;
        var foregroundColor = agendaItem.displayProp.foregroundColor;
        var myStyle = {
            border: {
                width: 5,
                radius: 10
            },
            padding: 10, 
            textAlign: "left",
            tip: true,
            name: "dark" // other style properties are inherited from dark theme		
        };
        if(backgroundColor != null && backgroundColor != ""){
            myStyle["backgroundColor"] = backgroundColor;
        }
        if(foregroundColor != null && foregroundColor != ""){
            myStyle["color"] = foregroundColor;
        }
        // apply tooltip


    };


    /**
	 * Make the day cells roughly 3/4th as tall as they are wide. this makes our calendar wider than it is tall. 
	 */
    jfcalplugin.setAspectRatio("#mycal",0.75);

    /**
	 * Called when user clicks day cell
	 * use reference to plugin object to add agenda item
	 */
    function myDayClickHandler(eventObj){
        // Get the Date of the day that was clicked from the event object
        var date = eventObj.data.calDayDate;
        // store date in our global js variable for access later
        clickDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        // open our add event dialog
        $('#add-event-form').dialog('open');
    };
	
    /**
	 * Called when user clicks and agenda item
	 * use reference to plugin object to edit agenda item
	 */
    function myAgendaClickHandler(eventObj){
        // Get ID of the agenda item from the event object
        var agendaId = eventObj.data.agendaId;		
        // pull agenda item from calendar
        var agendaItem = jfcalplugin.getAgendaItemById("#mycal",agendaId);
        clickAgendaItem = agendaItem;
        $("#display-event-form").dialog('open');
    };
	
    /**
	 * Called when user drops an agenda item into a day cell.
	 */
    function myAgendaDropHandler(eventObj){
        // Get ID of the agenda item from the event object
        var agendaId = eventObj.data.agendaId;
        // date agenda item was dropped onto
        var date = eventObj.data.calDayDate;
        // Pull agenda item from calendar
        var sOe = eventObj.data.sOe;
        var agendaItem = jfcalplugin.getAgendaItemById("#mycal", agendaId);
        if (sOe == "start") {
            deleteAgendaItem(agendaItem.title);
            addAgendaItem(jfcalplugin, agendaItem.title, date, agendaItem.endDate, agendaItem.title, agendaItem.data.opt, agendaItem.data.contents, agendaItem.displayProp.backgroundColor, agendaItem.displayProp.foregroundColor, true,false);
            
        }
        else if (sOe = "end") {
            deleteAgendaItem(agendaItem.title);
            addAgendaItem(jfcalplugin, agendaItem.title, agendaItem.startDate, date, agendaItem.title, agendaItem.data.opt, agendaItem.data.contents, agendaItem.displayProp.backgroundColor, agendaItem.displayProp.foregroundColor, true, false);

        }
    };
	
    /**
	 * Called when a user mouses over an agenda item	
	 */
    function myAgendaMouseoverHandler(eventObj){
        var agendaId = eventObj.data.agendaId;
        var agendaItem = jfcalplugin.getAgendaItemById("#mycal",agendaId);
        //alert("You moused over agenda item " + agendaItem.title + " at location (X=" + eventObj.pageX + ", Y=" + eventObj.pageY + ")");
    };
    /**
	 * Initialize jquery ui datepicker. set date format to yyyy-mm-dd for easy parsing
	 */
    $("#dateSelect").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });
	
    /**
	 * Set datepicker to current date
	 */
    $("#dateSelect").datepicker('setDate', new Date());
    /**
	 * Use reference to plugin object to a specific year/month
	 */
    $("#dateSelect").bind('change', function() {
        var selectedDate = $("#dateSelect").val();
        var dtArray = selectedDate.split("-");
        var year = dtArray[0];
        // jquery datepicker months start at 1 (1=January)		
        var month = dtArray[1];
        // strip any preceeding 0's		
        month = month.replace(/^[0]+/g,"")		
        var day = dtArray[2];
        // plugin uses 0-based months so we subtrac 1
        jfcalplugin.showMonth("#mycal",year,parseInt(month-1).toString());
    });	
    /**
	 * Initialize previous month button
	 */
    $("#BtnPreviousMonth").button();
    $("#BtnPreviousMonth").click(function() {
        jfcalplugin.showPreviousMonth("#mycal");
        // update the jqeury datepicker value
        var calDate = jfcalplugin.getCurrentDate("#mycal"); // returns Date object
        var cyear = calDate.getFullYear();
        // Date month 0-based (0=January)
        var cmonth = calDate.getMonth();
        var cday = calDate.getDate();
        // jquery datepicker month starts at 1 (1=January) so we add 1
        $("#dateSelect").datepicker("setDate",cyear+"-"+(cmonth+1)+"-"+cday);
        return false;
    });
    /**
	 * Initialize next month button
	 */
    $("#BtnNextMonth").button();
    $("#BtnNextMonth").click(function() {
        jfcalplugin.showNextMonth("#mycal");
        // update the jqeury datepicker value
        var calDate = jfcalplugin.getCurrentDate("#mycal"); // returns Date object
        var cyear = calDate.getFullYear();
        // Date month 0-based (0=January)
        var cmonth = calDate.getMonth();
        var cday = calDate.getDate();
        // jquery datepicker month starts at 1 (1=January) so we add 1
        $("#dateSelect").datepicker("setDate",cyear+"-"+(cmonth+1)+"-"+cday);		
        return false;
    });
	
	
    /* Initialize add event modal form
    */

    $("#add-event-form").dialog({
        autoOpen: false,
        height: 700,
        width: 500,
        modal: true,
        buttons: {
            'Add Event': function () {
		       
                var what = jQuery.trim($("#what").val());
				                
                if(what == ""){
                    alert("일정제목을 입력하세요.");
                } else {
                    if (jfcalplugin.getAgendaItemByDataAttr("#mycal", "key", what) != null && ($("#tok").val()) != "true") {
                        alert("같은 제목을 가진 일정이 이미 존재합니다.");
                    }
                    else {

                        if (($("#tok").val()) == "true") {
                            jfcalplugin.deleteAgendaItemByDataAttr("#mycal", "key", $("#tok2").val());
                            deleteAgendaItem($("#tok2").val());
                           
                        }

                        var startDate = $("#startDate").val();
                        var startDtArray = startDate.split("-");
                        var startYear = startDtArray[0];
                        // jquery datepicker months start at 1 (1=January)		
                        var startMonth = startDtArray[1];
                        var startDay = startDtArray[2];
                        // strip any preceeding 0's		
                        startMonth = startMonth.replace(/^[0]+/g, "");
                        startDay = startDay.replace(/^[0]+/g, "");
                        var startHour = jQuery.trim($("#startHour").val());
                        var startMin = jQuery.trim($("#startMin").val());
                        if (startMin == "0" || startMin == "00") {
                            startMin = 0;
                        } else {
                            startMin = parseInt(startMin.replace(/^[0]+/g, ""));
                        }
				        
                        startHour = Number(startHour);
				       

                        var endDate = $("#endDate").val();
                        var endDtArray = endDate.split("-");
                        var endYear = endDtArray[0];
                        // jquery datepicker months start at 1 (1=January)		
                        var endMonth = endDtArray[1];
                        var endDay = endDtArray[2];
                        // strip any preceeding 0's		
                        endMonth = endMonth.replace(/^[0]+/g, "");

                        endDay = endDay.replace(/^[0]+/g, "");
                        var endHour = jQuery.trim($("#endHour").val());
                        var endMin = jQuery.trim($("#endMin").val());
                        if (endMin == "0" || endMin == "00") {
                            endMin = 0;
                        } else {
                            endMin = parseInt(endMin.replace(/^[0]+/g, ""));
                        }
				       
                        endHour = Number(endHour);
				    

                        //alert("Start time: " + startHour + ":" + startMin + " " + startMeridiem + ", End time: " + endHour + ":" + endMin + " " + endMeridiem);

                        // Dates use integers
                        var startDateObj = new Date(parseInt(startYear), parseInt(startMonth) - 1, parseInt(startDay), startHour, startMin, 0, 0);
                        var endDateObj = new Date(parseInt(endYear), parseInt(endMonth) - 1, parseInt(endDay), endHour, endMin, 0, 0);

                        // add new event to the calendar
                        addAgendaItem(jfcalplugin, what, startDateObj, endDateObj,what, $('#calcal option:selected').val(), $("#contents").val(), $("input[type=radio][name=colorSelectorBackground]:checked").val(), $("input[type=radio][name=colorSelectorForeground]:checked").val(), true,true);
                    }
                    $(this).dialog('close');

                }
				
            },
            Cancel: function() {
                $(this).dialog('close');
            }
        },
        open: function(event, ui){
            // initialize start date picker
            $("#startDate").datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy-mm-dd'
            });
            // initialize end date picker
            $("#endDate").datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy-mm-dd'
            });
            // initialize with the date that was clicked
            $("#startDate").val(clickDate);
            $("#endDate").val(clickDate);
			
            //$("#colorForeground").val("#ffffff");				
            // put focus on first form input element
            $("#what").focus();
        },
        close: function() {
            // reset form elements when we close so they are fresh when the dialog is opened again.
            $("#startDate").datepicker("destroy");
            $("#endDate").datepicker("destroy");
            $("#startDate").val("");
            $("#endDate").val("");
            $("#calcal").val("private");
            $("#startHour option:eq(0)").attr("selected", "selected");
            $("#startMin option:eq(0)").attr("selected", "selected");
            $("#startMeridiem option:eq(0)").attr("selected", "selected");
            $("#endHour option:eq(0)").attr("selected", "selected");
            $("#endMin option:eq(0)").attr("selected", "selected");
            $("#endMeridiem option:eq(0)").attr("selected", "selected");			
            $("#what").val("");
            $("#tok").val("");
            $("#tok2").val("");
            $("#contents").val("");
            $("#ff5f5f5").prop("checked", true);
            $("#b000000").prop("checked", true);
      }
    });
	
    /**
	 * Initialize display event form.
	 */
    $("#display-event-form").dialog({
        autoOpen: false,
        height: 400,
        width: 400,
        modal: true,
        buttons: {		
            Cancel: function() {
                $(this).dialog('close');
            },
            'Edit': function() {
                $('#add-event-form').dialog('open');
                /*$(this).add-event-form('open');수정기능 */
                {
                    var agendaItem = jfcalplugin.getAgendaItemById("#mycal", clickAgendaItem.agendaId);
                    $("#calcal").val(agendaItem.data.opt);
                    $("#what").val(agendaItem.title);
                    $("#startDate").val(agendaItem.startDate.getFullYear() + "-" + (agendaItem.startDate.getMonth() + 1) + "-" + agendaItem.startDate.getDate());
                    $("#startHour").val(agendaItem.startDate.getHours());
                    $("#startMin").val(agendaItem.startDate.getMinutes());
                    $("#endDate").val(agendaItem.endDate.getFullYear() + "-" + (agendaItem.endDate.getMonth() + 1) + "-" + agendaItem.endDate.getDate());
                    $("#endHour").val(agendaItem.endDate.getHours());
                    $("#endMin").val(agendaItem.endDate.getMinutes());
                    $("#contents").val(agendaItem.contents);
                    $("#tok").val(true);
                    $("#tok2").val(agendaItem.title);
                    $("#contents").val(agendaItem.data.contents);
                    var bc = agendaItem.displayProp.backgroundColor
                    var fc = agendaItem.displayProp.foregroundColor
                    if (fc == "#000000") $("#f000000").prop("checked", true);
                    
                    else if (fc == "#f1d04d") $("#ff1d04d").prop("checked", true);
                    else if (fc == "#caaf40") $("#fcaaf40").prop("checked", true);
                    else if (fc == "#92d04f") $("#f92d04f").prop("checked", true);
                    else if (fc == "#7aaf42") $("#f7aaf42").prop("checked", true);
                    else if (fc == "#ed5850") $("#fed5850").prop("checked", true);
                    else if (fc == "#b70218") $("#fb70218").prop("checked", true);
                    else if (fc == "#00bfff") $("#f00bfff").prop("checked", true);
                    else if (fc == "#dcdcdc") $("#fdcdcdc").prop("checked", true);
                    else if (fc == "#f5f5f5") $("#ff5f5f5").prop("checked", true);
                    if (bc == "#000000") $("#b000000").prop("checked", true);
                    else if (bc == "#f1d04d") $("#bf1d04d").prop("checked", true);
                    else if (bc == "#caaf40") $("#bcaaf40").prop("checked", true);
                    else if (bc == "#92d04f") $("#b92d04f").prop("checked", true);
                    else if (bc == "#7aaf42") $("#b7aaf42").prop("checked", true);
                    else if (bc == "#ed5850") $("#bed5850").prop("checked", true);
                    else if (bc == "#b70218") $("#bb70218").prop("checked", true);
                    else if (bc == "#00bfff") $("#b00bfff").prop("checked", true);
                    else if (bc == "#dcdcdc") $("#bdcdcdc").prop("checked", true);
                    else if (bc == "#f5f5f5") $("#bf5f5f5").prop("checked", true);
                        				       
                }
                $(this).dialog('close');
            },
            'Delete': function() {
                if(confirm("일정을 삭제하시겠습니까?")){
                    if (clickAgendaItem != null) {
                        deleteAgendaItem(clickAgendaItem.title);
                        jfcalplugin.deleteAgendaItemById("#mycal", clickAgendaItem.agendaId);

                    }
                    $(this).dialog('close');
                }
            }			
        },
        open: function(event, ui){
            if(clickAgendaItem != null){
                var calcal = clickAgendaItem.data.opt;
                if (calcal == "private") calcal = "개인일정";
                else calcal = "공식일정";
                var title = clickAgendaItem.title;
                var startDate = clickAgendaItem.startDate;
                var endDate = clickAgendaItem.endDate;
                var allDay = clickAgendaItem.allDay;
                var data = clickAgendaItem.data;
                // in our example add agenda modal form we put some fake data in the agenda data. we can retrieve it here.
                $("#display-event-form").append(
                   "<br><b>" + calcal + "</b><br>" +
					"<br><b>" + title+ "</b><br><br>"		
				);				
				
                $("#display-event-form").append(
                    "<b>시작일:</b> " + startDate.getFullYear() + "년 " + (startDate.getMonth()+1) + "월 " + startDate.getDate() + "일 " + startDate.getHours() + "시 " + startDate.getMinutes()+ "분 <br>" +
                    "<b>종료일:</b> " + endDate.getFullYear() + "년 " + (endDate.getMonth() + 1) + "월 " + endDate.getDate() + "일 " + endDate.getHours() + "시 " + endDate.getMinutes() + "분 <br>"
                );				
                $("#display-event-form").append("<br><b>" + "일정 내용" + "</b> " +"<br>"+ data["contents"] + "<br>");
					
            }		
        },
        close: function() {
            // clear agenda data
            $("#display-event-form").html("");
        }
    });	 

    /**
	 * Initialize our tabs
	 */
	
	
});

$(function() { 
    $("#test33").click(function() { 
        html2canvas($("#mycal"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                canvas.toBlob(function (blob) {
                    saveAs(blob, "일정관리달력.png"); 
                });
            }
        });
    });
});

$(document).ready(function () {


    $('#public_click').click(function () {
        if ($('.public').css("display") == "none") {
            $('.public').css("display", "");

        }
        else {
            $('.public').css("display", "none");
        }

    });


    $('#private_click').click(function () {
        if ($('.private').css("display") == "none") {
            $('.private').css("display", "");
        }
        else {
            $('.private').css("display", "none");
        }
    });
});
function openWin(_url, _width, _height) { 
		 window.open(_url, "popup", "width="+_width+", height="+_height+", resizable=no, scrollbars=no") ; 
}

function addAgendaItem(jfcalplugin,what,startDateObj,endDateObj,opt,key,contents,backgroundColor,foregroundColor,flag2,flag3)
{
    if (flag3) {
        jfcalplugin.addAgendaItem(
                       "#mycal",
                       what,
                       startDateObj,
                       endDateObj,
                       false,
                       {
                           opt: opt,
                           key: what,
                           contents: contents
                       },
                       {
                           backgroundColor: backgroundColor,
                           foregroundColor: foregroundColor
                       }
                   );
    }
    if (flag2 == true) {
        var sd = startDateObj.getFullYear().toString() + "-" + (startDateObj.getMonth() + 1).toString() + "-" + (startDateObj.getDate()).toString() + " " + startDateObj.getHours().toString() + ":" + startDateObj.getMinutes().toString() + ":" + startDateObj.getSeconds().toString();
        var ed = endDateObj.getFullYear().toString() + "-" + (endDateObj.getMonth() + 1).toString() + "-" + (endDateObj.getDate()).toString() + " " + endDateObj.getHours().toString() + ":" + endDateObj.getMinutes().toString() + ":" + endDateObj.getSeconds().toString();

        var flag;
        if (opt == 'private') flag = 0;
        else flag = 1;
        $.ajax({
            type: "POST",
            url: "/calendar/add",
            data:
            {
                member_id: $("#session").val(),
                flag: flag,
                startDate: sd,
                endDate: ed,
                title: what,
                content: contents,
                color_background: backgroundColor,
                color_foreground: foregroundColor
            }
        })
    }
}

function deleteAgendaItem(title)
{
    $.ajax({
        type: "POST",
        url: '/calendar/delete',
        data:
            {
                title:title
            }
    })
}

