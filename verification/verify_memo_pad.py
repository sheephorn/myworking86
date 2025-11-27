from playwright.sync_api import sync_playwright, expect

def verify_drawing_canvas():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to trigger the desktop layout
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Navigate to the app
        print("Navigating to app...")
        page.goto("http://localhost:5173")

        # Wait for the welcome screen to load completely
        print("Waiting for welcome screen...")
        try:
            page.wait_for_selector("h1", timeout=10000)
            print("Found h1")
        except Exception as e:
            print(f"Error waiting for h1: {e}")
            page.screenshot(path="verification/error_screenshot.png")
            print("Saved error screenshot")
            raise

        # Start the game (Level 1 1-digit addition)
        print("Clicking 1ねんせい...")
        try:
            # Try a broader selector if text fails, or debug page content
            page.get_by_role("button", name="1ねんせい").click()
        except Exception as e:
            print(f"Failed to click 1ねんせい: {e}")
            page.screenshot(path="verification/error_click_1.png")
            # Dump page content to see what's rendered
            with open("verification/page_dump.html", "w") as f:
                f.write(page.content())
            raise

        print("Clicking たしざん・ひきざん...")
        # Updated name based on src/constants.ts
        page.get_by_role("button", name="たしざん・ひきざん").click()

        # Verify we are on the quiz screen
        print("Waiting for quiz screen...")
        expect(page.get_by_text("もんだい")).to_be_visible()

        # Verify the drawing canvas exists (it's in the right column on desktop)
        print("Checking for canvas...")
        canvas_container = page.locator("div.hidden.lg\\:block")
        expect(canvas_container).to_be_visible()
        expect(page.get_by_text("けいさん用紙")).to_be_visible()

        # Simulate drawing on the canvas
        print("Drawing...")
        canvas = page.locator("canvas")
        box = canvas.bounding_box()

        if box:
            page.mouse.move(box['x'] + 50, box['y'] + 50)
            page.mouse.down()
            page.mouse.move(box['x'] + 150, box['y'] + 150)
            page.mouse.move(box['x'] + 250, box['y'] + 50)
            page.mouse.up()

        # Take a screenshot
        page.screenshot(path="verification/quiz_memo_pad.png")

        print("Verification complete. Screenshot saved to verification/quiz_memo_pad.png")
        browser.close()

if __name__ == "__main__":
    verify_drawing_canvas()
