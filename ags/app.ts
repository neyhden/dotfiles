import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import { QuickPanel } from "./widget/QuickPanel"

app.start({
  instanceName: "ags",
  css: style,
  icons: "./icons/",
  main() {
    app.get_monitors().map(Bar)
    app.get_monitors().map(QuickPanel)
  },
})
