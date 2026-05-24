import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# insert getAssetUrl near the top after imports (specifically after gsap.registerPlugin)
insert_point = "gsap.registerPlugin(ScrollTrigger);"
if insert_point in content and "const getAssetUrl =" not in content:
    asset_fn = "\n\nconst getAssetUrl = (path: string) => {\n  const base = import.meta.env.BASE_URL || '/';\n  const cleanPath = path.startsWith('/') ? path.slice(1) : path;\n  return `${base}${cleanPath}`;\n};\n"
    content = content.replace(insert_point, insert_point + asset_fn)

# fix absolute paths in src=
content = re.sub(r'src="/(.*?[a-zA-Z0-9_.-]+)"', r'src={getAssetUrl("/\1")}', content)

# fix paths in MAP_LOCATIONS
content = re.sub(r"img:\s*'/images/(.*?)'", r"img: getAssetUrl('/images/\1')", content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
