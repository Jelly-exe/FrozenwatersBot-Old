const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const economy = require("../Eco-XP/economy.json");
const frozenwaters = require("../frozenwaters.js");

exports.run = async (client, message, args) => {
	let user;

	let perms = frozenwaters.isManagement(message, message.author.id)
	if (perms === false) user = message.author
	else user = message.mentions.users.first()

	if (!user) {
		user = message.author
	}

	if (!economy[user.id]) {
		economy[user.id] = "100"
        fs.writeFileSync(`./Eco-XP/economy.json`, JSON.stringify(economy), function (error) {
			if (error) throw error;
		});	
	}
	let balance = economy[user.id]

	const embed = new Discord.RichEmbed()
		.setTitle(`${user.username}'s Balance`)
		.setDescription(`£${balance}`)
		.setFooter(config.footer, config.footerImage)

	message.channel.send(embed)
}
module.exports.config = {
  name: "bal",
  aliases: ["balance"],
  description: 'Get your balance.',
  area: 'Economy',
  priority: 1
}
