const Discord = require ("discord.js");
const config = require("../config-files/main.json");
const log = require('leekslazylogger');
const fs = require('fs');

module.exports.run = async (client, message, args) => {
    let suggestion = args.join(" ");
    let channel = client.channels.get(config.channels.suggestions)

    const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-suggest [suggestion]`')
    .setFooter(config.footer, config.footerImage)

    if (args.length < 1) {
        message.channel.send(invalid)
        return;
    }

    const suggestionMessage = new Discord.RichEmbed()
    .setTitle('Suggestion from ' + message.author.username)
    .setDescription(suggestion)
    .setFooter(config.footer, config.footerImage);

    const msg = await channel.send(suggestionMessage)

    await msg.react('✅')
    await msg.react('❌')
    
    const valid = new Discord.RichEmbed()
    .setDescription(`<a:animatedTick:608735122682019870> Successfully sent suggestion in <#${config.channels.suggestions}>`)
    .setFooter(config.footer, config.footerImage)

    message.channel.send(valid)
}
module.exports.config = {
  name: "suggest",
  aliases: ["suggestion"],
  description: 'Make a suggestion, this can be anything to do with the server or other related things.',
  area: 'General',
  priority: 1
}
