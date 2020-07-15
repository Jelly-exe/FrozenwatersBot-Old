const config = require('../config-files/main.json');
const Discord = require('discord.js');
const log = require('leekslazylogger')
const fs = require("fs");

const client = new Discord.Client();

module.exports = async (client, guildMember) => {

    const welcome = new Discord.RichEmbed()
        .setTitle('New Member!')
        .setDescription(`<@${guildMember.user.id}> has joined the discord!\n\n● To apply for a role, use \`-apply\`\n● To open a ticket, use \`-new\`\n● For more commands, use \`-help\``)
        .setThumbnail(guildMember.user.avatarURL)
        .setFooter(config.footer, config.footerImage)
    client.channels.get(config.channels.welcome).send(welcome);
}
