import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const sourceDir = path.join(root, 'assets/xingshu-movie-brand')
const outDir = path.join(sourceDir, 'png')
await fs.mkdir(outDir, { recursive: true })

const appIcon = path.join(sourceDir, 'xingshu-movie-app-icon.svg')
const tvBanner = path.join(sourceDir, 'xingshu-movie-tv-banner.svg')

const iconSizes = [16, 32, 48, 64, 72, 96, 128, 144, 152, 167, 180, 192, 256, 384, 512, 1024]
for (const size of iconSizes) {
  await sharp(appIcon).resize(size, size).png().toFile(path.join(outDir, `xingshu-movie-icon-${size}.png`))
}

await sharp(tvBanner).resize(1280, 720).png().toFile(path.join(outDir, 'xingshu-movie-tv-banner-1280x720.png'))
await sharp(tvBanner).resize(320, 180).png().toFile(path.join(outDir, 'xingshu-movie-tv-banner-320x180.png'))

console.log(`Generated ${iconSizes.length + 2} XingShu Movie PNG assets.`)
