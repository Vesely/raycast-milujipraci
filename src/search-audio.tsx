import {
  ActionPanel,
  Action,
  List,
  showToast,
  Toast,
  Clipboard,
  showHUD,
  environment,
} from "@raycast/api";
import { exec, spawn, ChildProcess } from "child_process";
import { promisify } from "util";
import path from "path";
import { existsSync, accessSync, constants } from "fs";

const execAsync = promisify(exec);

// Track the current playing process
let currentAudioProcess: ChildProcess | null = null;

interface AudioFile {
  id: string;
  title: string;
  filename: string;
  path: string;
}

// Audio files from assets/audio directory
const audioFiles: AudioFile[] = [
  {
    id: "1",
    title: "Ani za kokot vole",
    filename: "ani-za-kokot-vole.mp3",
    path: path.join(environment.assetsPath, "audio", "ani-za-kokot-vole.mp3"),
  },
  {
    id: "2",
    title: "Do pice",
    filename: "do-pice.mp3",
    path: path.join(environment.assetsPath, "audio", "do-pice.mp3"),
  },
  {
    id: "3",
    title: "Hajzli jedni",
    filename: "hajzli-jedni.mp3",
    path: path.join(environment.assetsPath, "audio", "hajzli-jedni.mp3"),
  },
  {
    id: "4",
    title: "Hosi to je neuvěřitelné",
    filename: "hosi-to-je-neuveritelne.mp3",
    path: path.join(environment.assetsPath, "audio", "hosi-to-je-neuveritelne.mp3"),
  },
  {
    id: "5",
    title: "Já se z toho musím pojebat",
    filename: "ja-se-z-toho-musim-pojebat.mp3",
    path: path.join(environment.assetsPath, "audio", "ja-se-z-toho-musim-pojebat.mp3"),
  },
  {
    id: "6",
    title: "Já to mrdám",
    filename: "ja-to-mrdam.mp3",
    path: path.join(environment.assetsPath, "audio", "ja-to-mrdam.mp3"),
  },
  {
    id: "7",
    title: "Jedinou picovinku",
    filename: "jedinou-picovinku.mp3",
    path: path.join(environment.assetsPath, "audio", "jedinou-picovinku.mp3"),
  },
  {
    id: "8",
    title: "Jedu do pici stadyma",
    filename: "jedu-do-pici-stadyma.mp3",
    path: path.join(environment.assetsPath, "audio", "jedu-do-pici-stadyma.mp3"),
  },
  {
    id: "9",
    title: "Kurva do pice to není možné",
    filename: "kurva-do-pice-to-neni-mozne.mp3",
    path: path.join(environment.assetsPath, "audio", "kurva-do-pice-to-neni-mozne.mp3"),
  },
  {
    id: "10",
    title: "Kurva",
    filename: "kurva.mp3",
    path: path.join(environment.assetsPath, "audio", "kurva.mp3"),
  },
  {
    id: "11",
    title: "Nebudu to dělat",
    filename: "nebudu-to-delat.mp3",
    path: path.join(environment.assetsPath, "audio", "nebudu-to-delat.mp3"),
  },
  {
    id: "12",
    title: "Past vedle pasti pico",
    filename: "past-vedle-pasti-pico.mp3",
    path: path.join(environment.assetsPath, "audio", "past-vedle-pasti-pico.mp3"),
  },
  {
    id: "13",
    title: "To je pico nemožné",
    filename: "to-je-pico-nemozne.mp3",
    path: path.join(environment.assetsPath, "audio", "to-je-pico-nemozne.mp3"),
  },
  {
    id: "14",
    title: "To není normální kurva",
    filename: "to-neni-normalni-kurva.mp3",
    path: path.join(environment.assetsPath, "audio", "to-neni-normalni-kurva.mp3"),
  },
  {
    id: "15",
    title: "To sou nervy ty pico",
    filename: "to-sou-nervy-ty-pico.mp3",
    path: path.join(environment.assetsPath, "audio", "to-sou-nervy-ty-pico.mp3"),
  },
  // Extra audio files
  {
    id: "16",
    title: "Abych mohl toto",
    filename: "extra/abych-mohl-toto.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "abych-mohl-toto.mp3"),
  },
  {
    id: "17",
    title: "Ani očko nenasadíš",
    filename: "extra/ani-ocko-nenasadis.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "ani-ocko-nenasadis.mp3"),
  },
  {
    id: "18",
    title: "Banální věc",
    filename: "extra/banalni-vec.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "banalni-vec.mp3"),
  },
  {
    id: "19",
    title: "Já to nejdu dělat",
    filename: "extra/ja-to-nejdu-delat.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "ja-to-nejdu-delat.mp3"),
  },
  {
    id: "20",
    title: "Kurva už",
    filename: "extra/kurva-uz.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "kurva-uz.mp3"),
  },
  {
    id: "21",
    title: "Ne nenasadíš ho",
    filename: "extra/ne-nenasadis-ho.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "ne-nenasadis-ho.mp3"),
  },
  {
    id: "22",
    title: "Největší blbec na zeměkouli",
    filename: "extra/nejvetsi-blbec-na-zemekouli.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "nejvetsi-blbec-na-zemekouli.mp3"),
  },
  {
    id: "23",
    title: "Nenasadím",
    filename: "extra/nenasadim.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "nenasadim.mp3"),
  },
  {
    id: "24",
    title: "Neřešitelný problém hoši",
    filename: "extra/neresitelny-problem-hosi.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "neresitelny-problem-hosi.mp3"),
  },
  {
    id: "25",
    title: "Nevím jak",
    filename: "extra/nevim-jak.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "nevim-jak.mp3"),
  },
  {
    id: "26",
    title: "Okamžitě zabít ty kurvy",
    filename: "extra/okamzite-zabit-ty-kurvy.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "okamzite-zabit-ty-kurvy.mp3"),
  },
  {
    id: "27",
    title: "Počkej kámo",
    filename: "extra/pockej-kamo.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "pockej-kamo.mp3"),
  },
  {
    id: "28",
    title: "Tady musíš všechno rozděláat",
    filename: "extra/tady-musis-vsechno-rozdelat.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "tady-musis-vsechno-rozdelat.mp3"),
  },
  {
    id: "29",
    title: "Tuto picu potřebuju utáhnout",
    filename: "extra/tuto-picu-potrebuju-utahnout.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "tuto-picu-potrebuju-utahnout.mp3"),
  },
  {
    id: "30",
    title: "Zasraně zamrdané",
    filename: "extra/zasrane-zamrdane.mp3",
    path: path.join(environment.assetsPath, "audio", "extra", "zasrane-zamrdane.mp3"),
  },
];

