{% extends '../layout.swig' %}

{# schedule 해더 부분 #}
{% block site_header %}

    {# schedule 전체적용 css #}

    <!-- 
    <link rel="stylesheet" href="/.css">
    <link rel="stylesheet" href="/.css">
    <link rel="stylesheet" href="/.css">
    -->

    {# schedule 각 페이지 해더 부분 #}
    {% block page_header %}{% endblock %}

{% endblock %}

{# schedule 바디 부분 #}
{% block site_body %}
    
    {# schedule 각 페이지 바디 부분 #}
    {% block page_body_menu %}{% endblock %}
    {% block page_body %}{% endblock %}
    {% block page_body_footer %}{% endblock %}

{% endblock %}


{# schedule 푸터 부분 #}
{% block site_footer %}

    {# schedule 전체 적용 js #}
    <!--
    <script src="/.js"></script>
    <script src="/.js"></script>
    -->

    {# schedule 각 페이지 푸터 부분 #}
    {% block page_footer %}{% endblock %}

{% endblock %}