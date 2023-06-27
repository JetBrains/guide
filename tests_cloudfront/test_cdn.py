import json

import boto3
import pytest

from .jb_urls_list import old_urls, NEW_URLS, check_new_url_key

client = boto3.client('cloudfront')
FUNCTION_NAME = "RedirectFunction"
FUNCTION_STAGE = "DEVELOPMENT"
response = client.describe_function(
    Name=FUNCTION_NAME,
    Stage=FUNCTION_STAGE
)


def retrieve_etag():
    data = client.describe_function(
        Name=FUNCTION_NAME,
        Stage=FUNCTION_STAGE
    )
    return data['ETag']


@pytest.mark.parametrize("guide_url", old_urls())
def test_redirect_feature(guide_url):
    event = '{"version": "1.0","context": {"eventType": "viewer-request"},' \
            '"viewer": {"ip": "1.2.3.4"}, ' \
            '"request": {"method": "GET", ' \
            '"uri": "' + guide_url + '", "headers": {}, "cookies": {}, "querystring": {}}}'
    result = client.test_function(
        Name=FUNCTION_NAME,
        IfMatch=retrieve_etag(),
        Stage=FUNCTION_STAGE,
        EventObject=event.encode('utf-8')
    )
    function_output = result["TestResult"]["FunctionOutput"]
    function_output = json.loads(function_output)
    output_url = function_output["response"]["headers"]["location"]["value"]
    assert True is check_new_url_key(NEW_URLS, output_url)
