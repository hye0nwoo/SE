{% extends '../index.swig' %}



{% block site_header %}

	<link rel="stylesheet" type="text/css" href="/public/css/jquery-frontier-cal-1.3.2.css" />
	<link rel="stylesheet" type="text/css" href="/public/css/colorpicker.css" />
	<link rel="stylesheet" type="text/css" href="/public/css/jquery-ui-1.8.1.custom.css" />
	<link rel="stylesheet" type="text/css" href="/public/css/colorselector.css" />
	<link rel="stylesheet" type="text/css" href="/public/css/calendar.css" />
	
	{% block page_header %}{% endblock %}

{% endblock %}



{% block site_body %}

	{% block page_body_nav %}{% endblock %}
    {% block page_body %}{% endblock %}
    {% block page_body_footer %}{% endblock %}

{% endblock %}



{% block site_footer %}

	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	
    <!-- Include JQuery UI (Required for calendar plugin.) -->
    <script type="text/javascript" src="/public/js/jquery-ui-1.8.1.custom.min.js"></script>

    <!-- Include color picker plugin (Not required for calendar plugin. Used for example.) -->
    <script type="text/javascript" src="/public/js/colorpicker.js"></script>

    <!-- Include jquery tooltip plugin (Not required for calendar plugin. Used for example.) -->
    <script type="text/javascript" src="/public/js/jquery.qtip-1.0.js"></script>
    <script type="text/javascript" src="/public/js/html2canvas.js"></script>
    <script type="text/javascript" src="/public/js/FileSaver.js"></script>
    <!--
        (Required for plugin)
        Dependancies for JQuery Frontier Calendar plugin.
        ** THESE MUST BE INCLUDED BEFORE THE FRONTIER CALENDAR PLUGIN. **
    -->
    <script type="text/javascript" src="/public/js/jshashtable-2.1.js"></script>

    <!-- Include JQuery Frontier Calendar plugin -->
    <script type="text/javascript" src="/public/js/jquery-frontier-cal-1.3.2.js"></script>
    <script type="text/javascript" src="/public/js/calendar.js"></script>
    
    {% block page_footer %}{% endblock %}

{% endblock %}
