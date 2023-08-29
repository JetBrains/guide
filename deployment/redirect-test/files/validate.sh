#!/bin/sh

# Validate the Nginx configuration
nginx -t -c /etc/nginx/nginx.conf

# Check the exit status of the validation command
if [ $? -eq 0 ]; then
    echo "Nginx configuration is valid. Starting Nginx..."
    nginx -g "daemon off;" &


    # Wait for Nginx to start
    sleep 2

    # Check if Nginx responds with a status code 200
    response_code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
    if [ "$response_code" -eq 200 ]; then
        echo "Nginx is responding with status code 200."
        exit 0
    else
        echo "Nginx is not responding with status code 200. Something might be wrong."
        exit 1
    fi
else
    echo "Nginx configuration is invalid. Exiting."
    exit 1
fi
