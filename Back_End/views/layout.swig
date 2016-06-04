<!DOCTYPE html>
<html lang="kor">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>CYO</title>

        <!-- Bootstrap Core CSS -->
		<link href="../public/css/bootstrap.min.css" rel="stylesheet">

		

		<!-- Custom Fonts -->
		<link href="../public/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

		<!-- Custom CSS -->
		<link href="../public/css/sb-admin.css" rel="stylesheet">
		
        {# 전체 페이지 해더 부분 #}
        {% block site_header %}{% endblock %}

    </head>

    <body>

        {# 전체 페이지 바디 부분 #}
        {% block site_body %}{% endblock %}

		<!-- jQuery -->
        <script src="../public/js/jquery.js"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="../public/js/bootstrap.min.js"></script>
        {# 전체 페이지 푸터 부분 #}
        {% block site_footer %}{% endblock %}

        

    </body>
    
</html>
