function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var uri = event["request"]["uri"]
    //var BASE_URL = "https://d11nedkd3onyk7.cloudfront.net/jetbrains/guide/"
    var BASE_URL = "https://jetbrains.com/guide/"
    var JB_PRODUCTS = {
        "pycharm": "pycharm",
        "goland": "goland",
        "webstorm": "webstorm"
    }

    uri = uri.replace(/^.*\/\/[^\/]+/, '') // remove domain name.

    var data = uri.split("/")
    data = data.filter((str) => str !== '');


    var product_name = data[0].toLowerCase();
    if (data.length > 0) {
        if (JB_PRODUCTS[product_name]) {
            var new_formed_url = data.slice(2);
            new_formed_url = new_formed_url.join("/");
            var final_url = BASE_URL + JB_PRODUCTS[product_name] + "/" + new_formed_url;
            var response = {
                statusCode: 301,
                statusDescription: 'Found',
                headers: {
                    "location": {
                        "value": final_url
                    }
                }
            }
            return response;

        } else {
            return request;
        }
    } else {
        return request;
    }

}