<!DOCTYPE html>
<html lang="en">
<head>
    <title>Insurance Social Media</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="api-token" content="{{ $api_token }}">
    <link href="//fonts.googleapis.com/css?family=Lato" type="text/css" rel="stylesheet">
    <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" rel="stylesheet">
    <link href="{{ url('stylesheets/user.css') }}" type="text/css" rel="stylesheet">
    <style>
        *:not('fa') {
            font-family:Roboto !important;
        }
    </style>
    <!-- Apply base url so the JS can reference it -->
    <script>
        window.base_url = "{{ env('APP_URL') }}"
    </script>
</head>
<body>
    <div id="app">
        <App></App>
    </div>
    <!-- Scripts -->
    <script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
    <script type="text/javascript" src="{{ url('javascripts/user.index.js') }}"></script>
</body>
</html>
