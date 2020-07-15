const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const applications = require('../config-files/applications.json');

function capitalise(string) {return string.charAt(0).toUpperCase() + string.slice(1);}

exports.run = async (client, message, args) => {

  const HelperAppsOpen = applications.helper;
  const BuilderAppsOpen = applications.builder;
  const DeveloperAppsOpen = applications.developer;
  const ConfiguratorAppsOpen = applications.configurator;

  let helperEmoji;
  let builderEmoji;
  let developerEmoji;
  let configuratorEmoji;

  let description;
  let topic;
  let roles;
  let channelName;

  if (HelperAppsOpen == false) helperEmoji = '<:disabled:609373761417904162>'
  else helperEmoji = '<:enabled:609373762533588993>'

  if (BuilderAppsOpen == false) builderEmoji = '<:disabled:609373761417904162>'
  else builderEmoji = '<:enabled:609373762533588993>'

  if (DeveloperAppsOpen == false) developerEmoji = '<:disabled:609373761417904162>'
  else developerEmoji = '<:enabled:609373762533588993>'

  if (ConfiguratorAppsOpen == false) configuratorEmoji = '<:disabled:609373761417904162>'
  else configuratorEmoji = '<:enabled:609373762533588993>'

  const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-apply [helper/builder/developer/configurator]`\n\n' + helperEmoji + ' Helper Applications\n' + builderEmoji + ' Builder Applications\n' + developerEmoji + ' Developer Applications\n' + configuratorEmoji + ' Configurator Applications\n')
    .setFooter(config.footer, config.footerImage)
  if (args.length < 1) {
    message.channel.send(invalid)
    return;
  }

  if ((args[0] == 'helper' && HelperAppsOpen == false) || (args[0] == 'builder' && BuilderAppsOpen == false) || (args[0] == 'developer' && DeveloperAppsOpen == false) || (args[0] == 'configurator' && ConfiguratorAppsOpen == false)) {
    const invalid2 = new Discord.RichEmbed()
      .setDescription(`<a:animatedCross:608735120303718460> ${capitalise(args[0])} applications are currently closed, feel free to apply for a different role!\n\n${helperEmoji} Helper Applications\n${builderEmoji} Builder Applications\n${developerEmoji} Developer Applications\n${configuratorEmoji} Configurator Applications\n`)
      .setFooter(config.footer, config.footerImage)
    message.channel.send(invalid2)
    return;
  }

  else if (args[0] == 'helper') {
    channelName = `h-${message.author.username}`
    description = `Hello <@${message.author.id}>, thank you for applying for a position as a network helper, please answer the following questions and they will be reviewed as soon as possible;\n\n**What is your name?** *(Prefer Forename and Surname)*\n**How old are you?** *(Must be 12+)*\n**Where do you live?** *(City/State + Timezone)*\n**Biography** *(Tell us a bit about yourself)*\n**Why do you want to apply for Helper?** *(Why this server?)*\n**Do you have any past experience?** *(Got a Portfoilo, show us it)*`
    roles = `Please ping the following role; <@&${config.roles.applications}>`
    topic = `${message.author.username} is applying for a position as a Network Helper!`
  }

  else if (args[0] == 'builder') {
    channelName = `b-${message.author.username}`
    description = `Hello <@${message.author.id}>, thank you for applying for a position as a network builder, please answer the following questions and they will be reviewed as soon as possible;\n\n**What is your name?** *(Prefer Forename and Surname)*\n**How old are you?** *(Must be 12+)*\n**Where do you live?** *(City/State + Timezone)*\n**Biography** *(Tell us a bit about yourself)*\n**Why do you want to apply for Builder?** *(Why this server?)*\n**Do you have any past experience?** *(Got a Portfoilo, show us it)*`
    roles = `Please ping the following roles; <@&${config.roles.applications}> and <@&${config.roles.HeadBuilder}>`
    topic = `${message.author.username} is applying for a position as a Network Builder!`
  }

  else if (args[0] == 'developer') {
    channelName = `d-${message.author.username}`
    description = `Hello <@${message.author.id}>, thank you for applying for a position as a network developer, please answer the following questions and they will be reviewed as soon as possible;\n\n**What is your name?** *(Prefer Forename and Surname)*\n**How old are you?** *(Must be 12+)*\n**Where do you live?** *(City/State + Timezone)*\n**Biography** *(Tell us a bit about yourself)*\n**Why do you want to apply for Developer?** *(Why this server?)*\n**Do you have any past experience?** *(Got a Portfoilo, show us it)*`
    roles = `Please ping the following roles; <@&${config.roles.applications}> and <@&${config.roles.HeadDeveloper}>`
    topic = `${message.author.username} is applying for a position as a Network Developer!`
  }

  else if (args[0] == 'configurator') {
    channelName = `c-${message.author.username}`
    description = `Hello <@${message.author.id}>, thank you for applying for a position as a network configurator, please answer the following questions and they will be reviewed as soon as possible;\n\n**What is your name?** *(Prefer Forename and Surname)*\n**How old are you?** *(Must be 12+)*\n**Where do you live?** *(City/State + Timezone)*\n**Biography** *(Tell us a bit about yourself)*\n**Why do you want to apply for Configurator?** *(Why this server?)*\n**Do you have any past experience?** *(Got a Portfoilo, show us it)*`
    roles = `Please ping the following role; <@&${config.roles.applications}> and <@&${config.roles.HeadConfigurator}>`
    topic = `${message.author.username} is applying for a position as a Network Configurator!`
  }

  else {
    message.channel.send(invalid)
    return;
  }
  message.guild.createChannel(channelName, {type: 'text'}).then(async c => {
    c.setParent(config.categories.applications)
    c.setTopic(topic)

    c.overwritePermissions(message.guild.defaultRole, {
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false
    })
    c.overwritePermissions(message.member, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
      ATTACH_FILES: true
    })

    const embed =  new Discord.RichEmbed()
      .setTitle(`${message.author.username} - ${message.author.id}`)
      .setDescription(description)
      .addField('Finished answering the questions?', roles)
      .setThumbnail(message.author.avatarURL)
      .setFooter(config.footer, config.footerImage)

    const valid = new Discord.RichEmbed()
      .setDescription(`<a:animatedTick:608735122682019870> Thank you for opening an application, please go to your channel (<#${c.id}>) and answer the questions!`)
      .setFooter(config.footer, config.footerImage)

    message.channel.send(valid)
    c.send(embed)
  });

}
module.exports.config = {
  name: "apply",
  aliases: ["applications"],
  description: 'Apply for a role at Frozenwaters',
  area: 'General',
  priority: 1
}
