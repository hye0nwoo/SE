{% extends '../layout.swig' %}

{# calendar 해더 부분 #}
{% block site_header %}

    {# calendar 전체적용 css #}

    <!-- 
    <link rel="stylesheet" href="/.css">
    <link rel="stylesheet" href="/.css">
    <link rel="stylesheet" href="/.css">
    -->

    {# calendar 각 페이지 해더 부분 #}
    {% block page_header %}{% endblock %}

{% endblock %}

{# calendar 바디 부분 #}
{% block site_body %}
    
    {# calendar 각 페이지 바디 부분 #}
    {% block page_body_menu %}{% endblock %}
    {% block page_body %}{% endblock %}
    {% block page_body_footer %}{% endblock %}

{% endblock %}


{# calendar 푸터 부분 #}
{% block site_footer %}

    {# calendar 전체 적용 js #}
    <!--
    <script src="/.js"></script>
    <script src="/.js"></script>
    -->

    {# calendar 각 페이지 푸터 부분 #}
    {% block page_footer %}{% endblock %}

{% endblock %}