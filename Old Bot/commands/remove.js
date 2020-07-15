const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you have unsufficient permissions.");
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let username = message.author.username;
  if(!user) return message.channel.send("That user could not be found. Please supply a currect user tag.")

  let theChannel = message.channel;
  let channelName = theChannel.name;
  if (!channelName.startsWith(`ticket-`)) return message.channel.send(`You can't use the remove command outside of a ticket channel!`);

  theChannel.overwritePermissions(user, {
      SEND_MESSAGES: false,
      READ_MESSAGES: false,
      ATTACH_FILES: false
  });

  let embed = new Discord.RichEmbed()
  .setColor(colour)
  .setTitle(`User removed!`)
  .setDescription(`${message.author.tag} has removed ${user} to this ticket!`)
  .setTimestamp()
  .setFooter(`${config.footer}`);

  message.channel.send(embed)

}


module.exports.config = {
  name: "remove",
  aliases: ["removeuser"]
}
