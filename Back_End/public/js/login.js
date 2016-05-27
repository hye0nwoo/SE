//아이디 체크 함수 
function id_check() {

    
    var strid = document.getElementById('id').value;

    //공백 체크
    if(strid === ""){
    alert("아이디를 입력하세요");
    return false;
    }

    return true;
} 

//비밀번호 체크 함수
function pw_check() {


    var strpass = document.getElementById('pass').value; 
    
    //공백 체크
    if(strpass === ""){
    alert("비밀번호를 입력하세요");
    return false;
    }   

    return true;
}

// 전부 체크 함수
function totalcheck() {


        if(id_check() && pw_check()){
    return true;
    }

    return false;
}

function getdate(){
    var today = new Date();
    var currentTime =
    (today.getYear()+1900)+"-"+
    (today.getMonth()+1)+"-"+
    today.getDate()+" "+
    today.getHours()+":" +
    today.getMinutes()+ ":"+
    today.getSeconds(); 
    return currentTime;
}

$(document).ready(function () {
  
    var now = getdate();
    $('#DateIp').append("현재시각 : ");
    $('#DateIp').append(now);
        $('#login').on('click',function(){
        if(totalcheck()){
            $.ajax({
                type: "POST",
                url: "/login",
                data: {
                    id: $('#id').val(),
                    pass: $('#pass').val(),
                },
                success: function (data) {
                    if (data == "성공") {
                        window.location.href = "/main";
                    }
                    else {
                        alert("아이디가 존재하지 않거나, 패스워드가 틀립니다.")
                    }

                }
            });
        }           
        });
        $('#signup').on('click', function () {
            window.location.href = "/signup"
        });

        
 });

 