//특수문자 체크 함수, 포함하고 있으면 1 아니면 0 리턴   
function containChars(str, chars) {

    for (var i = 0 ; i < str.length; i++){
  
        if(chars.indexOf(str.charAt(i)) !== -1){             
        return 1;
        }
    }
         
    return 0;                 
}

//소문자 숫자 체크 함수, 소문자 숫자 아닌것이 있으면 1리턴 아니면 0리턴
function alphabet_decimal_check(str)
{

        for (var i = 0; i < str.length; i++){
        
    var ch = str.charAt(i);
                
                if(((ch < 'a') || (ch > 'z')) && ((ch < '0') ||(ch > '9'))){
                return 1;
        }
    }
         
    return 0;    

}

//아이디 체크 함수 
function id_check() {

    
    var strid = document.getElementById('id').value;

    //공백 체크
    if(strid === ""){
    alert("아이디를 입력해 주세요");
    return false;
    }
     
    // 특수문자 입력 여부 점검
    if (containChars(strid, "`~!@#$^&*()_-+={[}]:;<,>.?/") === 1){ 
        
    alert("아이디는 영어 소문자 및 숫자만 사용해 주세요");
    return false;

    }

    // 소문자 숫자 구성체크
    if(alphabet_decimal_check(strid) === 1){

    alert("아이디는 영어 소문자 및 숫자만 사용해 주세요");
    return false;
    
    }
        
    // 아이디 자릿수 점검 : 6~12 자리        
    if ((strid.length < 6) || (strid.length > 12)){

    alert("아이디는 6자 이상 12자 이하여야 합니다.");
    return false;

    }

    return true;
} 

//비밀번호 체크 함수
function pw_check() {


    var strpass = document.getElementById('pass').value; 
    var strcheck = document.getElementById('passcheck').value; 

    //공백 체크
    if(strpass === ""){
    alert("비밀번호를 입력해 주세요");
    return false;
    }

    //공백 체크
    if(strcheck === ""){
    alert("비밀번호를 확인해 주세요");
    return false;
    } 

    //영어 소문자 사용여부 체크
     if (containChars(strpass, "`abcdefghijklmnopqrstuvwxyz") !== 1){ 
        
    alert("영어소문자 숫자 특수문자를 혼합해 주세요");
    return false;

    }

    //숫자 사용여부 체크
     if (containChars(strpass, "0123456789") !== 1){ 
        
    alert("영어소문자 숫자 특수문자를 혼합해 주세요");
    return false;

    }

    //특수문자 사용여부 체크
     if (containChars(strpass, "`~!@#$^&*()_-+={[}]:;<,>.?/") !== 1){ 
        
    alert("영어소문자 숫자 특수문자를 혼합해 주세요");
    return false;

    }

    //비밀번호와 비밀번호 확인 비교
        if (strpass !==  strcheck)  {
        
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
function name_check(){


    var strname = document.getElementById('name').value; 
    
    //공백 체크
    if(strname === ""){
    alert("이름을 입력해 주세요");
    return false;
    } 

    return true;
}

// 이메일 체크 함수
function email_check(){


    var stremail = document.getElementById('email').value; 

    //공백 체크
    if(stremail === ""){
    alert("email을 입력해 주세요");
    return false;
    } 

    //'@'또는 '.com' 있는지 확인
    if((containChars(stremail,"@")===0) || (stremail.indexOf(".") === -1)){

    alert("email 양식대로 다시 입력해 주세요");
    return false;
    }

    //'@'뒤에 '.com' 이 있는지 확인
    if(stremail.indexOf("@") > stremail.indexOf(".")){
    alert("email 양식대로 다시 입력해 주세요");
    return false;
    }
    
    return true;
}

// 전화번호 체크 함수
function phone_check(){


    var strphone = document.getElementById('phone').value; 

    //공백 체크
    if(strphone === ""){
    alert("전화번호를 입력해 주세요");
    return false;
    } 

    //11자리 체크
    if(strphone.length !== 11){
    alert("전화번호는 11자리 입니다.");
    return false;
    }

    //숫자 체크
    for (i = 0; i < strphone.length; i++) {
        
    ch = strphone.charAt(i);
                
        if((ch < '0') ||(ch > '9')){
        alert("전화번호는 숫자만 입력해 주세요");
        return false;
        }
    }

    return true;
}

// 전부 체크 함수
function totalcheck() {


        if(id_check() && pw_check() && name_check() && email_check() && phone_check()){
    return true;
    }

    return false;
}

$(document).ready(function () {
    $('#signup').on('click', function () {
        if (totalcheck()) {
            $.ajax({
                type: "POST",
                url: "/signup",
                data: {
                    id: $('#id').val(),
                    pass: $('#pass').val(),
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val()
                },
                success:function(data)
                {
                    if (data == "서버")
                    {
                        alert("서버 자체 오류입니다. 관리자에게 문의하십시오.");
                    }
                    else if (data == "중복")
                    {
                        alert("아이디가 이미 존재합니다.");
                    }
                    else
                    {
                        alert("성공적으로 회원가입 되었습니다.");
                        window.location.href = "/";
                    }
                    
                }
                

            });
            
        }
    });
    $('#back').on('click', function () {
        window.location.href = "/"
    });
});