const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;
const categoryID = config.TicketCategory;
const fs = require("fs");
const TicketRole = config.TicketRole;

module.exports.run = async (bot, message, args) => {

    let text = args.slice(1).join(' ')
    if(message.author.id === "287874798049165313" || "278548721778688010") {

        const embed = new Discord.RichEmbed()
        .setColor(colour)
		.setTitle("Welcome to the Frozenwaters Discord!")
        .setDescription("Frozenwaters is a minecraft server that was built out of the ashes of PolarcraftMC, the server is owned by <@278548721778688010> and <@287874798049165313>. Here, we have some simple rules that as long as you follow, you will be welcome here!")
    
        message.channel.send(embed)

		const embed2 = new Discord.RichEmbed()
        .setColor(colour)
		.setTitle(":pushpin: Chat Rules :pushpin:")
        .setDescription("__Rule 1:__ No Use Of Curse Words, Racial Slurs, Or Sexual Slurs.\n**Rule 1:** No Use Of Curse Words, Racial Slurs, Or Sexual Slurs.")
    
		message.channel.send(embed2)
		
		const embed3 = new Discord.RichEmbed()
        .setColor(colour)
		.setTitle(":microphone: Voice Chat Rules :microphone:")
        .setDescription("These are the voice chat rules: testing")
    
        message.channel.send(embed3)

}
}
module.exports.config = {
  name: "thing2",
  aliases: ["rulesmessage"]
}