async function playAudio(audioPath: string) {
  try {
    // Check if file exists
    if (!existsSync(audioPath)) {
      await showToast({
        style: Toast.Style.Failure,
        title: "File not found",
        message: `Audio file not found at: ${audioPath}`,
      });
      return;
    }

    // Check if file is readable
    try {
      accessSync(audioPath, constants.R_OK);
    } catch (accessError) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Cannot read file",
        message: `File exists but is not readable: ${audioPath}`,
      });
      return;
    }

    // Stop any currently playing audio
    if (currentAudioProcess) {
      currentAudioProcess.kill();
      currentAudioProcess = null;
    }

    // Use afplay on macOS to play the audio file
    // Use spawn instead of exec so we can track and kill the process
    currentAudioProcess = spawn("afplay", [audioPath], {
      detached: false,
    });

    // Handle process completion
    currentAudioProcess.on("close", () => {
      currentAudioProcess = null;
    });

    currentAudioProcess.on("error", async (error) => {
      currentAudioProcess = null;
      // Fallback to 'open' command if afplay fails
      try {
        const escapedPath = audioPath.replace(/"/g, '\\"');
        await execAsync(`open "${escapedPath}"`);
        await showHUD("▶️ Playing audio");
      } catch (openError) {
        throw error;
      }
    });

    await showHUD("▶️ Playing audio");
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to play audio",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

async function stopAudio() {
  try {
    if (currentAudioProcess) {
      currentAudioProcess.kill();
      currentAudioProcess = null;
      await showHUD("⏹️ Stopped audio");
    } else {
      // Try to kill any afplay processes as fallback
      await execAsync("pkill afplay");
      await showHUD("⏹️ Stopped audio");
    }
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to stop audio",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

async function pasteAudioFile(audioPath: string) {
  try {
    // Copy file path to clipboard and paste it
    await Clipboard.copy({ file: audioPath });
    await showHUD("✅ Audio file copied to clipboard");
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
          icon="🎵"
          actions={
            <ActionPanel>
              <Action title="Play Audio" onAction={() => playAudio(audio.path)} />
              <Action
                title="Stop Audio"
                onAction={() => stopAudio()}
                shortcut={{ modifiers: ["cmd"], key: "." }}
              />
              <Action title="Paste Audio File" onAction={() => pasteAudioFile(audio.path)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
