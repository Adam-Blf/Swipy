from playwright.sync_api import sync_playwright
import os

# Create screenshots directory
os.makedirs('screenshots', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={'width': 390, 'height': 844},
        device_scale_factor=2
    )
    page = context.new_page()

    # Try port 5178 first (new server), fallback to 5173
    port = 5178

    # 1. Welcome page
    print("Capturing Welcome page...")
    page.goto(f'http://localhost:{port}/welcome')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='screenshots/01_welcome_blue.png', full_page=True)
    print("[OK] Welcome captured")

    # Skip onboarding
    page.evaluate('''() => {
        localStorage.setItem('genius_onboarding_complete', 'true');
        localStorage.setItem('hasSeenOnboarding', 'true');
    }''')

    # 2. Home page
    print("Capturing Home page...")
    page.goto(f'http://localhost:{port}/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='screenshots/02_home_blue.png', full_page=True)
    print("[OK] Home captured")

    # 3. FunFacts page
    print("Capturing FunFacts page...")
    page.goto(f'http://localhost:{port}/funfacts')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='screenshots/03_funfacts_blue.png', full_page=True)
    print("[OK] FunFacts captured")

    # 4. Profile page
    print("Capturing Profile page...")
    page.goto(f'http://localhost:{port}/profile')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='screenshots/04_profile_blue.png', full_page=True)
    print("[OK] Profile captured")

    # 5. Learn page
    print("Capturing Learn page...")
    page.goto(f'http://localhost:{port}/learn')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='screenshots/05_learn_blue.png', full_page=True)
    print("[OK] Learn captured")

    browser.close()
    print("\nAll Blue Edition screenshots captured!")
