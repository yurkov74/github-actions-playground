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
        except requests.RequestException as e:
            print(f"Error: {e}")
        sleep(delay)

    print(f"Failed: Could not reach {url} after {max_trials} attempts.")
    return False


def run() -> None:
    url = os.getenv("INPUT_URL", "https://www.example.com")
    max_trials = int(os.getenv("INPUT_MAX_TRIALS", "10"))
    delay = int(os.getenv("INPUT_DELAY", "5"))

    res = ping_url(url, max_trials=max_trials, delay=delay)

    if not res:
        exit(1)


if __name__ == "__main__":
    print("I am a custom Docker github action for pinging a URL.")
    run()
