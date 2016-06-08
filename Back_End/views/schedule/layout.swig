{% extends '../index.swig' %}



{% block p_layout_header %}

    <!-- Bootstrap Core CSS -->
    <link href="/public/css/bootstrap.min.css" rel="stylesheet">
    <link href="/public/css/bootstrap-theme.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="/public/css/sb-admin.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="/public/css/font-awesome.min.css" rel="stylesheet" type="text/css">


    <link rel="stylesheet" href="/public/css/jquery-ui-1.8.6.css" type="text/css" media="all">
    <link rel="stylesheet" href="/public/css/kanban.css" type="text/css" media="all">
    <!-- custom scrollbar stylesheet -->
    <link rel="stylesheet" href="/public/js/jquery.mCustomScrollbar.css">

    {% block page_header %}{% endblock %}

{% endblock %}



{% block p_layout_body %}

    {% block page_body %}{% endblock %}
    {% block page_body_footer %}{% endblock %}

{% endblock %}



{% block p_layout_footer %}

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!--Include all compiled plugins (below), or include individual files as needed-->
    <script src="/public/js/bootstrap.min.js"></script>


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script type="text/javascript" async="" src="/public/js/ga.js"></script>
    <script src="/public/js/jquery-1.6.4.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/public/js/kanban.js"></script>
    <script src="/public/js/jquery-ui-1.8.6.js" type="text/javascript"></script>
    <script src="css/kanban.css" type="text/css"></script>
    <script type="text/javascript" src="/public/js/mColorPicker_min.js" charset="UTF-8"></script>
    <!-- custom scrollbar plugin -->
    <script src="/public/js/jquery.mCustomScrollbar.concat.min.js"></script>

    <script>
    (function($){
      $(window).load(function(){

        $.mCustomScrollbar.defaults.scrollButtons.enable=true; //enable scrolling buttons by default
        $.mCustomScrollbar.defaults.axis="yx"; //enable 2 axis scrollbars by default
        $("#content-l").mCustomScrollbar();
        $("#content-d").mCustomScrollbar({theme:"dark"});
        $("#content-l2").mCustomScrollbar({theme:"light-2"});
        $("#content-d2").mCustomScrollbar({theme:"dark-2"});
        $("#content-l3").mCustomScrollbar({theme:"light-3"});
        $("#content-d3").mCustomScrollbar({theme:"dark-3"});
        $("#content-ltk").mCustomScrollbar({theme:"light-thick"});
        $("#content-dtk").mCustomScrollbar({theme:"dark-thick"});
        $("#content-ltn").mCustomScrollbar({theme:"light-thin"});
        $("#content-dtn").mCustomScrollbar({theme:"dark-thin"});
        $("#content-m").mCustomScrollbar({theme:"minimal"});
        $("#content-md").mCustomScrollbar({theme:"minimal-dark"});
        $("#content-i").mCustomScrollbar({theme:"inset"});
        $("#content-id").mCustomScrollbar({theme:"inset-dark"});
        $("#content-i2").mCustomScrollbar({theme:"inset-2"});
        $("#content-i2d").mCustomScrollbar({theme:"inset-2-dark"});
        $("#content-i3").mCustomScrollbar({theme:"inset-3"});
        $("#content-i3d").mCustomScrollbar({theme:"inset-3-dark"});
        $("#content-r").mCustomScrollbar({theme:"rounded"});
        $("#content-rd").mCustomScrollbar({theme:"rounded-dark"});
        $("#content-rds").mCustomScrollbar({theme:"rounded-dots"});
        $("#content-rdsd").mCustomScrollbar({theme:"rounded-dots-dark"});
        $("#content-3d").mCustomScrollbar({theme:"3d"});
        $("#content-3dd").mCustomScrollbar({theme:"3d-dark"});
        $("#content-3dt").mCustomScrollbar({theme:"3d-thick"});
        $("#content-3dtd").mCustomScrollbar({theme:"3d-thick-dark"});
        $(".all-themes-switch a").click(function(e){
          e.preventDefault();
          var $this=$(this),
            rel=$this.attr("rel"),
            el=$(".content");
          switch(rel){
            case "toggle-content":
              el.toggleClass("expanded-content");
              break;
          }
        });
      });
    })(jQuery);
    </script>
    
    {% block page_footer %}{% endblock %}

{% endblock %}
