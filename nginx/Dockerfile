FROM nginx:latest

ADD ./default.conf /etc/nginx/conf.d/default.conf

ADD ./fastcgi_params /etc/nginx/fastcgi_params

ADD ./nginx.conf /etc/nginx/nginx.conf

ADD ./self-signed.conf /etc/nginx/self-signed.conf

ADD ./ssl-params.conf /etc/nginx/ssl-params.conf

ADD ./certs/dhparam.pem /etc/ssl/certs/dhparam.pem

ADD ./certs/nginx-selfsigned.crt /etc/ssl/certs/nginx-selfsigned.crt

ADD ./certs/nginx-selfsigned.key /etc/ssl/private/nginx-selfsigned.key

CMD service nginx restart
