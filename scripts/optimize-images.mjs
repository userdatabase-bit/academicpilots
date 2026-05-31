/**
 * Build-time image optimization script.
 *
 * For each image in public/images/:
 *  1. Creates a WebP version at original resolution
 *  2. Creates WebP srcset variants at 400w, 800w, 1200w
 *  3. Creates JPEG srcset variants at 400w, 800w, 1200w (for browsers without WebP)
 *
 * Run via:  npm run optimize-images
 * Or automatically via:  npm run build  (runs as prebuild)
 */

import { readdir, stat, unlink } from 'node:fs/promises';
import { join, parse, extname } from 'node:path';
import sharp from 'sharp';

const IMAGE_DIR = join(import.meta.dirname, '..', 'public', 'images');
const SRC_SET_SIZES = [400, 800, 1200];
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Track deletions/stats so we can report clearly
let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let generatedCount = 0;
let cleanedCount = 0;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function cleanOldVariants(basePath, name) {
  const files = await readdir(basePath);
  const patterns = [
    new RegExp(`^${escapeRegex(name)}-\\d+w\\.(webp|jpg|jpeg|png)$`),
  ];
  for (const file of files) {
    for (const pattern of patterns) {
      if (pattern.test(file)) {
        await unlink(join(basePath, file));
        cleanedCount++;
        break;
      }
    }
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function optimizeImage(filePath) {
  const { name, ext } = parse(filePath);
  const basePath = parse(filePath).dir;
  const extLower = ext.toLowerCase();

  if (!SUPPORTED_EXTENSIONS.includes(extLower)) return;

  const originalStat = await stat(filePath);
  totalOriginalSize += originalStat.size;

  // Clean any previously generated variants for this image
  await cleanOldVariants(basePath, name);

  // 1. WebP at original resolution
  const webpPath = join(basePath, `${name}.webp`);
  await sharp(filePath)
    .webp({ quality: 80, effort: 6 })
    .toFile(webpPath);
  generatedCount++;

  // 2. WebP + original-format srcset variants
  for (const width of SRC_SET_SIZES) {
    // Skip if the original is smaller than this variant — no point upscaling
    if (originalStat.size > 0 && width > originalStat.size * 0.001) {
      // We don't know the actual pixel width, so check by reading metadata
      const meta = await sharp(filePath).metadata();
      const originalWidth = meta.width || 9999;
      if (width >= originalWidth) continue; // don't upscale
    }

    // WebP variant
    await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(join(basePath, `${name}-${width}w.webp`));
    generatedCount++;

    // Original-format variant (JPEG or PNG)
    if (extLower === '.png') {
      await sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(join(basePath, `${name}-${width}w.png`));
      generatedCount++;
    } else {
      await sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(join(basePath, `${name}-${width}w.jpg`));
      generatedCount++;
    }
  }

  // Accumulate optimized sizes
  const dir = await readdir(basePath);
  for (const f of dir) {
    if (f.startsWith(name + '-') || f === `${name}.webp`) {
      const s = await stat(join(basePath, f));
      totalOptimizedSize += s.size;
    }
  }
}

async function main() {
  console.log('\n  🖼  Image Optimization\n');

  const files = await readdir(IMAGE_DIR);
  const imageFiles = files.filter((f) =>
    SUPPORTED_EXTENSIONS.includes(extname(f).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.log('  No images to optimize.\n');
    return;
  }

  console.log(`  Found ${imageFiles.length} images to process\n`);

  for (const file of imageFiles) {
    const filePath = join(IMAGE_DIR, file);
    const { name, ext } = parse(file);
    process.stdout.write(`  ⚙  ${name}${ext}  →  generating variants...`);
    await optimizeImage(filePath);
    process.stdout.write(' done\n');
  }

  const saved = totalOriginalSize - totalOptimizedSize;
  const pct = totalOriginalSize > 0
    ? ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)
    : '0.0';

  console.log(`\n  ─────────────────────────────────`);
  console.log(`  Before:     ${formatBytes(totalOriginalSize)}`);
  console.log(`  After:      ${formatBytes(totalOptimizedSize)}`);
  console.log(`  Saved:      ${formatBytes(Math.max(0, saved))}  (${pct}% reduction)`);
  console.log(`  Generated:  ${generatedCount} new files`);
  console.log(`  Cleaned:    ${cleanedCount} old variants\n`);
}

main().catch((err) => {
  console.error('  Error:', err.message);
  process.exit(1);
});
