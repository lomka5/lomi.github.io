import os
import sys

def check_file_exists(path):
    if not os.path.exists(path):
        print(f"ERROR: File not found: {path}")
        return False
    else:
        print(f"OK: {path}")
        return True

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    print("Validating Lomi website files...")

    # Check index.html
    index_path = os.path.join(base_dir, 'index.html')
    if not check_file_exists(index_path):
        sys.exit(1)

    # Check style.css
    css_path = os.path.join(base_dir, 'style.css')
    if not check_file_exists(css_path):
        sys.exit(1)

    # Check script.js
    js_path = os.path.join(base_dir, 'script.js')
    if not check_file_exists(js_path):
        sys.exit(1)

    # Check assets directory
    assets_dir = os.path.join(base_dir, 'assets')
    if not os.path.isdir(assets_dir):
        print(f"ERROR: Assets directory not found: {assets_dir}")
        sys.exit(1)
    else:
        print(f"OK: Assets directory exists: {assets_dir}")

    # Check required asset files
    required_assets = [
        'favicon.svg',
        'telegram.svg',
        'github.svg',
        'youtube.svg',
        'steam.svg'
    ]

    for asset in required_assets:
        asset_path = os.path.join(assets_dir, asset)
        if not check_file_exists(asset_path):
            sys.exit(1)

    # Check that index.html references the correct files (simple string check)
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check for favicon
    if 'assets/favicon.svg' not in content:
        print("WARNING: index.html does not reference assets/favicon.svg")
    else:
        print("OK: index.html references favicon.svg")

    # Check for stylesheet
    if 'style.css' not in content:
        print("WARNING: index.html does not reference style.css")
    else:
        print("OK: index.html references style.css")

    # Check for script
    if 'script.js' not in content:
        print("WARNING: index.html does not reference script.js")
    else:
        print("OK: index.html references script.js")

    # Check that script.js references the assets correctly (for images)
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()

    for asset in required_assets:
        if asset == 'favicon.svg':
            # Favicon is referenced in HTML, not JS
            continue
        # The script uses assets/${platform.name}.svg for social icons
        # We'll check that the string "assets/" appears and the asset names are there in the socialMedia array
        # We'll do a simple check: if the asset name (without .svg) is in the JS content
        name = asset.replace('.svg', '')
        if name in js_content:
            print(f"OK: script.js references {asset}")
        else:
            print(f"WARNING: script.js may not reference {asset}")

    print("\nValidation completed.")
    print("Note: This is a basic validation and does not guarantee the site works correctly.")
    print("Please test the site in a browser to ensure functionality.")

if __name__ == '__main__':
    main()