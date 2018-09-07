const electron = require("electron");
const url = require("url");
const path = require("path");

const {app,BrowserWindow,Menu} = electron;

let mainWindow;
let addWindow;
 // listen for app to be ready

app.on("ready",function(){
  // create window
  mainWindow = new BrowserWindow({});
  // load hatml into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,"index.html"),
    protocol: "file:",
    slashes: true
  }));
  // Quit app when closed
  mainWindow.on("closed",function(){
    app.quit()
  });
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert Menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle add window

const mainMenuTemplate = [
  {
    label:"File",
    submenu:[
      {
      label:"Quit",
      accelerator: process.platform == "darwin" ? "Command+Q":
      "Ctrl+Q",
      click(){
        app.quit();
      }
      }
    ]
  }
];
// if mac add empty object to menu
if(process.platform == "darwin"){
  mainMenuTemplate.unshift({});
}
// Add developer tools item if not in prod
if(process.env.NODE_ENV !== "production"){
  mainMenuTemplate.push({
    label: "Developer tools",
    submenu:[
      {
        label: "Toggle Dev Tools",
        accelerator: process.platform == "darwin" ? "Command+I":
        "Ctrl+I",
        click(item,focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role:"reload"
      }
    ]
  });
}
