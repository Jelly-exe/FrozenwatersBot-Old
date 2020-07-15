const config = require("../config.json");
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

module.exports.run = async (bot, message, args) => {

    message.delete()
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(message.guild.id);

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
					return message.channel.send(`Please send a link to the youtube video. Correct usage ${config.prefix}play {link}`);
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
    }  
module.exports.config = {
  name: "play",
  aliases: ["song"]
}
