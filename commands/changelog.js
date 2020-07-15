const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");

module.exports.run = async (client, message, args) => {

  message.delete()

  let arg = args.join(' ');

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isManagement(message, message.author.id)
  if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  const announcement = '<:enabled:575019088821092381> ' + arg

  const valid = new Discord.RichEmbed()
  .setDescription(`<a:animatedTick:608735122682019870> Successfully sent changelog in <#528336859223556107>`)
  .setFooter(config.footer, config.footerImage)

  client.channels.get('528336859223556107').send(announcement)
  message.channel.send(valid)
}

module.exports.config = {
  name: "changelog",
  aliases: ["change"],
  description: 'Command to do changelog announcements',
  area: 'Management',
  priority: 7
}
