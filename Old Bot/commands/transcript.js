const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	if (message.channel.parent.name === "TICKETS" || message.channel.parent.name === "ARCHIVE") {
		message.channel.send(`${message.author}, here is your requested attachment:`, { files: [`./tickets/${message.channel.id}.html`] });
	}
	else {
		message.channel.send(':x: This command will only work inside a ticket.')
	}
}
module.exports.config = {
	name: "transcript",
	aliases: ["script"]
  }