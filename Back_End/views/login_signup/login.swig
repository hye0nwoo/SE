{% extends '../layout.swig' %}
{% block site_header %}
<link href="/public/css/form_login.css" rel="stylesheet">

{% endblock %}



{% block site_body %}
<div>
    <div>
        <div>         
            <div class="wrap">
                <p class="form-title">
                 CYO</p>
                <form class="login">
                아이디 : <input type="text" id="id" placeholder="아이디를 입력하세요" /><p>
                비밀번호 : <input type="password" id="pass" placeholder="비밀번호를 입력하세요" /><p>                
                <input type="button" id="login" value="로그인" />
                <div id="DateIp">
                <input type="button" id="signup" value="회원가입" />
                
                
                </div>
                </form>
            </div>
        </div>
    </div>
{% endblock %}

{% block site_footer %}
<script src="/public/js/login.js" type="text/javascript" ></script>
{% endblock %}
