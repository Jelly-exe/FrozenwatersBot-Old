const Discord = require("discord.js");
const config = require("../config-files/main.json");

exports.run = async (client, message, args) => {
	
	const invalid = new Discord.RichEmbed()
		.setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-rps [user]`')
		.setFooter(config.footer, config.footerImage)
	
	let user1 = message.author
	let user2 = message.mentions.users.first()

	if (!user2|| user1 == user2) {
		message.channel.send(invalid)
		return;
	}
	const accept = new Discord.RichEmbed()
	.setTitle('New Challenger!')
	.setDescription(`<@${user1.id}> has challenged you to a game of Rock, Paper, Scissors!\n\nTo accept, type \`accept\` in the chat! This will timeout in 15 seconds.`)

	const filter2 = (msg) => {
		return msg.content == 'accept' && msg.author == user2;
	};

	message.channel.send(accept)

	message.channel.awaitMessages(filter2, { maxMatches: 1, time: 15000, errors: ["time"]})
	.then(answer => {
		const embed2 = new Discord.RichEmbed()
		.setTitle('Welcome to Rock, Paper, Scissors!')
		.setDescription('You are Player 1, please select `rock`, `paper` or `scissors`.\n\n*Must be in lowercase*')

		const embed3 = new Discord.RichEmbed()
		.setTitle('Welcome to Rock, Paper, Scissors!')
		.setDescription('You are Player 2, please wait for player 1 to select their option.')

		const embed4 = new Discord.RichEmbed()
		.setTitle('Your Turn!')
		.setDescription('Please select `rock`, `paper` or `scissors`.\n\n*Must be in lowercase*')

		let user1id;
		let user2id;

		user2.send(embed3).then((newMsg3) => {
			user2id = newMsg3.channel.id
		});

		user1.send(embed2).then((newMsg1) => {
			user1id = newMsg1.channel.id

			const embed = new Discord.RichEmbed()
			.setDescription(`Please click the links below to play:\n\n**Player 1 (${user1.username}):** [Click Here](https://discordapp.com/channels/@me/${user1id})\n**Player 2 (${user2.username}):** [Click Here](https://discordapp.com/channels/@me/${user2id})`)
			.setFooter(config.footer, config.footerImage)

			message.channel.send(embed)

			const filter = (msg) => {
				return msg.content == 'rock'|| msg.content == 'paper'|| msg.content == 'scissors' || (msg.content == 'god' && (msg.author.id == '287874798049165313' || msg.author.id == '278548721778688010'));
			};

			newMsg1.channel.awaitMessages(filter, { maxMatches: 1})
			.then(user1answer => {
				let USER1ANSWER = user1answer;
				const embed6 = new Discord.RichEmbed()
				.setDescription('Answer submitted!')
				user1.send(embed6)
				user2.send(embed4).then((newMsg2) => {

					const filter = (msg) => {
						return msg.content == 'rock'|| msg.content == 'paper'|| msg.content == 'scissors' || (msg.content == 'god' && (msg.author == '287874798049165313' || msg.author == '278548721778688010'));
					};

					newMsg2.channel.awaitMessages(filter, { maxMatches: 1})
					.then(user2answer => {
						let USER2ANSWER = user2answer;

						let toSend = '';
						let winner;

						const embed7 = new Discord.RichEmbed()
						.setDescription('Answer submitted!')
						user2.send(embed7)

						let user = '';

						if (USER1ANSWER.first().content == "god") {
							user = user1
						} else if (USER2ANSWER.first().content == "god") {
							user = user2
						}
						if (USER1ANSWER.first().content == "god" || USER2ANSWER.first().content == "god") {
							toSend = user.username + " won!"
							winner = user
						}

						if (USER1ANSWER.first().content == "rock" && USER2ANSWER.first().content == "rock") {
							toSend = "Nobody, both players picked Rock, this is a draw!"
						}

						else if (USER1ANSWER.first().content == "rock" && USER2ANSWER.first().content == "paper") {
							toSend = user2.username + " because Paper beats Rock!"
							winner = user2
						}

						else if (USER1ANSWER.first().content == "rock" && USER2ANSWER.first().content == "scissors") {
							toSend = user1.username + " wins because Rock beats Scissors"
							winner = user1
						}

						else if (USER1ANSWER.first().content == "paper" && USER2ANSWER.first().content == "rock") {
							toSend = user1.username + " because Paper beats Rock!"
							winner = user1
						}

						else if (USER1ANSWER.first().content == "paper" && USER2ANSWER.first().content == "paper") {
							toSend = "Nobody, both players picked Paper, this is a draw!"
						}

						else if (USER1ANSWER.first().content == "paper" && USER2ANSWER.first().content == "scissors") {
							toSend = user2.username + " because Scissors beats Paper!"
							winner = user2
						}

						else if (USER1ANSWER.first().content == "scissors" && USER2ANSWER.first().content == "rock") {
							toSend = user2.username + " because Rock beats Scissors"
							winner = user2
						}

						else if (USER1ANSWER.first().content == "scissors" && USER2ANSWER.first().content == "paper") {
							toSend = user1.username + " because Scissors beats Paper!"
							winner = user1
						}

						else if (USER1ANSWER.first().content == "scissors" && USER2ANSWER.first().content == "scissors") {
							toSend = "Nobody, both players picked scissors, this is a draw!"
						}

						else {
							toSend = '.....'
						}

						if (!winner) {

						} else {
							//Give the user money
						}

						const winnerEmbed = new Discord.RichEmbed()
						.setTitle('And the winner is...')
						.setDescription(toSend)

						user1.send(winnerEmbed)
						user2.send(winnerEmbed)
						message.channel.send(winnerEmbed)
					});
				});
			});
		});
	})
	.catch(collected => {
		const timeout = new Discord.RichEmbed()
		.setDescription('<a:animatedCross:608735120303718460> Challenge has timed out!')
		message.channel.send(timeout);
	});
}

module.exports.config = {
  name: "rps",
  aliases: [""],
  description: 'Rock Paper Scissors command.',
  area: 'Fun',
  priority: 1
}
