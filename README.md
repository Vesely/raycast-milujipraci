# Miluju svojí práci!

A Raycast extension for searching and playing audio files.

## Features

- 🔍 Search through audio files by name
- ▶️ Play audio files directly (default action on Enter)
- 📋 Paste file path to clipboard (secondary action)

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Add your MP3 files to the `audio/` directory:
   - Replace `example1.mp3` and `example2.mp3` with your actual audio files
   - You can add as many MP3 files as you want

3. Run in development mode:
```bash
yarn dev
```

## Usage

1. Open Raycast
2. Type "Search Audio Files" or your configured command
3. Search for audio files by name
4. Press `Enter` to play the audio file
5. Press `⌘ + Enter` to paste the file path

## Directory Structure

```
.
├── audio/              # Place your MP3 files here
├── assets/            # Extension icons
├── src/               # Source code
│   └── search-audio.tsx
├── package.json
└── tsconfig.json
```

## Notes

- The extension uses `afplay` (built-in macOS command) to play audio files
- Audio files must be in MP3 format
- Files are loaded from the `audio/` directory within the extension
