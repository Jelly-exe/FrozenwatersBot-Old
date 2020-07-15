const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (client, message, args) => {
  message.channel.startTyping();
  const m = await message.channel.send("Calculating...");
  m.edit("...")
  m.delete()
  const embed = new Discord.RichEmbed()
    .setTitle("Latency Data;")
    .setColor(colour)
    .setDescription("~~                                    ~~")
    .addField("Bot Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("API Latency", `${Math.round(message.client.ping)}ms`, true)
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);
    message.channel.stopTyping();
  message.channel.send({embed})
}
module.exports.config = {
  name: "ping",
  aliases: ["latency"]
}
