const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");

module.exports.run = async (client, message, args) => {

  message.delete()

  let arg = args.join(' ');
  let convert = arg.split(";")

  const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-announce [everyone/here/normal]; [announcement title]; [announcement description]`')
    .setFooter(config.footer, config.footerImage)

  const valid = new Discord.RichEmbed()
    .setDescription(`<a:animatedTick:608735122682019870> Successfully sent announcement in <#${config.channels.announcements}>`)
    .setFooter(config.footer, config.footerImage)
  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isManagement(message, message.author.id)
  if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//
  if (convert.length < 3) {
    message.channel.send(invalid)
    return;
  }

  let announcer;

  if(message.author.id === "278548721778688010") {
      announcer = "Elliot Frost"
  }

  else if(message.author.id === "287874798049165313") {
      announcer = "Mackenzie Molloy"
  }

  let announceGroup;

  if(convert[0].toLowerCase() === "everyone") {
    announceGroup = '@everyone'
  } else if (convert[0].toLowerCase() === "here") {
    announceGroup = '@here'
  } else if (convert[0].toLowerCase() === "normal") {
    announceGroup = `<@&${config.roles.alerts}>`
  }

  const announcement = new Discord.RichEmbed()
      .setTitle(convert[1])
      .setDescription(convert[2] + "\n\nRegards,\n" + announcer + " - FrozenWaters Management")

  let tagger = await client.channels.get(config.channels.announcements).send(announceGroup)
  client.channels.get(config.channels.announcements).send(announcement)
  message.channel.send(valid)
  tagger.delete()
}

module.exports.config = {
  name: "announce",
  aliases: ["announcement"],
  description: 'Command to do announcements',
  area: 'Management',
  priority: 7
}
