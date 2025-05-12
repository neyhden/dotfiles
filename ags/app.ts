import { App } from "astal/gtk3"
import style from "./style/style.scss"

import { Bar } from "./widget/bar"
import { AppLauncher } from "./widget/apps"
import { QuickMenu } from "./widget/quickMenu"
import { execAsync } from "astal"
import { Calendar } from "./widget/calendar"

execAsync([ "bash", "-c", "inotifywait -q -r -e CLOSE_WRITE . && (ags quit; ags run)" ])
    .catch(e => print(e))

App.start({
    css: style,
    icons: "./icons",
    main() {
        Bar(0)
        AppLauncher()
        QuickMenu()
        Calendar()
    },
})
