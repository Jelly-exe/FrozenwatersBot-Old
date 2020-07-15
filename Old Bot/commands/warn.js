const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const moment = require('moment');

const ms = require("ms");
let punishments = JSON.parse(fs.readFileSync("./punishments.json", "utf8"));
let logchannel = config.punishchannel;

module.exports.run = async (bot, message, args) => {

  let timestamp = message.createdTimestamp
  //console.log(moment().format('D/M/Y'))
  //new Date(timestamp * 1000)
  message.delete()
  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("**Insufficient Permission**");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.channel.send("Sorry, I could't find selected user");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, I'm unable to warn selected user.");
  let reason = args.slice(1).join(' ')


  if(!punishments[wUser.id]) punishments[wUser.id] = {
    "id": punishments[wUser.id],
    "warns": [0],
    "warnreason": [],
    "warnmod": [],
    "warndate": [],
    "bans": [],
    "banmod": [],
    "bandate": [],
    "banreason": [],
    "kicks": [],
    "kickmod": [],
    "kickdate": [],
    "kickreason": [],
    "mutes": [],
    "mutemod": [],
    "mutedate": [],
    "mutereason": [] 
  };

  if(punishments[wUser.id].warns === 0) punishments[wUser.id] = {
    "id": punishments[wUser.id],
    "warns": [0],
    "warnreason": [reason],
    "warnmod": [],
    "warndate": [],
    "bans": [],
    "banmod": [],
    "bandate": [],
    "banreason": [],
    "kicks": [],
    "kickmod": [],
    "kickdate": [],
    "kickreason": [],
    "mutes": [],
    "mutemod": [],
    "mutedate": [],
    "mutereason": [] 

  }

  //let newreason = punishments[wUser.id].reason, reason

  let warnss = punishments[wUser.id].warns

  //console.log(message.createdAt)

  punishments[wUser.id].warns++;
  punishments[wUser.id].warnreason.push(reason)
  punishments[wUser.id].warnmod.push(message.author.id)
  punishments[wUser.id].warndate.push(moment().format('D/M/Y'))

  fs.writeFile("./punishments.json", JSON.stringify(punishments, null, 2), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed() 
  .setDescription("Warning")
  .setAuthor(message.author.username)
  .setColor("0xe9ff00")
  .addField("Warned User", `<@${wUser.id}>`, true)
  .addField("Moderator", `<@${message.author.id}>`, true)
  .addField("Warned In", message.channel, true)
  .addField("Number of Warnings", punishments[wUser.id].warns, true)
  .addField("Reason", reason, true);

  if(!logchannel) return message.reply("Couldn't find channel");

//  let warning = bot.getWarn.get(message.author.id, reason);

  message.guild.channels.get(logchannel).send(warnEmbed);
  message.channel.send("Successfully warned **" + wUser.user.username + "** for **" + reason + "**")

}

module.exports.config = {
  name: "warn",
  aliases: ["warnuser"]
}