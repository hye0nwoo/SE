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
                <form role="form">
				<div class="form-group">
                <label>아이디</label>
				<input type="text" id="id" placeholder="아이디를 입력하세요" class="form-control" /><p>
				</div>
				<div class="form-group">
                <label>비밀번호</label>
				<input type="password" id="pass" placeholder="비밀번호를 입력하세요" class="form-control" /><p>
				</div>
				<div id="butt">
                 <input type="button" id="login" value="로그인" class="btn btn-default" />
				 <input type="button" id="signup" value="회원가입" class="btn btn-default" />
				 </div>
				 <br>
                
                </form>
            </div>
        </div>
    </div>
{% endblock %}

{% block site_footer %}
<script src="/public/js/login.js" type="text/javascript" ></script>
{% endblock %}
