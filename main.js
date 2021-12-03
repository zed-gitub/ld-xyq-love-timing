// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const Store = require('electron-store');

console.log('userdata:',app.getPath('userData'))

const store = new Store();

function createWindow () {
  // Create the browser window.
  var param = {
    width: 360,
    height: 220,
    x: 0,
    y: 0,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000'
  }
  // load x,y,width,height
  if(store.has('rectangle') && store.get('rectangle').width > 0 && store.get('rectangle').height > 0){
    var rectangle = store.get('rectangle')
    param.x = rectangle.x
    param.y = rectangle.y
    param.width = rectangle.width
    param.height = rectangle.height
  }


  const mainWindow = new BrowserWindow(param)

  // and load the index.html of the app.
  mainWindow.loadFile('love.html')
  
  // save x,y,width,height
  var saveRectangle = () => {
    var rectangle = mainWindow.getContentBounds()
    if(rectangle.height > 0 && rectangle.width > 0){
      store.set('rectangle', rectangle)
    }
  }
  mainWindow.on('move', saveRectangle)
  mainWindow.on('resized', saveRectangle)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

}

app.setLoginItemSettings({ openAtLogin: true });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
