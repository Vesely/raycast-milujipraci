# Miluju svoj? pr?ci! - Raycast Extension

A simple Raycast extension for searching and playing audio files.

## Features

- ?? Search through audio files
- ?? Play audio files directly from Raycast (default action)
- ?? Copy audio file to clipboard for pasting

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Run in development mode:
   ```bash
   yarn dev
   ```

## Usage

1. Open Raycast
2. Search for "Search Audio Files"
3. Type to search through your audio files
4. Press Enter to play the audio file
5. Use the action menu to paste the audio file instead

## Adding Your Audio Files

Replace the example mp3 files in the `assets/` directory with your own audio files. Then update the `audioFiles` array in `src/search-audio.tsx` with your file information.

## Development

- `yarn dev` - Run the extension in development mode
- `yarn build` - Build the extension
- `yarn lint` - Lint the code
- `yarn fix-lint` - Fix linting issues

## License

MIT
