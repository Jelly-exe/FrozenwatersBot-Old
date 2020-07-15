const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");

const warn = require('../punishments/warn.json')
const mute = require('../punishments/mute.json')
const kick = require('../punishments/kick.json')
const ban = require('../punishments/ban.json')

module.exports.run = async (client, message, args) => {

  const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-history [user]`')
    .setFooter(config.footer, config.footerImage)

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isStaff(message, message.author.id)
  if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

  let warnings = warn[user.id]
  let mutes = mute[user.id]
  let kicks = kick[user.id]
  let bans = ban[user.id]

  if (!warnings && !mutes && !kicks && !bans) {
    let embed = new Discord.RichEmbed()
      .setTitle(`Punishment history for ${user.user.username}`)
      .setDescription('This user has received no punishments!')

    message.channel.send(embed)
    return;
  }
  let b = 0
  let c = 0
  let d = 0
  let e = 0

  let historyMessage = [];
  if (warnings) {
    warnings.warningIds.forEach(function(warning) {
      historyMessage.push(`Warning \`${warning}\` -`);

      let warnModerator = warnings.warningMods[b]
      let warnDate = warnings.warningDates[b]
      let warnReason = warnings.warningReasons[b]
      b++

      historyMessage.push(`__Moderator__: <@${warnModerator}>\n__Date__: ${warnDate}\n__Reason__: ${warnReason}`);
    });
  }

  if (mutes) {
    mutes.muteIds.forEach(function(mute1) {
      historyMessage.push(`Mute \`${mute1}\` -`);

      let muteModerator = mutes.muteMods[c]
      let muteDate = mutes.muteDates[c]
      let muteReason = mutes.muteReasons[c]
      c++

      historyMessage.push(`__Moderator__: <@${muteModerator}>\n__Date__: ${muteDate}\n__Reason__: ${muteReason}`);
    });
  }

  if (kicks) {
    kicks.kickIds.forEach(function(kick1) {
      historyMessage.push(`Kick \`${kick1}\` -`);

      let kickModerator = kicks.kickMods[d]
      let kickDate = kicks.kickDates[d]
      let kickReason = kicks.kickReasons[d]
      d++

      historyMessage.push(`__Moderator__: <@${kickModerator}>\n__Date__: ${kickDate}\n__Reason__: ${kickReason}`);
    });
  }

  if (bans) {
    bans.banIds.forEach(function(ban1) {
      historyMessage.push(`Ban \`${ban1}\` -`);

      let banModerator = bans.banMods[e]
      let banDate = bans.banDates[e]
      let banReason = bans.banReasons[e]
      e++

      historyMessage.push(`__Moderator__: <@${banModerator}>\n__Date__: ${banDate}\n__Reason__: ${banReason}`);
    });
  }
  
  let embed = new Discord.RichEmbed()
  .setTitle(`Punishment history for ${user.user.username}`)
  .setDescription('This is all the punishments that the stated user has received.')

  for (let a = 0; a < historyMessage.length; a = a + 2) {
    embed.addField(historyMessage[a], historyMessage[a + 1])
  }

  message.channel.send(embed)
}

module.exports.config = {
  name: "history",
  aliases: [""],
  description: 'Command to view a users history.',
  area: 'Staff',
  priority: 5
}
