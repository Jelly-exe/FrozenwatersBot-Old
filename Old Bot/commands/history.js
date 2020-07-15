const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
let prefix = config.prefix;

const ms = require("ms");
let punishments = JSON.parse(fs.readFileSync("./punishments.json", "utf8"));
let logchannel = config.punishchannel;

module.exports.run = async (bot, message, args) => {
    let warncounter = 0;
    let bancounter = 0;
    let kickcounter = 0;
    let mutecounter = 0;

    message.delete()
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    //console.log(wUser.id)

    if(!wUser) return message.channel.send("Please specify a user you'd like to look up") 

    let rawdata = fs.readFileSync('./punishments.json');  
    let student = JSON.parse(rawdata);  
    //console.log(student[wUser.id]);

    hUser = student[wUser.id]
    if(!student[wUser.id]) return message.channel.send("**" + wUser.user.username + "** has had no run ins with any moderators")
    
    const history = new Discord.RichEmbed()
		.setColor(0xff2a00)
		.setAuthor("Punishment History")
		.setDescription("**" + wUser.user.username + "**")
		.setTimestamp()
		.setFooter(`${config.footer}`, config.logo);

    let msg = await message.channel.send(history);
    //const outEmbed = message.embeds[0];

    if(hUser.warnreason.length > 0) {
    for(var warnings in hUser.warnreason) {
        //const exampleEmbed = new Discord.RichEmbed(outEmbed).addField("Test warn");
        await msg.edit(history)
        await history.addField("_ _", "Test Warning #" + warncounter)
        console.log("1")
        //message.channel.send("[" + hUser.warndate[warncounter] + "] **" + wUser.user.username + "** was warned for **" + hUser.warnreason[warncounter] + "** by **" + bot.users.get(hUser.warnmod[warncounter]).username + "**")
        warncounter++;

    };
    } 

    if(hUser.banreason.length > 0) {
        message.channel.send("```" + wUser.user.username + "'s History of current bans```")
    for(var bans in hUser.banreason) {
        message.channel.send("[" + hUser.bandate[bancounter] + "] **" + wUser.user.username + "** was banned for **" + hUser.banreason[bancounter] + "** by **" + bot.users.get(hUser.banmod[bancounter]).username + "**")
        bancounter++;

    };
    }

    if(hUser.kickreason.length > 0) {
        message.channel.send("```" + wUser.user.username + "'s History of current kicks```")
    for(var kicks in hUser.kickreason) {
        message.channel.send("[" + hUser.kickdate[kickcounter] + "] **" + wUser.user.username + "** was kicked for **" + hUser.kickreason[kickcounter] + "** by **" + bot.users.get(hUser.kickmod[kickcounter]).username + "**")
        kickcounter++;

    };
    }

    if(hUser.mutereason.length > 0) {
        message.channel.send("```" + wUser.user.username + "'s History of current mutes```")
    for(var mutes in hUser.mutereason) {
        message.channel.send("[" + hUser.mutedate[mutecounter] + "] **" + wUser.user.username + "** was muted for **" + hUser.mutereason[mutecounter] + "** by **" + bot.users.get(hUser.mutemod[mutecounter]).username + "**")
        mutecounter++;

    };
    }
    //message.channel.send("**" + wUser.user.username + "** has had the following punishments;\n **" + student[wUser.id].warns + "** warning(s) for **" + student[wUser.id].reason + "**")
    //message.channel.send("Warnings")
    
}
module.exports.config = {
  name: "history",
  aliases: ["punishments"]
}