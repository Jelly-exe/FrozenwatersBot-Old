const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");

module.exports.run = async (client, message, args) => {

  message.delete()

  let arg = args.join(' ');
  let convert = arg.split(";")

  const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-poll [everyone/here/normal]; [poll question]; [poll answer]; [poll answer]` *(Up to 10 answers)*')
    .setFooter(config.footer, config.footerImage)

  const valid = new Discord.RichEmbed()
    .setDescription(`<a:animatedTick:608735122682019870> Successfully sent announcement in <#${config.channels.polls}>`)
    .setFooter(config.footer, config.footerImage)
  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isManagement(message, message.author.id)
  if (perms === false) return;
  
  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//
  if (convert.length < 3) {
    message.channel.send(invalid)
    return;
  }

  let announceGroup;

  if(convert[0].toLowerCase() === "everyone") {
    announceGroup = '@everyone'
  } else if (convert[0].toLowerCase() === "here") {
    announceGroup = '@here'
  } else if (convert[0].toLowerCase() === "normal") {
    announceGroup = `<@&${config.roles.polls}>`
  } else {
    message.channel.send(invalid)
    return;
  }

  let answers = '';

  for (let i = 2; i < convert.length; i++) {
    let number = i - 1
    let emoji = client.emojis.find(x => x.name === `${number}_`)
    answers = answers + `${emoji} ${convert[i]}\n`
  }

  const poll = new Discord.RichEmbed()
      .setTitle(':notepad_spiral: | Poll | :notepad_spiral:')
      .setDescription(convert[1] + '\n\n' + answers)

  let tagger = await client.channels.get(config.channels.polls).send(announceGroup)
  let pollMessage = await client.channels.get(config.channels.polls).send(poll)
  message.channel.send(valid)
  tagger.delete()
  for (let i = 2; i < convert.length; i++) {
    let number = i - 1
    let emoji = client.emojis.find(x => x.name === `${number}_`)
    await pollMessage.react(emoji)
  }
  fs.writeFile(`./reactions/${pollMessage.id}.json`, `{"users": []}`, function (error) {
    if (error) throw error;
  });
}

module.exports.config = {
  name: "poll",
  aliases: [""],
  description: 'Command to do a poll.',
  area: 'Management',
  priority: 7
}
