const battery = await Service.import("battery")

const secToTime = (/** @type {number} */ t) => {
    var h = Math.floor(t / 3600);
    var m = Math.floor(t % 3600 / 60);
    var s = Math.floor(t % 3600 % 60);
    var hs = h > 9 ? `${h}` : `0${h}`
    var ms = m > 9 ? `${m}` : `0${m}`
    var ss = s > 9 ? `${s}` : `0${s}`
    return `${hs}:${ms}:${ss}`
}

const Battery = () => Widget.Box({
    class_name: battery.bind("percent").as(p => {
        if (p > 70) return "margin-sides bat-high"
        if (p > 30) return "margin-sides bat-med"
        if (p > 10) return "margin-sides bat-low"
        return "margin-sides bat-crit"
    }),
    tooltip_text: battery.bind("time_remaining").as(t => {
        var time = secToTime(t) + (battery.charging ? ' to full charge' : ' remaining')
        var watts = battery.energy_rate.toFixed(1) + ' W'
        return time + '\n' + watts
    }),
    children: [
        Widget.Label({
            label: battery.bind("percent").as(v => `${v}% `)
        }),
        Widget.Icon({
            icon: battery.bind("icon_name")
        })
    ]
})

export { Battery }
