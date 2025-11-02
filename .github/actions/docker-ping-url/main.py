import os
from time import sleep

import requests


def ping_url(
    url: str,
    max_trials: int = 10,
    delay: int = 5,
) -> bool:
    for _ in range(1, max_trials + 1):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"Success: Received 200 OK from {url}")
                return True
        except requests.ConnectionError as e:
            print(f"{url} is unreachable. Retrying in {delay} seconds...", e)
            sleep(delay)
        except requests.exceptions.MissingSchema as e:
            print(f"Invalid URL schema: {url}. Please check the URL format.", e)
            return False

    print(f"Failed: Could not reach {url} after {max_trials} attempts.")
    return False


def set_output(file_path: str, key: str, value: str) -> None:
    if not file_path:
        raise ValueError("GITHUB_OUTPUT environment variable is not set.")
    with open(file_path, "a") as f:
        # f.write(f"{key}={value}\n")
        print(f"{key}={value}", file=f)


def run() -> None:
    url: str = os.getenv("INPUT_URL", "https://www.example.com")
    max_trials = int(os.getenv("INPUT_MAX_TRIALS", "10"))
    delay = int(os.getenv("INPUT_DELAY", "5"))

    res = ping_url(url, max_trials=max_trials, delay=delay)

    set_output(os.getenv("GITHUB_OUTPUT", ""), "is_reachable", str(res).lower())

    if not res:
        raise Exception(f"{url} is unreachable after maximum trials.")


if __name__ == "__main__":
    print("I am a custom Docker github action for pinging a URL.")
    run()
