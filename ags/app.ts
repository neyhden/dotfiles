import { App } from "astal/gtk3"
import { Bar } from "./widget/bar"

import style from "./style/style.scss"

App.start({
    css: style,
    icons: "./icons/",
    main() {
        Bar(0)
    },
})
