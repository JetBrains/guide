### Testing Redirect Config using temporary NGINX Container

Run the following command

```bash
docker build -f Dockerfile-RebuildTemp -t redirect-test . && docker run --rm redirect-test
```

This is going to run an NGINX container with custom
configuration. If everything goes well, the container
will return success message and exit. Otherwise, it will
return an error message with exit code(1).
