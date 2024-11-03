import { Stream } from "resource:///com/github/Aylur/ags/service/audio.js"

const audio = await Service.import("audio")
let apps = audio.bind("apps")

const icons = {
    speaker: {
        muted: "audio-volume-muted-symbolic",
        low: "audio-volume-low-symbolic",
        medium: "audio-volume-medium-symbolic",
        high: "audio-volume-high-symbolic",
    },
    microphone: {
        muted: "microphone-disabled-symbolic",
        low: "microphone-sensitivity-low-symbolic",
        medium: "microphone-sensitivity-medium-symbolic",
        high: "microphone-sensitivity-high-symbolic",
    }
}

const getIcon = (/** @type {string} */ type, /** @type {boolean | null} */ muted, /** @type {number} */ volume) => {
    if (muted) return icons[type].muted
    if (volume < 0.3) return icons[type].low
    if (volume < 0.6) return icons[type].medium
    return icons[type].high
}

const VolumeSlider = (/** @type {Stream} */ stream) => Widget.Slider({
    hexpand: true,
    min: 0,
    max: 1,
    draw_value: false,
    onChange: ({ value }) => stream.volume = value,
    value: stream.bind('volume'),
})

const VolumeButton = (/** @type {Stream} */ stream, /** @type { "speaker" | "microphone" } */type) => Widget.Button({
    on_clicked: () => stream.is_muted = !stream.is_muted,
    child: Widget.Icon().hook(stream, self => {
        self.icon = getIcon(type, stream.is_muted, stream.volume)
    })
})

const VolumeValue = (/** @type {Stream} */ stream) => Widget.Label({
    class_name: "slider_label",
    label: stream.bind("volume").as((/** @type {number} */ v) => `${(v*100).toFixed(0)}%`)
})

const SpeakerSlider = () => VolumeSlider(audio.speaker)
const MicSlider = () => VolumeSlider(audio.microphone)

const SpeakerButton = () => VolumeButton(audio.speaker, "speaker")
const MicButton = () => VolumeButton(audio.microphone, "microphone")

const SpeakerValue = () => VolumeValue(audio.speaker)
const MicValue = () => VolumeValue(audio.microphone)

const SpeakerBox = () => Widget.Box({
    children: [
        SpeakerButton(),
        SpeakerSlider(),
        SpeakerValue(),
    ]
})
const MicBox = () => Widget.Box({
    children: [
        MicButton(),
        MicSlider(),
        MicValue(),
    ]
})

const Apps = Widget.Box({
    class_name: "cell round",
    vertical: true,
    children: apps.as(list => list.map(capp => Widget.Box({
        vertical: true,
        children: [
            Widget.Label((capp.name ?? "?") + ": " + (capp.description?.slice(0, 20) ?? "?")),
            Widget.Box({ children: [
                VolumeButton(capp, "speaker"),
                VolumeSlider(capp),
                VolumeValue(capp),
            ]})
        ]
    })))
})

let AppsRevealer = Widget.Revealer({
    transition: "slide_down",
    reveal_child: false,
    child: Apps,
})

const AppsToggle = () => Widget.Button({
    child: Widget.Icon('zoom-in'),
    on_clicked: self => {
        AppsRevealer.reveal_child = !AppsRevealer.reveal_child
        self.child.icon = self.child.icon == 'zoom-in' ? 'zoom-out' : 'zoom-in'
    }
})

const VolumeBox = () => Widget.Box({
    vertical: true,
    class_name: "round",
    children: [
        SpeakerBox(),
        MicBox(),
        AppsToggle(),
        AppsRevealer,
    ]
})

export { VolumeBox }
