{% extends '../index.swig' %}



{% block p_layout_header %}

	<link rel="stylesheet" href="/public//css/jquery.mobile-1.3.0.min.css" />
	<link rel="stylesheet" href="/public/css/Select.css" />
	<link rel="stylesheet" href="/public/css/bootstrap-datepicker.min.css" />
	
{% endblock %}



{% block p_layout_body %}

	
    {% block page_body %}{% endblock %}


{% endblock %}



{% block p_layout_footer %}
	<script src="/public/js/bootstrap-datepicker.min.js"></script>   
	<script src="/public/js/project_s.js"></script>  
   
{% endblock %}
