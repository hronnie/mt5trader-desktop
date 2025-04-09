const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let pythonProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  // Load the URL served by our Python backend
  mainWindow.loadURL('http://127.0.0.1:5000');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  // Adjust this to the actual path of your Python file
  // For instance:
  //   'C:\\Users\\<YourUserName>\\Documents\\Github\\mt5trader-backend\\app.py'
  const pythonScriptPath = path.join(
    __dirname,
    '..',
    'mt5trader-backend',
    'app.py'
  );

  // Start the Python backend process
  pythonProcess = spawn('python', [pythonScriptPath]);

  // Optionally, log Python’s stdout/stderr to Electron’s console
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  // Give the Python server a moment to start
  setTimeout(createWindow, 3000);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  if (pythonProcess) {
    pythonProcess.kill();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
