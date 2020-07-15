const Discord = require ("discord.js");
const config = require("../config-files/main.json");
const log = require('leekslazylogger');
const fs = require('fs');

module.exports.run = async (client, message, args) => {
	fs.readdir("./commands/", (err, files) => {
		let commands = {};

		let jsfile = files.filter(f => f.split(".").pop() === "js")

		for (i = 1; i < 11; i++) {

			jsfile.forEach((f, a) => {
				let props = require(`../commands/${f}`);
				if (props.config.priority !== i) return;

				if (!commands[props.config.area]) {
					commands[props.config.area] = `\`${config.prefix}` + props.config.name + '` ● ' + props.config.description + '\n';
				} 

				else {
					commands[props.config.area] = commands[props.config.area] + '`-' + props.config.name + '` ● ' + props.config.description + '\n';
				}

		});
		
		}
		const commandsArray = Object.entries(commands)

		const embed = new Discord.RichEmbed()
			.setTitle('Help Menu')
			.setDescription('These are all the commands that can be run with the Frozenwaters bot!')
			.setFooter(config.footer, config.footerImage)

		commandsArray.forEach(function(value) {
			embed.addField(value[0], value[1])
		});

		message.channel.send(embed)
	});
}

module.exports.config = {
	name: "help",
	aliases: ["helpme"],
	description: 'This command',
	area: 'General',
	priority: 1
}
