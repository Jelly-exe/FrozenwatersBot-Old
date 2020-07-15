const config = require('../config-files/main.json');
const Discord = require('discord.js');
const log = require('leekslazylogger')
const fs = require("fs");

const client = new Discord.Client();

module.exports = async (client, guildMember) => {
    
    const welcome = new Discord.RichEmbed()
        .setTitle('A Member Left!')
        .setDescription(`<@${guildMember.user.id}> has left the discord!\n\nWe hope you will come back soon!`)
        .setThumbnail(guildMember.user.avatarURL)
        .setFooter(config.footer, config.footerImage)
    client.channels.get(config.channels.welcome).send(welcome);
}
