FROM php:7.1-fpm

RUN apt-get update && apt-get install -y libmcrypt-dev mysql-client supervisor && \
    docker-php-ext-install mcrypt pdo_mysql

ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD supervisord -c /etc/supervisor/supervisord.conf && \
    supervisorctl -c /etc/supervisor/supervisord.conf
