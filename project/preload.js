/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('electronAPI', {
        readLocalMaps: () => ipcRenderer.invoke('read-local-map-library')
    })

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        // eslint-disable-next-line no-undef
        replaceText(`${type}-version`, process.versions[type])
    }
})