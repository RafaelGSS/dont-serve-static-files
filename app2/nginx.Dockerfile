FROM nginx
COPY public /www/data/public
COPY nginx.conf /etc/nginx/conf.d/default.conf
