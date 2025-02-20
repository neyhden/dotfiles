import { bind, exec, Variable } from "astal";
import AstalNetwork from "gi://AstalNetwork";

const NetworkIcon = () => {
    const net = AstalNetwork.get_default()
    const vpnIcon = "network-vpn-symbolic";
    const errorIcon = "network-wireless-offline-symbolic" 

    const connectedVpn = (): boolean => {
        return exec(`bash -c "nmcli c show -a | grep vpn"`) ? true : false 
    }

    const iconName = Variable.derive(
        [
            bind(net, "primary"),
            bind(net.wifi, "icon_name"),
            bind(net.wired, "icon_name"),
        ], (primary, wifi_icon, wired_icon) => {
            if (primary == AstalNetwork.Primary.WIFI) { return wifi_icon }
            if (primary == AstalNetwork.Primary.WIRED) { return wired_icon }
            if (connectedVpn()) { return vpnIcon }
            return errorIcon
        }
    )

    return <icon icon={iconName()} />
}

export { NetworkIcon }
