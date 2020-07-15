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

  if (args.length < 2) {
    message.channel.send(invalid)
    return;
  }
  let role = args[0]
  let user = message.mentions.users.first();
  let user2 = message.mentions.members.first();

  if (!user) message.channel.send(invalid);

  let roleArea;
  let toAssign;
  let toAssign2;
  let toAssign3;

  if (role == 'helper') {
    if (!message.member.roles.has('528006176655278101')) {
      toAssign = message.guild.roles.find(r => r.name === "Helper")
      user2.addRole(toAssign.id);
    }

    if (!message.member.roles.has('537687008353714209')) {
      toAssign2 = message.guild.roles.find(r => r.name === "Staff");
      user2.addRoles(toAssign2.id);
    }
    roleArea = 'Staff'
  }

  else if (role == 'builder') {
    if (!message.member.roles.has('528337084067348484')) {
      toAssign = message.guild.roles.find(r => r.name === "Builder")
      user2.addRole(toAssign.id);
    }
    if (!message.member.roles.has('548279069465378826')) {
      toAssign2 = message.guild.roles.find(r => r.name === "Builders");+
      user2.addRoles(toAssign2.id);
    }
    roleArea = 'Building'
  }

  else if (role == 'developer') {
    if (!message.member.roles.has('528009363885916165')) {
      toAssign = message.guild.roles.find(r => r.name === "Developer")
      user2.addRole(toAssign.id);
    }

    if (!message.member.roles.has('537687008353714209')) {
      toAssign2 = message.guild.roles.find(r => r.name === "Staff");
      user2.addRoles(toAssign2.id);
    }

    if (!message.member.roles.has('537687119938977799')) {
      toAssign3 = message.guild.roles.find(r => r.name === "Development");
      user2.addRoles(toAssign3.id);
    }

    roleArea = 'Development'
  }

  else if (role == 'configurator') {
    if (!message.member.roles.has('579002366930714672')) {
      toAssign = message.guild.roles.find(r => r.name === "Configurator")
      user2.addRole(toAssign.id);
    }

    if (!message.member.roles.has('537687008353714209')) {
      toAssign2 = message.guild.roles.find(r => r.name === "Staff");
      user2.addRoles(toAssign2.id);
    }

    if (!message.member.roles.has('537687119938977799')) {
      toAssign3 = message.guild.roles.find(r => r.name === "Development");
      user2.addRoles(toAssign3.id);
    }
    roleArea = 'Development'
  }

  else {
    message.channel.send(invalid)
    return;
  }

  const accepted = new Discord.RichEmbed()
    .setTitle('Congratulations!')
    .setDescription(`Congratulations <@${user.id}>, after reviewing your application, FrozenWaters management have decided that they will be accepting your application. Once you have read this message, please alert a founder so they can archive this channel.`)
    .setFooter(config.footer, config.footerImage);

  const accepted2 = new Discord.RichEmbed()
    .setTitle('Ingame permissions')
    .setDescription('To receive your in game permissions, you will need to contact one of the owners. We advise doing this via DMs to ensure that it is done ASAP.')
    .setFooter(config.footer, config.footerImage);

  const staffChatMessage = new Discord.RichEmbed()
    .setTitle('New Staff Member')
    .setDescription(`Please welcome <@${user.id}> to the ${roleArea} team!`)
    .setFooter(config.footer, config.footerImage);

  message.channel.send(accepted).then(message.channel.send(accepted2));
  client.channels.get(config.channels.staffChat).send(staffChatMessage);
}

module.exports.config = {
  name: "accept",
  aliases: ["accept"],
  description: 'Accept an application',
  area: 'Management',
  priority: 7
}
