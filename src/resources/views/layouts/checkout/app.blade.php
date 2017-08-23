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
    <link href="{{ url('stylesheets/checkout.css') }}" type="text/css" rel="stylesheet">
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
    <script type="text/javascript">
        window.__lc = window.__lc || {};
        window.__lc.license = 6649691;
        (function() {
          var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
          lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
        })();
    </script>
    <!-- (c) 2005, 2017. Authorize.Net is a registered trademark of CyberSource Corporation -->
    <script type="text/javascript" language="javascript">var ANS_customer_id="1d45b387-8334-4d7a-9ae3-8f6788033392"</script>
    <script type="text/javascript" language="javascript" src="//verify.authorize.net/anetseal/seal.js" ></script>
    <script type="text/javascript" src="https://jstest.authorize.net/v1/Accept.js" charset="utf-8"></script>
    <script type="text/javascript" src="{{ url('javascripts/checkout.index.js') }}"></script>
</body>
</html>
