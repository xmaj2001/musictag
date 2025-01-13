import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import NodeID3 from 'node-id3'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    width: 1024,
    height: 700,
    resizable: false,
    frame: true,
    titleBarStyle: 'hidden',
    backgroundColor: "#00000000",
    transparent: true
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  globalShortcut.register('Ctrl+Shift+I', () => {
    console.log('Atalho DevTools desabilitado!');
  });

  globalShortcut.register('F12', () => {
    console.log('Atalho F12 desabilitado!');
  });

  globalShortcut.register('Ctrl+W', () => {
    console.log('Atalho CLOSE desabilitado!');
  });

  globalShortcut.register('Ctrl+R', () => {
    console.log('Recarregar desabilitado!');
  });
}

ipcMain.handle("readtags", async (_, filepath: string) => {
  try {
    const tags: NodeID3.Tags = NodeID3.read(filepath);
    let coverBase64 = null;

    if (tags?.image) {
      const { mime, imageBuffer } = tags.image
      coverBase64 = `data:${mime};base64,${imageBuffer.toString('base64')}`;
    }

    return {
      ...tags,
      coverBase64,
    };
  } catch (error) {
    console.log(`Error: NodeID3: ${Error}`);
    return null;
  }
});

ipcMain.handle("updatetags", async (_, filePath, tags) => {
  try {
    if (!filePath) {
      throw new Error("O caminho do arquivo não foi fornecido!");
    }
    const id3Tags: NodeID3.Tags = {
      title: tags.title,
      artist: tags.artist,
      album: tags.album,
      year: tags.year,
      genre: tags.genre,
      composer: tags.composer,
      copyright: tags.copyright,
      bpm: tags.bpm ? parseInt(tags.bpm) : undefined,
      comment: {
        text: tags.comments || "",
      },
      originalArtist: tags.originalArtist,
      unsynchronisedLyrics: {
        text: tags.lyrics || "",
      },
      image: tags.coverBase64
        ? {
          mime: tags.image?.mime || "image/jpeg",
          type: {
            id: tags.image?.type?.id || 3, // 3 = capa frontal
            name: tags.image?.type?.name || "Front Cover",
          },
          description: tags.image?.description || "Cover",
          imageBuffer: Buffer.from(
            tags.coverBase64.split(",")[1], // Remove o prefixo "data:image/png;base64,"
            "base64"
          ),
        }
        : undefined,
    };

    // Atualizar as tags no arquivo
    const success = NodeID3.write(id3Tags, filePath);

    if (!success) {
      throw new Error("Erro ao escrever as tags no arquivo!");
    }

    return { success: true, message: "Tags atualizadas com sucesso!" };
  } catch (error) {
    console.error("Erro ao atualizar tags:", error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle("close", () => {
  app.quit()
  win = null
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
