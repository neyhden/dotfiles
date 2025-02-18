const network = await Service.import("network")

const Network = () => Widget.Icon({
    class_name: "margin-sides",
    icon: network.bind("primary").as(v => {
        if (network.vpn.activated_connections.length > 0) return 'network-vpn-symbolic'
        if (v == "wired") return network.wired.icon_name;
        return network.wifi.icon_name
    }),
})

export { Network }
