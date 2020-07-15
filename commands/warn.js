const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");

module.exports.run = async (client, message, args) => {

  const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-warn [user] [reason]`')
    .setFooter(config.footer, config.footerImage)

  const invalid2 = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> You cannot warn yourself!')
    .setFooter(config.footer, config.footerImage)

  const invalid3 = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> You cannot warn another staff member!')
    .setFooter(config.footer, config.footerImage)

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isStaff(message, message.author.id)
  if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let reason = args.slice(1).join(' ');
  let mod = message.author

  if (!user || !reason) {
    message.channel.send(invalid)
    return;
  }

  if (user.id == mod.id) {
    message.channel.send(invalid2)
    return;
  }

  if (frozenwaters.checkStaff(message, user) == frozenwaters.checkStaff(message, mod) && message.author.id !== '278548721778688010') {
    message.channel.send(invalid3)
    return;
  }

  frozenwaters.warnUser(message, user, reason, mod)

  const valid = new Discord.RichEmbed()
  .setDescription('<a:animatedTick:608735122682019870> User has been successfully warned!')
  .setFooter(config.footer, config.footerImage)
  message.channel.send(valid)
}

module.exports.config = {
  name: "warn",
  aliases: [""],
  description: 'Command to warn a user.',
  area: 'Staff',
  priority: 5
}
