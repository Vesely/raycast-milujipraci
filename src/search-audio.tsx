import { ActionPanel, Action, List, showToast, Toast, getPreferenceValues, Clipboard, showHUD } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

interface AudioFile {
  id: string;
  title: string;
  filename: string;
  path: string;
}

// Example audio files - replace with your actual files later
const audioFiles: AudioFile[] = [
  {
    id: "1",
    title: "Example Audio 1",
    filename: "example1.mp3",
    path: path.join(__dirname, "..", "assets", "example1.mp3"),
  },
  {
    id: "2",
    title: "Example Audio 2",
    filename: "example2.mp3",
    path: path.join(__dirname, "..", "assets", "example2.mp3"),
  },
];

async function playAudio(audioPath: string) {
  try {
    // Use afplay on macOS to play the audio file
    await execAsync(`afplay "${audioPath}"`);
    await showHUD("? Playing audio");
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to play audio",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

async function pasteAudioFile(audioPath: string) {
  try {
    // Copy file path to clipboard and paste it
    await Clipboard.copy({ file: audioPath });
    await showHUD("? Audio file copied to clipboard");
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to paste audio file",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export default function Command() {
  return (
    <List searchBarPlaceholder="Search audio files...">
      {audioFiles.map((audio) => (
        <List.Item
          key={audio.id}
          title={audio.title}
          subtitle={audio.filename}
          icon="??"
          actions={
            <ActionPanel>
              <Action title="Play Audio" onAction={() => playAudio(audio.path)} />
              <Action title="Paste Audio File" onAction={() => pasteAudioFile(audio.path)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
