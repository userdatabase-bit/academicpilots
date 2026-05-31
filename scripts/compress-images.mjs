/**
 * Compress oversized original images in place using sharp.
 *
 * The build-time optimize-images.mjs script already creates WebP + srcset variants,
 * but the ORIGINAL files (like europe.jpg at 5.1 MB) are still served as fallback.
 *
 * This script compresses the originals to ~80-85 quality,
 * drastically reducing their size with minimal visual difference.
 *
 * Run:  node scripts/compress-images.mjs
 * Run via build:  npm run build  (added as a prebuild step)
 */

import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname, parse } from 'node:path';
import sharp from 'sharp';

const IMAGE_DIR = join(import.meta.dirname, '..', 'public', 'images');
const SIZE_THRESHOLD = 200 * 1024; // only compress files > 200 KB
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log('\n  🖼  Compressing Large Originals\n');

  const files = await readdir(IMAGE_DIR);
  const imageFiles = files.filter((f) => {
    const ext = extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('  No images to compress.\n');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let compressedCount = 0;
  let skippedCount = 0;

  for (const file of imageFiles) {
    const filePath = join(IMAGE_DIR, file);
    const { name, ext } = parse(file);
    const extLower = ext.toLowerCase();
    const fileStat = await stat(filePath);

    // Skip small files
    if (fileStat.size < SIZE_THRESHOLD) {
      skippedCount++;
      continue;
    }

    totalBefore += fileStat.size;

    process.stdout.write(`  ⚙  ${file}  (${formatBytes(fileStat.size)})  →  `);

    let buffer;
    if (extLower === '.png') {
      buffer = await sharp(filePath)
        .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
        .toBuffer();
    } else {
      buffer = await sharp(filePath)
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();
    }

    // Write compressed version
    await sharp(buffer).toFile(filePath + '.compressed' + ext);
    
    const newSize = (await stat(filePath + '.compressed' + ext)).size;
    
    // Only replace if actually smaller
    if (newSize < fileStat.size) {
      await unlink(filePath);
      await rename(filePath + '.compressed' + ext, filePath);
      totalAfter += newSize;
      const saved = fileStat.size - newSize;
      const pct = ((1 - newSize / fileStat.size) * 100).toFixed(1);
      process.stdout.write(`${formatBytes(newSize)}  (${pct}% saved)\n`);
      compressedCount++;
    } else {
      // Remove temp file
      await unlink(filePath + '.compressed' + ext);
      totalAfter += fileStat.size;
      process.stdout.write(`skipped (no gain)\n`);
      skippedCount++;
    }
  }

  const saved = totalBefore - totalAfter;
  const pct = totalBefore > 0 ? ((1 - totalAfter / totalBefore) * 100).toFixed(1) : '0.0';

  console.log(`\n  ─────────────────────────────────`);
  console.log(`  Before:     ${formatBytes(totalBefore)}`);
  console.log(`  After:      ${formatBytes(totalAfter)}`);
  console.log(`  Saved:      ${formatBytes(Math.max(0, saved))}  (${pct}% reduction)`);
  console.log(`  Compressed: ${compressedCount} files`);
  console.log(`  Skipped:    ${skippedCount} files\n`);
}

main().catch((err) => {
  console.error('  Error:', err.message);
  process.exit(1);
});
