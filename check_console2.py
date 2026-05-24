import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Listen for all console events
        page.on("console", lambda msg: print(f"CONSOLE: {msg.type}: {msg.text}"))
        # Listen for uncaught exceptions
        page.on("pageerror", lambda err: print(f"ERROR: {err}"))

        # Track failed network requests
        page.on("requestfailed", lambda request: print(f"REQUEST FAILED: {request.url} - {request.failure.error_text}"))
        page.on("response", lambda response: print(f"RESPONSE FAILED: {response.url} - {response.status}") if not response.ok else None)

        print("Navigating to http://localhost:5173/academicpilots/...")
        await page.goto("http://localhost:5173/academicpilots/")
        await page.wait_for_timeout(5000)
        print("Page loaded.")

        await page.screenshot(path="preview_test2.png", full_page=True)
        print("Screenshot saved to preview_test2.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
