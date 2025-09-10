#!/bin/bash

BRIGHTNESS_FILE=/sys/class/backlight/intel_backlight/brightness
MAX_BRIGHTNESS_FILE=/sys/class/backlight/intel_backlight/max_brightness

VOLUME_FILE=./vol.txt

while [[ $# -gt 0 ]]; do
    case "$1" in
        "brightness")
            while true; do
                echo "$(( $(cat $BRIGHTNESS_FILE) * 100 / $(cat $MAX_BRIGHTNESS_FILE) ))"
                inotifywait -q -e MODIFY $BRIGHTNESS_FILE > /dev/null
            done
            exit 0
            ;;
        "volume")
            echo $(wpctl get-volume @DEFAULT_AUDIO_SINK@ | cut -d ' ' -f 2 | sed "s/0\\.\\|\\.\\|0\\.0//")
            pactl subscribe \
              | grep --line-buffered "Event 'change' on sink " \
              | while read -r evt; 
              do wpctl get-volume @DEFAULT_AUDIO_SINK@ \
                  | cut -d ' ' -f 2 | sed "s/0\\.\\|\\.\\|0\\.0//"
            done
            ;;
        "muted")
            echo $(wpctl get-volume @DEFAULT_AUDIO_SINK@ | grep -c MUTED)
            pactl subscribe \
              | grep --line-buffered "Event 'change' on sink " \
              | while read -r evt; 
              do wpctl get-volume @DEFAULT_AUDIO_SINK@ | grep -c MUTED;
            done
            ;;
        "mic-volume")
            echo $(wpctl get-volume @DEFAULT_AUDIO_SOURCE@ | cut -d ' ' -f 2 | sed "s/0\\.\\|\\.\\|0\\.0//")
            pactl subscribe \
              | grep --line-buffered "Event 'change' on source " \
              | while read -r evt; 
              do wpctl get-volume @DEFAULT_AUDIO_SOURCE@ \
                  | cut -d ' ' -f 2 | sed "s/0\\.\\|\\.\\|0\\.0//"
            done
            ;;
        "mic-muted")
            echo $(wpctl get-volume @DEFAULT_AUDIO_SOURCE@ | grep -c MUTED)
            pactl subscribe \
              | grep --line-buffered "Event 'change' on source " \
              | while read -r evt; 
              do wpctl get-volume @DEFAULT_AUDIO_SOURCE@ | grep -c MUTED;
            done
            ;;
        "touchpad")
            TOUCHPAD_PATH=/tmp/touchpad_off
            if [ -f $TOUCHPAD_PATH ]; then
                rm $TOUCHPAD_PATH
                hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' true
            else
                touch $TOUCHPAD_PATH
                hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' false
            fi
            exit 0
            ;;
        "hyprland")
            WORKSPACES=$(hyprctl workspaces -j)
            ACTIVE=$(hyprctl activeworkspace -j | jq ".id")
            HYPRLAND="{\"active\": $ACTIVE, \"workspaces\": []}"
            I=1
            while [ $I -le 10 ]; do
                EXISTS=$(echo $WORKSPACES | grep -q "\"id\": ${I}" && echo true || echo false)
                W="{\"id\": ${I}, \"exists\": ${EXISTS}, \"urgent\": false}"
                HYPRLAND=$(echo $HYPRLAND | jq -c ".workspaces += [$W]")
                I=$((I + 1))
            done
            echo $HYPRLAND

            handle() {
                case $1 in
                    workspace\>\>*)
                        W=$(echo $1 | grep -o "[0-9]*")
                        HYPRLAND=$(echo $HYPRLAND | jq -c ".active = $W" | jq -c ".workspaces[$(($W-1))].exists = true")
                        echo "$HYPRLAND"
                        ;;
                    destroyworkspace\>\>*)
                        W=$(echo $1 | grep -o "[0-9]*")
                        HYPRLAND=$(echo $HYPRLAND | jq -c ".workspaces[$(($W - 1))].exists = false")
                        echo "$HYPRLAND"
                        ;;
                    urgent*)
                        ;;
                    *)
                        ;;
                esac
            }

            socat -U - UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock | while read -r line; do handle "$line"; done
            ;;

        *) echo "not a command"
            exit 1
            ;;
    esac
done

exit 1
