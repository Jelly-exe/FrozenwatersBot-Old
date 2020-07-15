const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const config = require("../config.json");
const colour = config.colour;
const moment = require('moment');
let punishments = JSON.parse(fs.readFileSync("./punishments.json", "utf8"));
let logchannel = config.punishchannel;

module.exports.run = async (bot, message, args) => {

    let timestamp = message.createdTimestamp
    message.delete()

    if(message.member.hasPermission("MANAGE_MESSAGES")) {

    let tomute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
    let reason = args.slice(2).join(' ')
    let muterole = message.guild.roles.find('name', "Muted");
    //start of create role
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(mutedrole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            })
        }catch(e){
            console.log(e.stack);
        }
    } //end of create role

    if(!punishments[tomute.id]) punishments[tomute.id] = {
        "id": punishments[tomute.id],
        "warns": [0],
        "warnreason": [],
        "warnmod": [],
        "warndate": [],
        "bans": [],
        "banmod": [],
        "bandate": [],
        "banreason": [],
        "kicks": [],
        "kickmod": [],
        "kickdate": [],
        "kickreason": [],
        "mutes": [],
        "mutemod": [],
        "mutedate": [],
        "mutereason": [] 
      };

    fs.writeFile("./punishments.json", JSON.stringify(punishments, null, 2), (err) => {
      if (err) console.log(err)
    });

    let mutetime = args[1];

    if(tomute === undefined || tomute === null || mutetime === undefined || mutetime === null) {
        const help = new Discord.RichEmbed()
        .setColor(colour)
        .setAuthor("Tempmute | " + `${config.name}`)
        .setDescription("**Incorrect usage;** use " + `${config.prefix}` + "tempmute [user] [time]")
        .setTimestamp()
        .setThumbnail("https://media.giphy.com/media/TqiwHbFBaZ4ti/giphy-downsized.gif")
        .setFooter(`${config.footer}`, config.logo);

        let sentEmbed = await message.channel.send(help).then(msg => msg.delete(2500));
    }
    //if(!tomute) return message.reply("Couldn't find selected user.");
    else if(!tomute === undefined || null){
        if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!").then(msg => msg.delete(2500));
    }
    else if(!mutetime) return message.reply("You didn't specify a time!").then(msg => msg.delete(2500));

    else {
        await(tomute.addRole(muterole.id));
        const nowMuted = new Discord.RichEmbed()
	    .setColor(colour)
	    .setAuthor("Tempmute | " + `${config.name}`)
        .setDescription("**Successfully** tempmuted **" + tomute + "** for **" + `${ms(ms(mutetime))}` + "** for **" + reason + "**.")
        .setTimestamp()
	    .setFooter(`${config.footer}`, config.logo);

        punishments[tomute.id].mutes++;
        punishments[tomute.id].mutereason.push(reason)
        punishments[tomute.id].mutemod.push(message.author.id)
        punishments[tomute.id].mutedate.push(moment().format('D/M/Y'))

        fs.writeFile("./punishments.json", JSON.stringify(punishments, null, 2), (err) => {
            if (err) console.log(err)
        });

        let sentEmbed = await message.channel.send(nowMuted).then(msg => msg.delete(2500));
        let sentLog = await bot.channels.get(logchannel).send(nowMuted);

    //message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
        setTimeout(function(){
            tomute.removeRole(muterole.id);
            message.channel.send(`<@${tomute.id}>'s mute has ended!`)
        }, ms(mutetime));
    }
}
else {
    message.channel.send("You do **not** have permission to execute this command! :no_entry:").then(msg => msg.delete(2500));
}
}

module.exports.config = {
    name: "tempmute",
    aliases: ["mute"]
}