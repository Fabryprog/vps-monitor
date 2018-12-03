var osutils = require('os-utils');
var fs = require('fs');
var mqtt = require('mqtt');

// read config file
var config = require('./config.json');

var client  = mqtt.connect(config.mqtt.url);

client.on('connect', function () {
    console.log("Monitoring Start! " + config.mqtt.url + " [ " + config.id + " ]");
    //create topic
    const topic = "vps-monitor/" + config.id
    execute(topic);
});

/************** MAIN *****************/
const execute = function(topic) {
	setInterval(function() {
    osutils.cpuUsage(function(v) {

      client.publish(topic + "/platform", osutils.platform(), {"retain": true});
      client.publish(topic + "/uptime", ""+osutils.sysUptime(), {"retain": true});
      client.publish(topic + "/cpu/count", ""+osutils.cpuCount(), {"retain": true});
      client.publish(topic + "/cpu/usage", ""+v, {"retain": true});
      client.publish(topic + "/load/avg1", ""+osutils.loadavg(1), {"retain": true});
      client.publish(topic + "/load/avg5", ""+osutils.loadavg(5), {"retain": true});
      client.publish(topic + "/load/avg15", ""+osutils.loadavg(15), {"retain": true});
      client.publish(topic + "/memory/total", ""+osutils.totalmem(), {"retain": true});
      client.publish(topic + "/memory/free", ""+osutils.freemem(), {"retain": true});
      client.publish(topic + "/last/ts", ""+new Date().getTime(), {"retain": true});
      client.publish(topic + "/last/date", ""+new Date().toISOString(), {"retain": true});
    });

  }, config.commons.interval);
};
