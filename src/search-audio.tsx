import { Action, ActionPanel, Icon, List, showToast, Toast } from "@raycast/api";
import React, { useEffect, useState } from "react";
import { readdirSync } from "fs";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface AudioFile {
  name: string;
  path: string;
}

export default function Command() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadAudioFiles();
  }, []);

  async function loadAudioFiles() {
    try {
      // Get the extension's audio directory
      const audioDir = join(__dirname, "..", "audio");
      const files = readdirSync(audioDir);

      const audioFiles = files
        .filter((file) => file.endsWith(".mp3"))
        .map((file) => ({
          name: file.replace(".mp3", ""),
          path: join(audioDir, file),
        }));

      setAudioFiles(audioFiles);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to load audio files",
        message: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function playAudio(audioPath: string) {
    try {
      await showToast({
        style: Toast.Style.Animated,
        title: "Playing audio...",
      });

      // Use afplay on macOS to play audio
      await execAsync(`afplay "${audioPath}"`);

      await showToast({
        style: Toast.Style.Success,
        title: "Audio playback finished",
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to play audio",
        message: String(error),
      });
    }
  }

  const filteredFiles = audioFiles.filter((file) => file.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search audio files..."
      throttle
    >
      {filteredFiles.map((file) => (
        <List.Item
          key={file.path}
          title={file.name}
          subtitle={file.path}
          icon={Icon.Music}
          actions={
            <ActionPanel>
              <Action title="Play Audio" icon={Icon.Play} onAction={() => playAudio(file.path)} />
              <Action.Paste title="Paste File Path" content={file.path} icon={Icon.Clipboard} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
