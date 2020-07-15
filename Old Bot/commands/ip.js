const Discord = require ("discord.js");
var request = require('request');
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (bot, message, args) => {

    request('https://api.mcsrvstat.us/2/167.86.69.112:25565', {json: true}, function (err, res, status) {

    if(status.players.online <= 0) {
    const ip = new Discord.RichEmbed()
    .setColor(0x14e1fc)
    .setAuthor("IP")
    .setDescription("Hello **" + message.author.username + "**,\nYou can join the " + status.players.online + " *(RIP)* players online today @ **Play.FrozenWaters.Xyz**!")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(ip); 
    }

    else if(status.players.online == 1) {

    const ip = new Discord.RichEmbed()
    .setColor(0x14e1fc)
    .setAuthor("IP")
    .setDescription("Hello **" + message.author.username + "**,\nYou can join the " + status.players.online + " other player online today @ **Play.FrozenWaters.Xyz**!")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);
    
    message.channel.send(ip); 
    }

    else {

    const ip = new Discord.RichEmbed()
    .setColor(0x14e1fc)
    .setAuthor("IP")
    .setDescription("Hello **" + message.author.username + "**,\nYou can join the " + status.players.online + " players online today @ **Play.FrozenWaters.Xyz**!")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);
    
    message.channel.send(ip); 
    }

    });

    message.delete()

}
module.exports.config = {
  name: "ip",
  aliases: ["address"]
}
