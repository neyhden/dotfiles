import { bind, exec, Variable } from "astal";
import AstalNetwork from "gi://AstalNetwork";

const NetworkIcon = () => {
    const net = AstalNetwork.get_default()
    const vpnIcon = "network-vpn-symbolic";
    const errorIcon = "network-wireless-offline-symbolic" 

    const connectedVpn = (): boolean => {
        try {
            let res = exec(`bash -c "nmcli c show -a | grep vpn"`)
            return res ? true : false
        } catch (e) {
            return false
        }
    }

    const iconName = Variable.derive(
        [
            bind(net, "primary"),
            bind(net.wifi, "icon_name"),
            bind(net.wired, "icon_name"),
        ], (primary, wifi_icon, wired_icon) => {
            if (primary == AstalNetwork.Primary.WIFI) { return wifi_icon || errorIcon }
            if (primary == AstalNetwork.Primary.WIRED) { return wired_icon || errorIcon }
            if (connectedVpn()) { return vpnIcon }
            return errorIcon
        }
    )

    return <icon icon={iconName()} />
}

export { NetworkIcon }
