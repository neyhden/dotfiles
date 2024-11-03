import { Notification } from "resource:///com/github/Aylur/ags/service/notifications.js"

const notifications = await Service.import("notifications")

const NotificationWidget = (/** @type {Notification} */ notification) => Widget.Box({
    setup: () => notification.dismiss(),
    class_name: "cell round",
    children: [
        Widget.Icon({
            class_name: "image",
            icon: notification.image || "user-available-symbolic",
            size: 64,
        }),
        Widget.Box({
            vertical: true,
            children: [
                Widget.CenterBox({ 
                    start_widget: Widget.Box({ children: [
                        Widget.Icon(notification.app_icon || "dialog-question-symbolic"),
                        Widget.Label(notification.app_name),
                    ]}),
                    end_widget: Widget.Box({
                        hpack: "end",
                        child: Widget.Button({
                            child: Widget.Icon("window-close"),
                            on_clicked: () => notification.close()
                        })
                    })
                }),
                Widget.Label({
                    label: notification.summary
                })
            ]
        })
    ]
})

const Notifications = () => Widget.Box({
    vertical: true,
    children: notifications.bind("notifications").as(ntfs => ntfs.map(NotificationWidget))
})

export { Notifications }
