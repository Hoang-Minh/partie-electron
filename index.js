const { app, dialog, BrowserWindow, Notification } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1281,
    height: 800,
    minWidth: 360,
    minHeight: 460,
    icon: `${__dirname}/src/assets/favicons/favicon-32x32.png`
    // icon: path.join(__dirname, 'assets/favicons/favicon-32x32.png')
  });

  // load the dist folder from Angular
  win.setTitle('Partie App');
  //win.removeMenu();
  win.loadURL('http://localhost:58232');

  // The following is optional and will open the DevTools:
  win.webContents.openDevTools()

  win.on("closed", () => {
    win = null;
  });
  win.on("close", (evt) => {
    // Cancel the current event to prevent window from closing
    evt.preventDefault();

    let options = {
      buttons: ["&Yes", "&No"],
      message: 'Are you sure you want to quit?',
      type: 'question',
      title: 'Confirm',
      noLink: true,
      normalizeAccessKeys: true,
      cancelId: 1
    }

    let confirmExit = dialog.showMessageBoxSync(options)

    if (confirmExit == 0) {
      win.destroy();
    }

  });
}

app.whenReady().then(createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
