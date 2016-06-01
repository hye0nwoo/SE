{% extends '../index.swig' %}
    {% block page_header %}

<style id="css_disabled_color_picker" type="text/css">.mColorPicker[disabled] + span, .mColorPicker[disabled="disabled"] + span, .mColorPicker[disabled="true"] + span {filter:alpha(opacity=50);-moz-opacity:0.5;-webkit-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;cursor:default;}</style>

    <link rel="stylesheet" href="./kanban/jquery-ui.css" type="text/css" media="all">
    <link rel="stylesheet" href="./kanban/kanban.css" type="text/css" media="all">
    <!-- custom scrollbar stylesheet -->
    <link rel="stylesheet" href="malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css">
    {% endblock %}

    {% block page_body %}
    <div class="background">
        <div class="nav" id="side-nav" role="navigation">
            <a class="side-nav-list" href="" id="menuToggle" title="show menu">
                <span class="navClosed"><i>show menu</i></span>
            </a>
            <div>
                <a class="side-nav-list" title="header"></a>
                <hr>
                <a class="side-nav-list" data-toggle="collapse" href="#collapse-background" title="Item 1">
                Change color
                </a>
                <div class="collapse well rec" id="collapse-background" style="padding:0 0 0 0px;height:auto;">
                    <div class="board-color-list">
                        <span style="margin-left:5px;font-size:1.2em;">Background</span>
                        <div class="board-background" style="display:inline-flex;">
                            <div class="sel-background-color color-box rounded" style="background:#0079BF"></div>
                            <div class="sel-background-color color-box rounded" style="background:#D29034"></div>
                            <div class="sel-background-color color-box rounded" style="background:#519839"></div>
                        </div>
                        <span style="margin-left:5px;font-size:1.2em;">Lists</span>
                        <div class="box-background" style="display:inline-flex;">
                            <div class="sel-box-color color-box rounded" style="background:#d0d9dF"></div>
                            <div class="sel-box-color color-box rounded" style="background:#e2e0e4"></div>
                            <div class="sel-box-color color-box rounded" style="background:#f1f8f9"></div>
                        </div>
                    </div>
                </div>
                <a class="side-nav-list" href="#" title="Item 2">Item 2</a>
                <a class="side-nav-list" href="#" title="Item 3">Item 3</a>
                <hr>
                <a class="side-nav-list" data-toggle="collapse" href=".collapse-activity" title="Item 3">Activity</a>
                <div class="collapse well side-collapse-well rec collapse-activity" id="content-m">
                    {% for activity in activitys %}
                    <li class="message-preview">
                      <div class="media">
                        <div class="activity-list">
                          <p style="float:left;">
                             <a href="#a'+{{ activity.member.link }}+'">
                                <strong>{{ activity.member }} &nbsp;</strong>
                             </a>
                             {{ activity.action }} &nbsp;  {{ activity.name }}
                             <span class="small text-muted">{{ activity.time }}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                    {% endfor %}
                    <li class="message-footer activity-list">
                        <a href="#">Read All New Messages</a>
                    </li>
                </div>
            </div>
        </div>
        <div class="container-fluid" id="content-md">
            <!-- /.row -->
            <div class="main_div">
                <div class="btn-group" role="group" aria-label="controller" style="align:left;">
                        <button id="add_task" type="button" value="NEW TASK" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                        <button id="remove_col" type="button" value="DELETE COLUMN" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-indent-right" aria-hidden="true"></span></button>
                        <button id="add_col" type="button" value="NEW COLUMN" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-indent-left" aria-hidden="true"></span></button>
                    </div>
                    <table class="table rounded" style="align:left;">
                        <tbody><tr id="task_pool_header_container">
                        {% for column in columns %}
                        <th {% if loop.last %} class="task_pool_header" {% else %} class="task_pool_header dotted_separator" {% endif %}><div class="header_name click"><span class="title_text">{{ column.title }}</span></div></th>
                        {% endfor %}
                    </tr>
                    <tr id="task_pool_container">
                        {% for column in columns %}
                        <td {% if loop.last %} class="task_pool ui-sortable" {% else %} class="task_pool dotted_separator ui-sortable" {% endif %}>
                            {% for list in column.lists %}
                            <div class="big_container">
                                {{ list }}
                            </div>
                            {% endfor %}
                        </td>
                        {% endfor %}
                    </tbody></table>
                </div>
            </div>
        </div>
{% endblock %}

{% block page_footer %}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!--Include all compiled plugins (below), or include individual files as needed-->
    <script src="js/bootstrap.min.js"></script>


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script type="text/javascript" async="" src="./kanban/ga.js"></script><script src="./kanban/jquery-1.6.4.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="./kanban/kanban.js"></script>
    <script src="./kanban/jquery-ui.js" type="text/javascript"></script>
    <script src="./kanban/kanban.css" type="text/css"></script>
    <script type="text/javascript" src="./kanban/mColorPicker_min.js" charset="UTF-8"></script>
    <!-- custom scrollbar plugin -->
    <script src="malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>

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
{% endblock %}