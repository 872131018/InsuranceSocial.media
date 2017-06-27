<!DOCTYPE html>
<html lang="en">
<head>
    <title>Insurance Social Media</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <link href="//fonts.googleapis.com/css?family=Lato" type="text/css" rel="stylesheet">
    <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" rel="stylesheet">
    <link href="{{ url('stylesheets/setup.css') }}" type="text/css" rel="stylesheet">
    <!-- Apply base url so the JS can reference it -->
    <script>
        window.base_url = "{{ url('/') }}"
    </script>
</head>
<body>
    <div id="app">
        <App></App>
    </div>
    <!-- Footer -->
    <!--
    <footer class="w3-center w3-dark-grey w3-padding-24 w3-hover-black">
        <p>Powered by <a href="http://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" class="w3-hover-opacity">w3.css</a></p>
    </footer>
    -->
    <!-- Scripts -->
    <script type="text/javascript" src="{{ url('javascripts/setup.index.js') }}"></script>
    <script type="text/javascript" src="https://jstest.authorize.net/v1/Accept.js" charset="utf-8"></script>
</body>
</html>
