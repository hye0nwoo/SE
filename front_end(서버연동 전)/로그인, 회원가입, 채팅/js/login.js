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