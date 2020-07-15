const Discord = require("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (client, message, args) => {
  message.delete();
  let suggestion = args.join(" ");
  let chan = client.channels.get(config.suggestionsChannel);

  const noargs = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`What is your suggestion?\n\`${config.prefix}suggest <suggestion>\``)
  .setTimestamp()
  .setFooter(`${config.footer}`, config.logo);
  const noChan = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`Error: no suggestion channel found`)
  .setTimestamp()
  .setFooter(`${config.footer}`, config.logo);


  if (!suggestion) return message.channel.send(noargs);
  if (!chan) return message.channel.send(noChan);

  const suggestionMSG = new Discord.RichEmbed()
  .setColor(colour)
  .setAuthor("Suggestion from " + message.author.tag, message.author.displayAvatarURL)
  .setDescription(suggestion)
  .setTimestamp()
  .setFooter(`${config.footer}`, config.logo);

let sentEmbed = await chan.send(suggestionMSG);

await sentEmbed.react('⬆');
await sentEmbed.react('⬇');

const sent = new Discord.RichEmbed()
.setColor(colour)
.setDescription(`Your suggestion has been submitted to <#${config.suggestionsChannel}>.`)
.setTimestamp()
.setFooter(`${config.footer}`, config.logo);

message.channel.send(sent).then(msg => msg.delete(2500));

}
module.exports.config = {
    name: "suggest",
    aliases: ["suggestion"]
  }
