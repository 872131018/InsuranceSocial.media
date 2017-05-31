FROM nginx:latest

ADD ./default.conf /etc/nginx/conf.d/default.conf

ADD ./fastcgi_params /etc/nginx/fastcgi_params

ADD ./nginx.conf /etc/nginx/nginx.conf

CMD service nginx restart
