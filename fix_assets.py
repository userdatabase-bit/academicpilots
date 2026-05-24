import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# insert getAssetUrl near the top after imports
if "const getAssetUrl =" not in content:
    import_match = re.search(r'(import .*?;?\n)+', content)
    if import_match:
        end_idx = import_match.end()
        asset_fn = "\nconst getAssetUrl = (path: string) => {\n  const base = import.meta.env.BASE_URL || '/';\n  const cleanPath = path.startsWith('/') ? path.slice(1) : path;\n  return `${base}${cleanPath}`;\n};\n"
        content = content[:end_idx] + asset_fn + content[end_idx:]

# fix absolute paths in src=
content = re.sub(r'src="/(.*?[a-zA-Z0-9_.-]+)"', r'src={getAssetUrl("/\1")}', content)

# fix paths in MAP_LOCATIONS
content = re.sub(r"img:\s*'/images/(.*?)'", r"img: getAssetUrl('/images/\1')", content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
