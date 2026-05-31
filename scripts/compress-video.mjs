/**
 * Compress the hero background video for faster loading.
 *
 * Uses ffmpeg (via @ffmpeg-installer/ffmpeg) to re-encode temphero.mp4
 * at a lower bitrate while keeping good visual quality for a background video.
 *
 * Run:  node scripts/compress-video.mjs
 */

import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log('\n  🎥  Video Compression\n');

  const inputPath = join(projectRoot, 'public', 'videos', 'temphero.mp4');
  const tmpPath = join(projectRoot, 'public', 'videos', 'temphero-compressed.mp4');

  // Check input
  let inputSize;
  try {
    inputSize = statSync(inputPath).size;
    console.log(`  Input:   temphero.mp4  (${formatBytes(inputSize)})`);
  } catch {
    console.error('  ✖  Input video not found at public/videos/temphero.mp4');
    process.exit(1);
  }

  // Locate ffmpeg
  let ffmpegPath;
  try {
    const installer = await import('@ffmpeg-installer/ffmpeg');
    ffmpegPath = installer.default.path;
  } catch {
    // Try to find ffmpeg on PATH
    try {
      ffmpegPath = execSync('where ffmpeg', { encoding: 'utf8', timeout: 5000 }).trim().split('\n')[0];
    } catch {
      console.error('  ✖  ffmpeg not found. Install @ffmpeg-installer/ffmpeg: npm install --save-dev @ffmpeg-installer/ffmpeg');
      process.exit(1);
    }
  }

  console.log(`  Using:   ${ffmpegPath}\n`);

  // Compress with ffmpeg:
  // - libx264 codec (universal compatibility)
  // - CRF 28 (good quality/size tradeoff for background video)
  // - preset veryslow (better compression ratio)
  // - Reduce max rate to keep file small
  console.log('  ⚙  Compressing... (this may take a minute)\n');

  const cmd = `"${ffmpegPath}" -y -i "${inputPath}" -c:v libx264 -crf 28 -preset veryslow -tune film -profile:v baseline -level 3.0 -movflags +faststart -an "${tmpPath}"`;

  try {
    execSync(cmd, { encoding: 'utf8', timeout: 120000, stdio: 'pipe' });
  } catch (err) {
    console.error('  ✖  Compression failed:', err.stderr || err.message);
    process.exit(1);
  }

  const outputSize = statSync(tmpPath).size;
  const saved = inputSize - outputSize;
  const pct = ((1 - outputSize / inputSize) * 100).toFixed(1);

  console.log(`  ─────────────────────────────────`);
  console.log(`  Before:  ${formatBytes(inputSize)}`);
  console.log(`  After:   ${formatBytes(outputSize)}`);
  console.log(`  Saved:   ${formatBytes(Math.max(0, saved))}  (${pct}% reduction)\n`);

  // Replace original with compressed
  // First backup the original
  const backupPath = join(projectRoot, 'public', 'videos', 'temphero-original.mp4');
  try {
    const { renameSync } = await import('node:fs');
    renameSync(inputPath, backupPath);
    renameSync(tmpPath, inputPath);
    console.log('  ✅  Original backed up to temphero-original.mp4');
    console.log('  ✅  Compressed video saved to temphero.mp4\n');
  } catch (err) {
    console.error('  ✖  Failed to replace video:', err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('  Error:', err.message);
  process.exit(1);
});
