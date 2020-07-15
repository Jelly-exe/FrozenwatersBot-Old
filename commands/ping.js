const Discord = require("discord.js");
const config = require("../config-files/main.json");

exports.run = async (client, message, args) => {
  const m = await message.channel.send('<a:loading:608772416046497822> **Calculating...**');
  m.edit("...")
  m.delete()
  const embed = new Discord.RichEmbed()
    .setTitle("Pong!")
    .setDescription("`-------------------------------------`")
    .addField("Bot Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("API Latency", `${Math.round(message.client.ping)}ms`, true)
    .setFooter(config.footer, config.footerImage);
    message.channel.send({embed})
}

module.exports.config = {
  name: "ping",
  aliases: ["latency"],
  description: 'Get the bots latency and API latency.',
  area: 'General',
  priority: 1
}
