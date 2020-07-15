const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");

function capitalise(string) {return string.charAt(0).toUpperCase() + string.slice(1);}

exports.run = async (client, message, args) => {

  const info = new Discord.RichEmbed()
    .setTitle('Bot Info')
    .addField('Version', config.version, true)
    .addField('Libary', 'discord.js', true)
    .addField('Creators', 'Jelly#6161\nMackenzie Molloy#1821', true)
    .addField('Website', '[here](https://frozenwaters.xyz)', true)
    .addField('Store', '[here](https://store.frozenwaters.xyz)', true)
    .addField('Discord', '[here](https://discord.frozenwaters.xyz)', true)
  message.channel.send(info);
}
module.exports.config = {
  name: "about",
  aliases: ["info"],
  description: 'Info about the bot.',
  area: 'General',
  priority: 1
}
