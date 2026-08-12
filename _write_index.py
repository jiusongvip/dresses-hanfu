import os

output_path = r'D:\workspaces\website\dresses-hanfu\site\src\pages\index.astro'

# Build the full index.astro content
lines = []
lines.append('---')
lines.append('import Layout from "../layouts/Layout.astro";')
lines.append('import "../styles/global.css";')
lines.append('---')
lines.append('<Layout')
lines.append('  title="Hanfu Dresses: The Complete Guide to Traditional Chinese Hanfu"')
lines.append('  description="Discover authentic Hanfu dresses: styles by dynasty, how-to-wear guides, outfit inspiration, and trusted buying recommendations. Your complete hanfu dress resource."')
lines.append('>')
lines.append('')
lines.append('  <!-- Navigation -->')
lines.append('  <nav class="nav" role="navigation" aria-label="Main navigation">')
lines.append('    <div class="nav-inner">')
lines.append('      <a href="/" class="nav-logo" aria-label="Hanfu Dress Guide home">Hanfu Dress Guide</a>')
lines.append('      <div class="nav-links">')
lines.append('        <a href="#styles">Styles</a>')
lines.append('        <a href="#dynasties">Dynasties</a>')
lines.append('        <a href="#how-to-wear">How to Wear</a>')
lines.append('        <a href="#vs">Comparisons</a>')
lines.append('        <a href="#buy">Buying Guide</a>')
lines.append('        <a href="#faq">FAQ</a>')
lines.append('      </div>')
lines.append('      <a href="#buy" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.875rem;">Shop Guide</a>')
lines.append('    </div>')
lines.append('  </nav>')
lines.append('')

with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f'Wrote {len(lines)} lines to {output_path}')
