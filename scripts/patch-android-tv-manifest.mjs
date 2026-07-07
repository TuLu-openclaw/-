import fs from 'node:fs'

const manifest = 'src-tauri/gen/android/app/src/main/AndroidManifest.xml'

if (!fs.existsSync(manifest)) {
  console.log(`Android manifest not found at ${manifest}; skipping TV hints.`)
  process.exit(0)
}

let text = fs.readFileSync(manifest, 'utf8')

if (!text.includes('android.software.leanback')) {
  text = text.replace(
    /<manifest([^>]*)>/,
    '<manifest$1>\n    <uses-feature android:name="android.software.leanback" android:required="false" />\n    <uses-feature android:name="android.hardware.touchscreen" android:required="false" />'
  )
}

if (!text.includes('android.intent.category.LEANBACK_LAUNCHER')) {
  text = text.replace(
    /<category android:name="android.intent.category.LAUNCHER"\s*\/>/,
    '<category android:name="android.intent.category.LAUNCHER" />\n                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />'
  )
}

fs.writeFileSync(manifest, text)
console.log('Applied Android TV manifest hints.')
