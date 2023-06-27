from typing import List


def old_urls() -> List[str]:
    return [
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/installation-and-setup/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/your-first-project/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/understanding-the-ui/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/customizing-the-ui/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/configuring-local-python-interpreter/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/configuring-remote-python-interpreter/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/installing-and-managing-python-packages/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/basic-code-assistance/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/run-python-using-a-run-configuration/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/basic-code-refactoring/",
        "https://www.jetbrains.com/pycharm/guide/tutorials/getting-started-pycharm/basic-code-debugging/",

    ]


NEW_URLS = {
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/installation-and-setup': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/your-first-project': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/understanding-the-ui': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/customizing-the-ui': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/configuring-local-python-interpreter': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/configuring-remote-python-interpreter': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/installing-and-managing-python-packages': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/basic-code-assistance': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/run-python-using-a-run-configuration': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/basic-code-refactoring': True,
    'https://jetbrains.com/guide/pycharm/tutorials/getting-started-pycharm/basic-code-debugging': True,
}


def check_new_url_key(dic, key) -> bool:
    if dic.get(key, None):
        return True
    else:
        return False



