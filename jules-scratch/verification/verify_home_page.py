from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto('http://localhost:8000')

        # Wait for the tournaments to load
        expect(page.locator('#tournaments-container .tournament-card')).to_have_count(2, timeout=20000)

        # Wait for the videos to load
        expect(page.locator('#videos-container .glass')).to_have_count(1, timeout=20000)

        page.screenshot(path='jules-scratch/verification/verification.png')
        browser.close()

if __name__ == '__main__':
    run()
