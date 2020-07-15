const Discord = require ("discord.js");
var request = require('request');
const config = require("../config-files/main.json");


module.exports.run = async (bot, message, args) => {

    request('https://api.mcsrvstat.us/2/167.86.69.112:25565', {json: true}, function (err, res, status) {

      if(status.online === true) {
        const stats = new Discord.RichEmbed()
          .setTitle("FrozenWaters Stats")
          .addField("Online:", status.online, true)
          .addField("IP:", "`play.frozenwaters.xyz`", true)
          .addField("Online Count:", `${status.players.online}/${status.players.max}`, true)
          .addField("Players Online:", `\`\`\` ${status.players.list}\`\`\`` || `\`\`\`None\`\`\``, false)
          .addField("Version:", status.version, true)
          .addField("Software:", status.software, true)
          .setFooter(config.footer, config.footerImage)
      message.channel.send(stats)
    }

    if(status.online === false) {
      const stats = new Discord.RichEmbed()
      .setTitle("FrozenWaters Stats")
        .addField("Online:", status.online, true)
        .addField("IP:", "`play.frozenwaters.xyz`", true)
        .addField("Online Count:" + "0/?", true)
        .addField("Players Online:", "```NONE```", false)
        .addField("Version:", "Unknown", true)
        .addField("Software:", "Unknown", true)
        .setFooter(config.footer, config.footerImage)
      message.channel.send(stats)
    }
  });
}
module.exports.config = {
    name: "mcstats",
    aliases: [""],
    description: 'Check the stats of the FrozenWaters',
    area: 'General',
    priority: 1
}
