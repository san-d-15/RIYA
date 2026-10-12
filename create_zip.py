import os
import zipfile

def create_project_zip():
    output_zip_public = "public/medcare-pharmacy-project.zip"
    output_zip_root = "medcare-pharmacy-project.zip"
    
    # Ensure public directory exists
    os.makedirs("public", exist_ok=True)
    
    # Directories and files to include
    include_files = [
        "index.html",
        "login.html",
        "dashboard.html",
        "medicines.html",
        "categories.html",
        "suppliers.html",
        "customers.html",
        "sales.html",
        "purchases.html",
        "inventory.html",
        "expiry.html",
        "reports.html",
        "users.html",
        "settings.html",
        "backend-explorer.html",
        "README.md",
    ]
    
    include_dirs = [
        "css",
        "js",
        "assets",
        "public/assets",
        "database",
        "backend"
    ]
    
    # Exclude patterns
    exclude_patterns = [
        "__pycache__",
        ".git",
        "node_modules",
        ".DS_Store",
        ".zip",
        "target",
        ".class"
    ]
    
    def should_exclude(path):
        for pattern in exclude_patterns:
            if pattern in path:
                return True
        return False

    with zipfile.ZipFile(output_zip_public, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Add root files
        for f in include_files:
            if os.path.exists(f) and not should_exclude(f):
                zipf.write(f, arcname=os.path.join("medcare-pharmacy", f))
                print(f"Added file: {f}")
                
        # Add directories
        for d in include_dirs:
            if os.path.exists(d):
                for root, dirs, files in os.walk(d):
                    for file in files:
                        file_path = os.path.join(root, file)
                        if not should_exclude(file_path):
                            # Store in zip under medcare-pharmacy/
                            arcname = os.path.join("medcare-pharmacy", file_path)
                            zipf.write(file_path, arcname=arcname)
                            print(f"Added: {file_path}")

    # Copy to root as well
    import shutil
    shutil.copyfile(output_zip_public, output_zip_root)
    print(f"SUCCESS: Zip created at {output_zip_public} ({os.path.getsize(output_zip_public)} bytes)")

if __name__ == "__main__":
    create_project_zip()
