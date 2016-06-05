{% extends 'layout.swig' %}

{% block page_header %}{% endblock %}

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
                    <li class="board-list">
                      <div class="media">
                        <div class="activity-list">
                          <p>
                             <a href="#a'+{{ activity.member.link }}+'">
                                <strong style="float:left;">{{ activity.member }} &nbsp;</strong>
                             </a><br />{{ activity.action }} &nbsp;  {{ activity.name }}
                             <span class="small text-muted">{{ activity.time }}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                    {% endfor %}
                    <li class="board-list activity-list">
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
                        {% for title in titles %}
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

{% block page_body_footer %}{% endblock %}


{% block page_footer %}{% endblock %}