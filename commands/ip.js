const Discord = require("discord.js");
const request = require('request');
const config = require("../config-files/main.json");

module.exports.run = async (client, message, args) => {
    request('https://api.mcsrvstat.us/2/167.86.69.112:25565', {json: true}, function (err, res, status) {
      let commandContent = 'You should never be able to see this.....';
      commandContent = 'The IP is `play.frozenwaters.xyz`'
      // if (status.players.online <= 0) {
      //   commandContent = `Hello <@${message.author.id}>,\n\nThere is currently no players online, feel free to join using the IP **play.frozenwaters.xyz**!`
      // }
      // else if (status.players.online == 1) {
      //   commandContent = `Hello <@${message.author.id}>,\n\nThere is currently 1 player online, feel free to join them using the IP **play.frozenwaters.xyz**!`
      // }
      // else {
      //   commandContent = `Hello <@${message.author.id}>,\n\nThere is currently ${status.players.online} players online, feel free to join them using the IP **play.frozenwaters.xyz**!`
      // }
      const embed = new Discord.RichEmbed()
        .setDescription(commandContent)
        .setFooter(config.footer, config.footerImage)

      message.channel.send(embed)
    });
}

module.exports.config = {
  name: "ip",
  aliases: ["ip"],
  description: 'Show the server IP + amount of online players',
  area: 'General',
  priority: 1
}
