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
                <form role="form">
                <div class="form-group">                
                    <label>아이디</label>
                    <input type="text" id="id" placeholder="아이디를 입력하세요" class="form-control">
                </div>
                <div class="form-group">
                    <label>비밀번호</label>
                    <input type="password" id="pass" placeholder="비밀번호를 입력하세요" class="form-control">                                
                </div>
                <div class="form-group">
                    <label>비밀번호 확인</label>
                    <input type="password" id="passcheck" placeholder="비밀번호를 확인하세요" class="form-control">                                
                </div>
                <div class="form-group">
                    <label>이름</label>
                    <input type="text" id="name" placeholder="이름을 입력하세요" class="form-control">
                </div>
                <div class="form-group">
                    <label>E-mail</label>
                    <input type="text" id="email" placeholder="이메일을 입력하세요" class="form-control">
                </div>
                <div class="form-group">
                    <label>전화번호</label>
                    <input type="text" id="phone" placeholder="'-' 빼고 숫자만 입력하세요" class="form-control">                                
                </div>
				<div id="butt">
                <input type="button" id="signup" value="가입하기"class="btn btn-default" />
				<input type="button" id="back" value="뒤로가기"class="btn btn-default" />
				</div>
                </form>
				
            </div>
        </div>
    </div>
{% endblock %}

{% block site_footer %}
<script src="/public/js/signup.js"></script>
{% endblock %}