const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (bot, message, args) => {
  message.delete();

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!user) return message.channel.send("That user could not be found. Please supply a correct user tag.")

  let channelName = message.channel.name;
  if (!channelName.startsWith(`ticket-`)) return message.channel.send(`You can't use the add command outside of a ticket channel!`);

  message.channel.overwritePermissions(user, {
      SEND_MESSAGES: true,
      READ_MESSAGES: true,
      ATTACH_FILES: true
  });

  let embed = new Discord.RichEmbed()
  .setColor(colour)
  .setTitle(`User added!`)
  .setDescription(`${message.author.tag} has added ${user} to this ticket!`)
  .setTimestamp()
  .setFooter(`${config.footer}`);

  message.channel.send(embed)

}

module.exports.config = {
  name: "add",
  aliases: ["adduser"]
}
