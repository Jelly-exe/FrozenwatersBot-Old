const Discord = require ("discord.js");
var request = require('request');
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (bot, message, args) => {

    request('https://api.mcsrvstat.us/2/167.86.69.112:25565', {json: true}, function (err, res, status) {

    if(message.channel.id === config.botspam) {
    if(status.online === true) {
    const stats = new Discord.RichEmbed()
    .setColor(0x14e1fc)
    .setAuthor("FrozenWaters")
    .addField("Online", status.online, true)
    .addField("IP", "Play.FrozenWaters.Xyz", true)
    .addField("Online Count", status.players.online + "/" + status.players.max, true)
    .addField("Players Online", "```" + status.players.list + "```" || "```None```", false)
    .addField("Version", status.version, true)
    .addField("Software", status.software, true)
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(stats).then(msg => msg.delete(4000));
    }
    if(status.online === false) {
      const stats = new Discord.RichEmbed()
      .setColor(0x14e1fc)
      .setAuthor("FrozenWaters")
      .addField("Online", status.online, true)
      .addField("IP", "Play.FrozenWaters.Xyz", true)
      .addField("Online Count" + "0/**UNKNOWN**", true)
      .addField("Players Online", "```NONE```", false)
      .addField("Version", "Unknown", true)
      .addField("Software", "Unknown", true)
      .setTimestamp()
      .setFooter(`${config.footer}`, config.logo);
  
      message.channel.send(stats).then(msg => msg.delete(4000));
    }
    }
    else {
      const wrong = new Discord.RichEmbed()
      .setColor(0xff4c30)
      .setAuthor("Quick Tip:")
      .setDescription("Please use " + `<#${config.botspam}>` + " for that command.")
  
      message.reply(wrong).then(msg => msg.delete(2500));
    }
    });

    message.delete()

}
module.exports.config = {
  name: "mcstats",
  aliases: ["minecraftstats"]
}
