let servername = "CHANGEME" 
let prefix = "!" 
let botname = "CHANGEME" 
let W_message = true 
let Bot_A = "Something existing" 
let Bot_Version = "V1" 
let api = "AIzaSyAzc4JS2XZFc7r6mYYCNlbFTU-hhoBj0sY"

const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, Util } = require('discord.js');
const member = new Discord.Client();
const cmd = new Discord.Client();
const message = new Discord.Client();
const tokenfile = require("./token.json");
const token = require("./token.json");
const bot = new Discord.Client({disableEveryone: true});
const chat = new Discord.Client();
const send = new Discord.Client();
const createdAt = new Discord.Client();
const footer = botname + " " + Bot_Version 
const ms = require('ms');
const fs = require('fs');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const queue = new Map();
const youtube = new YouTube(api);




bot.on("ready", async () => {
  console.log(`${bot.user.username} has started! This means the bot is ready to go :)`)

  bot.user.setActivity(Bot_A);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  const args = message.content.split(' ');
  const searchString = args.slice(1).join(' ');
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
    if (cmd === `${prefix}help`){
		let helpEmbed = new Discord.RichEmbed()
		.setFooter(footer)
		.setTitle("**" + botname + " help commands**")
		.addField(prefix + "play {youtube link}", "Plays a song if you are in a voice channel")
		.addField(prefix + "skip", "Skips the current song playing")
		.addField(prefix + "stop", "Stops the bot from playing songs")
		.addField(prefix + "volume {set}", "Sets the volume")
		.addField(prefix + "np","Shows what is currently playing")
		.addField(prefix + "queue", "Shows the queue")
		.addField(prefix + "pause", "Pauses the song")
		.addField(prefix + "resume", "Resumes the paused song")
		message.channel.send(helpEmbed)
	}
	if (cmd === `${prefix}play`) {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('You need to be in a public voice channel for me to play music');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, give me permission please');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, give me permission please');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			let playlist_Embed = new Discord.RichEmbed()
			.setFooter(footer)
			.setTitle("✅ Playlist: **${playlist.title}** has been added to the queue!")
			return message.channel.send(playlist_Embed);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					return message.channel.send("Please send a link to the youtube video. Correct usage !play {link}");
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err); // Logs to console
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('I could not obtain any search results. Try using the direct youtube link');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
	} else if (cmd === `${prefix}skip`) {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (cmd === `${prefix}stop`) {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (cmd === `${prefix}volume`) {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		if (!args[2]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[2];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[2] / 5);
		return message.channel.send(`I set the volume to: **${args[2]}**`);
	} else if (cmd === `${prefix}np`) {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (cmd === `${prefix}queue`) {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (cmd === `${prefix}pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Paused the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	} else if (cmd === `${prefix}resume`) {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}

	return undefined;


async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		let QEmbed = new Discord.RichEmbed()
		.setFooter(footer)
		.setTitle("✅ **${song.title}** has been added to the queue!")
		.setTimestamp()
		return message.channel.send(QEmbed);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.Try restarting the bot') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    let start_Embed = new Discord.RichEmbed()
	.setFooter(footer)
	.setTitle("🎶 Started playing: " + song.title)
	serverQueue.textChannel.send(start_Embed);
}


});

bot.login(token.token);
