const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;
const categoryID = config.TicketCategory;
const fs = require("fs");
const TicketRole = config.TicketRole;

module.exports.run = async (bot, message, args) => {

    message.delete()
    let text = args.slice(1).join(' ')
    if(message.author.id === "287874798049165313" || "278548721778688010") {

      if(args[0] === "embed") {

        const embed = new Discord.RichEmbed()
        .setColor(colour)
        .setDescription(text)
    
        message.channel.send(embed);

      }
      else if(args[0] === "normal") {

        message.delete()
        message.channel.send(text)
      }

      else {
        message.author.send("You've incorrectly used **-message**, the correct format is ``-message [normal/emebed] [message]``.\n\nHere is a copy of your command;\n``" + message.content + "``")
        message.delete()
      }
    }
    else {
    }

}
module.exports.config = {
  name: "message",
  aliases: ["text"]
}
