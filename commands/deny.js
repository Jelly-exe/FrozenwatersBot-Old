const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");

module.exports.run = async (client, message, args) => {

  const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-accept [role] [user]`')
    .setFooter(config.footer, config.footerImage)

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isManagement(message, message.author.id)
  if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  const accepted = new Discord.RichEmbed()
    .setTitle('Commiserations')
    .setDescription(`Unfortunatly, after reviewing your application, FrozenWaters management have decided that they will not be accepting your application. This may have been due to a number of reasons, if you would like to know these, please contact a founder. Once you have read this message, please also alert a founder so they can archive this channel.`)
    .setFooter(config.footer, config.footerImage);

  message.channel.send(accepted)
}

module.exports.config = {
  name: "deny",
  aliases: ["deny"],
  description: 'Deny an application',
  area: 'Management'
}
