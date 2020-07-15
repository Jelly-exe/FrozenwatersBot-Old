const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config.json");
const colour = 0x992d22;
const AnnounceChannel = config.AnnouncementChannel;

module.exports.run = async (bot, message, args) => {

    const Management = message.guild.roles.find(x => x.name === "Management")

    let arg = args.join(' ');
    let convert = arg.split(";")

    let announcer;
    if(message.author.id === "278548721778688010") {
        announcer = "Elliot Frost"
    }
    else if(message.author.id === "287874798049165313"){
        announcer = "Mackenzie Molloy"
    }

    message.delete()
    if(message.member.roles.has(Management.id)) {
        if(args.length >= 3 && (convert[0] === "1" || convert[0].toLowerCase() === "everyone")) {

            let announcement = new Discord.RichEmbed()

            .setColor(0x42f4d1)
            .setTitle(convert[1])
            .setDescription(convert[2] + "\n\nRegards,\n" + announcer + " - FrozenWaters Management")
            //.setThumbnail(message.author.avatarURL)

            let tagger = await bot.channels.get(AnnounceChannel).send(`@everyone`)
            bot.channels.get(AnnounceChannel).send(announcement)
            tagger.delete()

        }
        else if(args.length >= 3 && (convert[0] === "2" || convert[0].toLowerCase() === "here")) {

            let announcement = new Discord.RichEmbed()

            .setColor(0x42f4d1)
            .setTitle(convert[1])
            .setDescription(convert[2] + "\n\nRegards,\n" + announcer + " - FrozenWaters Management")
            //.setThumbnail(message.author.avatarURL)

            let tagger = await bot.channels.get(AnnounceChannel).send(`@here`)
            bot.channels.get(AnnounceChannel).send(announcement)
            tagger.delete()

        }
        else if(args.length >= 3 && (convert[0] === "3" || convert[0].toLowerCase() === "normal")) {

            let announcement = new Discord.RichEmbed()

            .setColor(0x42f4d1)
            .setTitle(convert[1])
            .setDescription(convert[2] + "\n\nRegards,\n" + announcer + " - FrozenWaters Management")
            //.setThumbnail(message.author.avatarURL)

            bot.channels.get(AnnounceChannel).send(announcement)

        }
        else{
            message.channel.send("<:disabled:575019099139342356> You have **incorrectly** supplied arguements. Please use the correct format;\n``-announce [everyone/here/normal]; [announcement title]; [announcement description]``").then(msg => msg.delete(5000));
        }
    }
    else {
        message.channel.send("<:disabled:575019099139342356> You are **NOT** allowed to use ``-announce``.").then(msg => msg.delete(2500));
    }

}
module.exports.config = {
  name: "announce",
  aliases: ["announcement"]
}
