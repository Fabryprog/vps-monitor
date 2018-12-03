# vps-monitor

VPS Monitor using MQTT

# Config

Config file must contains:
 * id
   * your id
 * mqtt.url
   * mqtt URL
 * commons.interval
   * Interval in millis

# Run

* Nodejs

  * Build
  > npm install

  * Run
  > nodejs index.js

* Docker

  * Build
  > docker build -t fabryprog/vps-monitor .

  * Run
  > docker run --name vps-monitor -v /etc/hostname:/etc/hostname:ro -v $PWD/config.json:/opt/monitor/config.json -d fabryprog/vps-monitor

# How to work

## First step
Monitor create a message to configured MQTT

Every data are pushed into single topic:

| DATA | TOPIC |
| Platform | vps-monitor/<ID>/platform |
| Uptime | vps-monitor/<ID>/uptime |
| CPU Count | vps-monitor/<ID>/cpu/count |
| CPU Usage | vps-monitor/<ID>/cpu/usage |
| AVG Load 1 min | vps-monitor/<ID>/load/avg1 |
| AVG Load 1 min | vps-monitor/<ID>/load/avg5 |
| Memory Total | vps-monitor/<ID>/memory/total |
| Memory Free | vps-monitor/<ID>/memory/free |
| Last TS | vps-monitor/<ID>/last/ts |
| Last ISO UTC Date | vps-monitor/<ID>/last/date |

# Mobile App

You can use every MQTT client. I am using [MQTT Dashboard](https://play.google.com/store/apps/details?id=net.routix.mqttdash)
