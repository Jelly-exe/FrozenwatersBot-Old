const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;
const TicketRole = config.TicketRole;
let logchannel = config.logschannel;

module.exports.run = async (bot, message, args) => {
  let closerole = message.guild.roles.find(x => x.name === TicketRole)
  message.delete();
  if (!closerole) return message.reply("you have insufficient permissions.");
    let username = message.author.username;

    let channelName = message.channel.name
    if (!message.channel.name.startsWith("ticket-")) return message.channel.send(`:x: You can't use the close command outside of a ticket channel!`);

    const closure = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription("**" + message.channel.name + "** was archived by **" + message.author.username + "**")
    .setTimestamp()

    bot.channels.get(logchannel).send(closure);
    let category = message.guild.channels.find(c => c.name == "ARCHIVE" && c.type == "category")
    await message.channel.setParent(category.id)
    await message.channel.permissionOverwrites.deleteAll()
    await message.channel.overwritePermissions(message.channel.guild.defaultRole, { VIEW_CHANNEL: false });


}
module.exports.config = {
  name: "close",
  aliases: ["closeticket"]
}
