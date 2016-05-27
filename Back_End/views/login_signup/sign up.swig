<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

<link href="css/form_signup.css" rel="stylesheet">

    <title>Sign Up</title>

<script src="js/signup.js"></script>
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script>
    $(document).ready(function(){
        $('#signup').on('click',function(){
            if(totalcheck()){
                alert("성공적으로 회원가입 되었습니다");
            }           
        });
    });
</script>
</head>

<body>
<div>
    <div>
        <div>         
            <div class="wrap">
                <p class="form-title">
                 회원가입</p>
                <form class="signup">
                아이디 : <input type="text" id="id" placeholder="아이디를 입력하세요" /><p>
                비밀번호 : <input type="password" id="pass" placeholder="비밀번호를 입력하세요" /><p>
                비밀번호 확인: <input type="password" id="passcheck" placeholder="비밀번호를 확인하세요" /><p>
                이름 : <input type="text" id="name" placeholder="이름을 입력하세요"/><p>
                E-mail : <input type="text" id="email" placeholder="이메일을 입력하세요"/><p>
                전화번호 :<input type="text" id="phone" placeholder="'-' 빼고 숫자만 입력하세요"/><p>
                <input type="button" id="signup" value="가입하기" />
                </form>
            </div>
        </div>
    </div>
   
</body>
</html>