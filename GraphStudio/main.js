/**
 * @author:		Alan Badillo Salas
 * @email:		badillo.soft@hotmail.com
 * @site:		https://github.com/badillosoft/code/
 * 
 * @date:		junio 2016
 * @version:	1.0
 * 
 */

var { app } = require('electron');
var { BrowserWindow } = require('electron');

var mainWindow = null;

app.on('window-all-closed', function () {
	app.quit();
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 400,
		minHeight: 300,
		acceptFirstMouse: true
		// titleBarStyle: 'hidden'
	});

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	//mainWindow.openDevTools();

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});
