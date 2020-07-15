const config = require('../config-files/main.json');
const Discord = require('discord.js');
const log = require('leekslazylogger')
const fs = require("fs");

const client = new Discord.Client();

module.exports = async client => {
  client.user.setActivity(`the lake freeze over!`, { type: 'WATCHING' })
  log.info(`FrozenWaters [v${config.version}] is now connected!`);
  log.info(`You are running version ${config.version}!`);
  log.info(`${client.users.keyArray().length} Users Online!`);
  log.info(`${client.guilds.keyArray().length} Guilds!`);

  const embed = new Discord.RichEmbed()
  .setTitle(':gear: Settings')
  .setDescription('** **\n**React below to toggle notifications for the following:**\n\n:newspaper: - Recieve announcement notifications\n:gift: - Recieve giveaway notifications\n:notepad_spiral: - Recieve poll notifcations')
  .setFooter(config.footer, config.footerImage)

var Achannel = client.channels.get(config.channels.settings)

Achannel.fetchMessages()
  .then(function(list){
    Achannel.bulkDelete(list)
  }, function(err){Achannel.send("**Error:** Cannot Clear Channel.")})

let Amessage = await Achannel.send(embed)

await Amessage.react('📰');
await Amessage.react('🎁');
await Amessage.react('🗒');

const collector = Amessage.createReactionCollector(reaction => reaction.emoji.name !== "");
collector.on("collect", reaction => {

  if (reaction.message.channel.id !== config.channels.settings) return;

    let users = reaction.users.array();
    let reactor = users[users.length - 1];

    if(reactor.bot) return;
    reaction.remove(reactor);

    let role = reaction.emoji.name;

    let reactor2 = reaction.message.guild.members.get(reactor.id);

    let description = '';

    if (role == '📰') {
      if (reactor2.roles.has(config.roles.alerts)) {
        let toRemove = reaction.message.guild.roles.get(config.roles.alerts);
        reactor2.removeRole(toRemove);
        description = '<a:animatedTick:608735122682019870> You no longer have the `Alerts` role.'
      } else {
        let toAdd = reaction.message.guild.roles.get(config.roles.alerts);
        reactor2.addRole(toAdd);
        description = '<a:animatedTick:608735122682019870> You now have the `Alerts` role.'
      }
    } else if (role == '🎁') {
      if (reactor2.roles.has(config.roles.giveaways)) {
        let toRemove = reaction.message.guild.roles.get(config.roles.giveaways);
        reactor2.removeRole(toRemove);
        description = '<a:animatedTick:608735122682019870> You no longer have the `Giveaways` role.'
      } else {
        let toAdd = reaction.message.guild.roles.get(config.roles.giveaways);
        reactor2.addRole(toAdd);
        description = '<a:animatedTick:608735122682019870> You now have the `Giveaways` role.'
      }
    } else if (role == '🗒') {
      if (reactor2.roles.has(config.roles.polls)) {
        let toRemove = reaction.message.guild.roles.get(config.roles.polls);
        reactor2.removeRole(toRemove);
        description = '<a:animatedTick:608735122682019870> You no longer have the `Polls` role.'
      } else {
        let toAdd = reaction.message.guild.roles.get(config.roles.polls);
        reactor2.addRole(toAdd);
        description = '<a:animatedTick:608735122682019870> You now have the `Polls` role.'
      }
    } else {
      description = '<a:animatedCross:608735120303718460> That didn\'t work, please contact a founder!'
    }
    const embed = new Discord.RichEmbed()
    .setDescription(description)
    reactor2.send(embed)
  });
}