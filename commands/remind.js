const Discord = require("discord.js");
const request = require('request');
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");
const fs = require('fs');
const ms = require('ms');

module.exports.run = async (client, message, args) => {

    const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-remind [time] [reminder]`')
    .setFooter(config.footer, config.footerImage)

    //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

    let perms = frozenwaters.isStaff(message, message.author.id)
    if (perms === false) return;

    //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

    let reminderTime = args[0];
    if (!reminderTime) {
        message.channel.send(invalid);
        return;
    }

    let reminder = args.slice(1).join(" ");

    const valid = new Discord.RichEmbed()
        .setTitle('I will remind you to...')
        .setDescription(reminder)
        .addField('In...', reminderTime)
        .setFooter(config.footer, config.footerImage)
    message.channel.send(valid);

    setTimeout(function() {
        const valid2 = new Discord.RichEmbed()
            .setTitle('Reminder!')
            .setDescription(reminder)
            .setFooter(config.footer, config.footerImage)

        message.channel.send(`<@${message.author.id}>`);
        message.channel.send(valid2);
    }, ms(reminderTime));
}

module.exports.config = {
  name: "remind",
  aliases: [""],
  description: 'Set a reminder',
  area: 'Staff',
  priority: 5
}
