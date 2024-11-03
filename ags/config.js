import { InfoWindow } from "./widget/info/info.js"
import { Bar } from "./widget/bar/bar.js"
import { SettingsWindow } from "./widget/settings/settings.js"
import { applauncher } from "./widget/applauncher/applauncher.js"

const scss = `${App.configDir}/style/style.scss`
const css = `${App.configDir}/style/style.css`
Utils.exec(`sassc ${scss} ${css}`)

App.config({
    style: css,
    icons: "./icons/",
    windows: [
        Bar(),
        SettingsWindow(),
        InfoWindow(),
        applauncher,
    ],
})

export {}
