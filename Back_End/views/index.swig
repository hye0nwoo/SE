{% extends "layout.swig" %}

	{% block  site_header %}
	<link href="../public/css/chatting.css" rel="stylesheet" type="text/css">
	{% block p_layout_header %}{% endblock %}
	{% endblock %}

	{% block site_body %}
    <div id="wrapper">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
             <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/main">CYO</a>
            </div>
            <ul class="nav navbar-right top-nav">
			   <li class="dropdown">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bell"></i> <b class="caret"></b></a>
                    <ul class="dropdown-menu alert-dropdown">
                        <li>
                            <a href="#">Alert Name <span class="label label-default">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-primary">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-success">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-info">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-warning">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-danger">Alert Badge</span></a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="#">View All</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> {{name}} <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="#"><i class="fa fa-fw fa-user"></i> 사용자 정보</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-fw fa-gear"></i> 설정</a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="#"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav">
                    <li id="main" {% if flag=="main" %} class="active"{%endif%}>
                        <a href="/main"><i class="fa fa-fw fa-dashboard"></i> 메인</a>
                    </li>
                    <li id="project"{% if flag=="project" %} class="active"{%endif%}>
                        <a href="#"><i class="fa fa-fw fa-bar-chart-o"></i> 프로젝트관리</a>
                    </li>
                    <li id="calendar"{% if flag=="cal" %} class="active"{%endif%}>
                        <a href="/calendar"><i class="fa fa-fw fa-table"></i> 일정관리</a>
                    </li>
                    <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i class="fa fa-fw fa-arrows-v"></i> P-helper <i class="fa fa-fw fa-caret-down"></i></a>
                        <ul id="demo" class="collapse">
                            <li>
                                <a href="#">Tip</a>
                            </li>
                            <li>
                                <a href="#">PPT-Sample</a>
                            </li>
                            <li>
                                <a href="#">ETC../<a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="page-wrapper">
		<div id="container-fluid">
            {% block p_layout_body %}{% endblock %}
		</div>

        </div>
       
    </div>
   
    <div class="container" id="num1">
        <div class="row chat-window col-xs-5 col-md-3" id="num1">
            <div class="col-xs-12 col-md-12">
                <div class="panel panel-default ">
                    <div class="panel-heading top-bar">
                        <div class="col-md-8 col-xs-8">
                            <h3 class="panel-title"><span class="glyphicon glyphicon-comment"> 채팅</span></h3>
                        </div>
                        <div class="col-md-4 col-xs-4" style="text-align: right;">
                            <a href="#"><span id="minim_chat_window" class="glyphicon glyphicon-plus icon_minim"></span></a>
                        </div>
                    </div>
                    <div class="col" style="display : none">
                        <div class="panel-body msg_container_base">
                            

                        </div>
                        <div class="panel-footer">
                            <div class="input-group">
                                <input id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Write your message here..." />
                                <span class="input-group-btn">
                                    <button class="btn btn-primary btn-sm" id="btn-chat">Send</button>
                                </span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
		<input type="hidden" value = "{{sid}}" id='session' />
		<input type="hidden" value = "{{pro}}" id='project' />

    </div>
    {% endblock %}
    {% block site_footer %}
	<script src="/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="../public/js/chatting.js"></script>
	{% block p_layout_footer %}{% endblock %}
	{% endblock %}


