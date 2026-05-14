import sys
from playwright.sync_api import sync_playwright


def capture(url, output_path, viewport_width=1920, viewport_height=1080):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={"width": viewport_width, "height": viewport_height},
            bypass_csp=True,
        )
        # Disable HTTP cache to mimic a hard refresh.
        context.set_extra_http_headers({
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        })
        page = context.new_page()
        # Route handler to disable caching at the network level too.
        page.route("**/*", lambda route: route.continue_(headers={
            **route.request.headers,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
        }))
        page.goto(url, wait_until="networkidle")
        page.screenshot(path=output_path, full_page=False)
        browser.close()


if __name__ == "__main__":
    url = sys.argv[1]
    output_path = sys.argv[2]
    width = int(sys.argv[3]) if len(sys.argv) > 3 else 1920
    height = int(sys.argv[4]) if len(sys.argv) > 4 else 1080
    capture(url, output_path, width, height)
    print(f"Saved screenshot to {output_path}")
