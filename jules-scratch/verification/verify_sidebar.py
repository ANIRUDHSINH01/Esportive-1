from playwright.sync_api import sync_playwright, TimeoutError

def on_console(msg):
    print(f"CONSOLE: {msg.text}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.on("console", on_console)
    page.set_viewport_size({"width": 375, "height": 667})
    try:
        page.goto("http://localhost:5173/")
        page.wait_for_selector("#menu-toggle", timeout=10000) # shorter timeout
        page.click("#menu-toggle")
        page.screenshot(path="jules-scratch/verification/sidebar_open.png")
        page.click("text=Contact Us")
        page.screenshot(path="jules-scratch/verification/sidebar_closed.png")
    except TimeoutError as e:
        print(f"TimeoutError: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()