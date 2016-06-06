
$(document).ready(function () {
    var i = 0;
    $(document).on('click', '.panel-heading span.icon_minim', function (e) {
        var $this = $(this);
        if (i == 0)
        {
            $this.parents('.panel').find('.col').slideDown();
            $('.msg_container_base').scrollTop($('.msg_container_base')[0].scrollHeight);
            $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
            i++;
        }
        else if ((!$this.hasClass('panel-collapsed'))) {
            $this.parents('.panel').find('.col').slideUp();
            $this.addClass('panel-collapsed');
            $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        } else {
            $this.parents('.panel').find('.col').slideDown();
            $this.removeClass('panel-collapsed');
            $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
    $(document).on('focus', '.panel-footer input.chat_input', function (e) {
        var $this = $(this);
        if ($('#minim_chat_window').hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideDown();
            $('#minim_chat_window').removeClass('panel-collapsed');
            $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
  
  
    function getdate() {
        var date = new Date();
        
        return date.getMonth() + 1 + "월 " + date.getDate() + "일 " + date.getHours() + "시 " + date.getMinutes() + "분";
    }
     
    var socket = io.connect();

    socket.emit('Room');
    socket.on('user message', function (data) {
    message(data.uid, data.msg, data.date);

    });
     function message(from, msg, date) {
        if (from == $('#session').val()) {
            $('.msg_container_base').append(
                $('<div class="row msg_container base_sent">')
                .append($('<div class="col-md-10 col-xs-10">')
                .append($('<div class="messages msg_sent">')
                .append($('<p>')
                .text(msg))
                .append($('<time datetime="2009-11-13T20:00">')
                .text(date )))));
        }
        else {
            $('.msg_container_base').append(
                $('<div class="row msg_container base_receive">')
                .append($('<div class="col-xs-10 col-md-10">')
                .append($('<div class="messages msg_receive">')
                .append($('<p>')
                .text(msg))
                .append($('<time datetime="2009-11-13T20:00">')
                .text(from +" "+ date)))));
        }
        $('.msg_container_base').scrollTop($('.msg_container_base')[0].scrollHeight);
   }
                  
       $('#btn-input').on('keydown', function () {
           if (event.keyCode == 13)
           {
               if ($("#btn-input").val() === "")
                   return false;
               socket.emit('user message', {msg:$('#btn-input').val(),date:getdate()});
                clear();
            }
            
        });
        $('#btn-chat').on('click',function () {
            if ($("#btn-input").val() === "")
                return false;
            socket.emit('user message', { msg: $('#btn-input').val(), date: getdate() });
            clear();
         });

        function clear() {
            $('#btn-input').val('').focus();
        };
        $('#userinfo').on('click', function () {
            $.ajax({
                type: "POST",
                url: "/userinfo",
                success:function(data)
                {
                    $("#id").val(data.member_id);
                    $("#name").val(data.name);
                    $("#email").val(data.email);
                    $("#phone").val(data.phone);
                    $("#userModal").modal();
                }
                                  
            })
            
        })
        $("#editInfo").on('click', function () {
            $("#editInfo").hide();
            $("#editcancel").show();
            $("#name").prop("disabled",false);
            $("#email").prop("disabled",false);
            $("#phone").prop("disabled", false);
            $(".editpass").show()
            $("#commit").show()
        })
        $("#editcancel").on('click', function () {
            $("#editcancel").hide();
            $("#editInfo").show();
            $("#name").prop("disabled", true);
            $("#email").prop("disabled", true);
            $("#phone").prop("disabled", true);
            $(".editpass").hide()
            $("#commit").hide()
        });
        $('#userModal').on('hidden.bs.modal', function () {
            $("#editcancel").hide();
            $("#editInfo").show();
            $("#name").prop("disabled", true);
            $("#email").prop("disabled", true);
            $("#phone").prop("disabled", true);
            $(".editpass").hide()
            $("#commit").hide()
        })
        $('#commit').on('click', function () {
            if(totalcheck()==true)
            {
                $.ajax({
                    type: "post",
                    url: "/editinfo",
                    data: {
                        opass: $('#pass').val(),
                        pass: $('#npass').val(),
                        name: $('#name').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val()
                    },
                    success: function (data) {
                        if(data=="성공")
                        {
                            alert("변경에 성공했습니다.");
                            $("#userModal").modal('hide');
                        }
                        else if(data="비번오류")
                        {
                            alert("입력한 기존 비밀번호가 다릅니다.");
                        }
                        else
                        {
                            alert("오류");
                        }
                    }
                });
            }
        })
        

    });
//특수문자 체크 함수, 포함하고 있으면 1 아니면 0 리턴   
function containChars(str, chars) {

    for (var i = 0 ; i < str.length; i++) {

        if (chars.indexOf(str.charAt(i)) !== -1) {
            return 1;
        }
    }

    return 0;
}

//소문자 숫자 체크 함수, 소문자 숫자 아닌것이 있으면 1리턴 아니면 0리턴
function alphabet_decimal_check(str) {

    for (var i = 0; i < str.length; i++) {

        var ch = str.charAt(i);

        if (((ch < 'a') || (ch > 'z')) && ((ch < '0') || (ch > '9'))) {
            return 1;
        }
    }

    return 0;

}

//비밀번호 체크 함수
function pw_check() {

    var oldpass = document.getElementById('pass').value;
    var strpass = document.getElementById('npass').value;
    var strcheck = document.getElementById('npasscheck').value;

    //공백 체크
    if (oldpass === "") {
        alert("현재 비밀번호를 입력해 주세요");
        return false;
    }
    if (strpass === "") {
        alert("새 비밀번호를 입력해 주세요");
        return false;
    }

    //공백 체크
    if (strcheck === "") {
        alert("새 비밀번호를 확인해 주세요");
        return false;
    }

    //영어 소문자 사용여부 체크
    if (containChars(strpass, "`abcdefghijklmnopqrstuvwxyz") !== 1) {

        alert("영어소문자 숫자 특수문자를 혼합해 주세요");
        return false;

    }

    //숫자 사용여부 체크
    if (containChars(strpass, "0123456789") !== 1) {

        alert("영어소문자 숫자 특수문자를 혼합해 주세요");
        return false;

    }

    //특수문자 사용여부 체크
    if (containChars(strpass, "`~!@#$^&*()_-+={[}]:;<,>.?/") !== 1) {

        alert("영어소문자 숫자 특수문자를 혼합해 주세요");
        return false;

    }

    //비밀번호와 비밀번호 확인 비교
    if (strpass !== strcheck) {

        alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요");
        return false;

    }

    // 비밀번호 자릿수 점검 : 6~12 자리        
    if ((strpass.length < 6) || (strpass.length > 12)) {

        alert("비밀번호는 6자 이상 12자 이하여야 합니다.");
        return false;

    }

    return true;
}

//이름 체크 함수
function name_check() {


    var strname = document.getElementById('name').value;

    //공백 체크
    if (strname === "") {
        alert("이름을 입력해 주세요");
        return false;
    }

    return true;
}

// 이메일 체크 함수
function email_check() {


    var stremail = document.getElementById('email').value;

    //공백 체크
    if (stremail === "") {
        alert("email을 입력해 주세요");
        return false;
    }

    //'@'또는 '.com' 있는지 확인
    if ((containChars(stremail, "@") === 0) || (stremail.indexOf(".") === -1)) {

        alert("email 양식대로 다시 입력해 주세요");
        return false;
    }

    //'@'뒤에 '.com' 이 있는지 확인
    if (stremail.indexOf("@") > stremail.indexOf(".")) {
        alert("email 양식대로 다시 입력해 주세요");
        return false;
    }

    return true;
}

// 전화번호 체크 함수
function phone_check() {


    var strphone = document.getElementById('phone').value;

    //공백 체크
    if (strphone === "") {
        alert("전화번호를 입력해 주세요");
        return false;
    }

    //11자리 체크
    if (strphone.length !== 11) {
        alert("전화번호는 11자리 입니다.");
        return false;
    }

    //숫자 체크
    for (i = 0; i < strphone.length; i++) {

        ch = strphone.charAt(i);

        if ((ch < '0') || (ch > '9')) {
            alert("전화번호는 숫자만 입력해 주세요");
            return false;
        }
    }

    return true;
}

// 전부 체크 함수
function totalcheck() {


    if (pw_check() && name_check() && email_check() && phone_check()) {
        return true;
    }

    return false;
}

