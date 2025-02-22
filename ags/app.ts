import { App } from "astal/gtk3"
import style from "./style/style.scss"

import { Bar } from "./widget/bar"
import { AppLauncher } from "./widget/apps"
import { QuickMenu } from "./widget/quickMenu"

App.start({
    css: style,
    icons: "./icons",
    main() {
        Bar(0)
        AppLauncher()
        QuickMenu()
    },
})
