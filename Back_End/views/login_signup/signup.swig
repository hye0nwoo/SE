{% extends "../layout.swig" %}

{% block site_header %}
<link href="/public/css/form_signup.css" rel="stylesheet">
{% endblock %}


  
{% block site_body %}
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
				<input type="button" id="back" value="뒤로가기" />
                </form>
				
            </div>
        </div>
    </div>
{% endblock %}

{% block site_footer %}
<script src="/public/js/signup.js"></script>
{% endblock %}