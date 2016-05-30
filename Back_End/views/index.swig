{% extends "layout.swig" %}

	{% block  site_header %}
	<link href="../public/css/chatting.css" rel="stylesheet" type="text/css">
		{% block page_header %}{% endblock %}
	{% endblock %}

	{% block site_body %}
    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="Main.html">CYO</a><!--화면 왼쪽 위 메뉴-->
            </div>
            <!-- Top Menu Items -->
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
                    </ul><!--알림-->
                </li>
                <li class="dropdown">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> 박현우 <b class="caret"></b></a>
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
            <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav">
                    <li class="active">
                        <a href="Main.html"><i class="fa fa-fw fa-dashboard"></i> 메인</a>
                    </li>
                    <li>
                        <a href="Main.html"><i class="fa fa-fw fa-bar-chart-o"></i> 프로젝트관리</a>
                    </li>
                    <li>
                        <a href="Main.html"><i class="fa fa-fw fa-table"></i> 일정관리</a>
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
            <!-- /.navbar-collapse -->
        </nav>

        <div id="page-wrapper">

            {% block page_body %}{% endblock %}


        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

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
                            <a href="#"><span class="glyphicon glyphicon-remove icon_close" data-id="chat_window_1"></span></a>
                        </div>
                    </div>
                    <div class="col" style="display : none">
                        <div class="panel-body msg_container_base">
                            <div class="row msg_container base_sent">
                                <div class="col-md-10 col-xs-10">
                                    <div class="messages msg_sent">
                                        <p>
                                            that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                        </p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div class="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                                </div>
                            </div>
                            <div class="row msg_container base_receive">
                                <div class="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                                </div>
                                <div class="col-md-10 col-xs-10">
                                    <div class="messages msg_receive">
                                        <p>
                                            that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                        </p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div class="row msg_container base_receive">
                                <div class="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                                </div>
                                <div class="col-xs-10 col-md-10">
                                    <div class="messages msg_receive">
                                        <p>
                                            that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                        </p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div class="row msg_container base_sent">
                                <div class="col-xs-10 col-md-10">
                                    <div class="messages msg_sent">
                                        <p>
                                            that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                        </p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div class="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                                </div>
                            </div>
                            <div class="row msg_container base_receive">
                                <div class="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                                </div>
                                <div class="col-xs-10 col-md-10">
                                    <div class="messages msg_receive">
                                        <p>
                                            that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                        </p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div class="row msg_container base_sent">
                                <div class="col-md-10 col-xs-10 ">
                                    <div class="messages msg_sent">
                                        <p>
                                            that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                        </p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div class="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                                </div>
                            </div>

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


    </div>
    {% endblock %}
    {% block site_footer %}
	<script type="text/javascript" src="../public/js/chatting.js"></script>
	<script src="../public/js/bootstrap.min.js"></script>	{% block page_footer %}{% endblock %}
	{% block ne}
	{% endblock %}


