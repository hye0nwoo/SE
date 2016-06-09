{% extends 'layout.swig' %}

{% block page_header %}{% endblock %}

{% block page_header %}


        <!-- custom scrollbar stylesheet -->
   
{% endblock %}

{% block page_body %}
<div class="modal-header">          
            <h1 class="modal-title" id="myModalLabel">프로젝트 관리</h4>
            </div>
    <div class="background">
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
                        <th {% if loop.last %} class="task_pool_header" {% else %} class="task_pool_header dotted_separator" {% endif %}><div class="header_name click"><span class="title_text">{{ title }}</span></div></th>
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

		 <div class="nav side" id="side-nav" role="navigation">
            <a class="side-nav-list" href="" id="menuToggle" title="show menu">
                <span class="navClosed"><i>show menu</i></span>
            </a>
            <div>
                <a class="side-nav-list" title="header"></a>
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
{% endblock %}

{% block page_body_footer %}{% endblock %}


{% block page_footer %}{% endblock %}