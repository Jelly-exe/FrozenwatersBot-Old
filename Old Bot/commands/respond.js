const Discord = require("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (client, message, args) => {
  message.delete();
  let suggestion = args.join(" ");
  let chan = client.channels.get('598136853681668097');

  const noargs = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`What is your response?\n\`${config.prefix}respond <response>\``)
  .setTimestamp()
  .setFooter(`${config.footer}`, config.logo);

  const noChan = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`Error: channel not found`)
  .setTimestamp()
  .setFooter(`${config.footer}`, config.logo);


  if (!suggestion) return message.channel.send(noargs);
  if (!chan) return message.channel.send(noChan);

  const suggestionMSG = new Discord.RichEmbed()
  .setColor(colour)
  .setAuthor("Response from " + message.author.tag, message.author.displayAvatarURL)
  .setDescription(suggestion)
  .setTimestamp()
  .setFooter(`${config.footer}`, config.logo);

let sentEmbed = await chan.send(suggestionMSG);

await sentEmbed.react(message.guild.emojis.find(x => x.name === 'enabled'));
await sentEmbed.react(message.guild.emojis.find(x => x.name === 'disabled'));

const sent = new Discord.RichEmbed()
.setColor(colour)
.setDescription(`You have submitted a response to the poll! Feel free to also upvote other people's responses at <#598136853681668097>.`)
.setTimestamp()
.setFooter(`${config.footer}`, config.logo);

message.channel.send(sent).then(msg => msg.delete(2500));

}
module.exports.config = {
    name: "respond",
    aliases: ["responce"]
  }
