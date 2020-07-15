const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;
const fs = require("fs");
const moment = require('moment');
let punishments = JSON.parse(fs.readFileSync("./punishments.json", "utf8"));
let logchannel = config.punishchannel;

module.exports.run = async (client, message, args) => {
  
  let timestamp = message.createdTimestamp
  let member = message.mentions.members.first()
  let reason = args.join(" ").slice(22);
  message.delete()

  if(message.member.hasPermission("KICK_MEMBERS")) {

    if(!punishments[member.id]) punishments[member.id] = {
      "id": punishments[member.id],
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

  
    if(member === undefined || reason === " "){
      message.channel.send("**Incorrect usage;** Use ``" + `${config.prefix}` + "kick <user> <reason>``").then(msg => msg.delete(2500));
    }
  
    else if(!member.kickable){
      message.channel.send("Sorry, I'm unable kick selected user.").then(msg => msg.delete(2500));
    }
  
    else if(args.length >= 2 && message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0])) && member.kickable){
      message.guild.member(member).kick(reason);
      message.channel.send("**Successfully** kicked **" + member + "** for **" + reason + "**.").then(msg => msg.delete(2500));
      const mrBoot = new Discord.RichEmbed()
	    .setColor(colour)
	    .setAuthor("Kick | " + `${config.name}`)
      .setDescription("**Successfully** kicked **" + member + "** for **" + reason + "**.")
      .setTimestamp()
      .setFooter(`${config.footer}`, config.logo);
      let sentLog = await client.channels.get(logchannel).send(mrBoot);

      punishments[member.id].kicks++;
      punishments[member.id].kickreason.push(reason)
      punishments[member.id].kickmod.push(message.author.id)
      punishments[member.id].kickdate.push(moment().format('D/M/Y'))

      fs.writeFile("./punishments.json", JSON.stringify(punishments, null, 2), (err) => {
        if (err) console.log(err)
        });
    }
  
    else {
      message.guild.member(member).kick("Violating ToS");
      message.channel.send("**Successfully** been kicked **" + member + "** for **Violating ToS**").then(msg => msg.delete(2500));

      punishments[member.id].kicks++;
      punishments[member.id].kickreason.push("Violating ToS")
      punishments[member.id].kickmod.push(message.author.id)
      punishments[member.id].kickdate.push(moment().format('D/M/Y'))

      fs.writeFile("./punishments.json", JSON.stringify(punishments, null, 2), (err) => {
        if (err) console.log(err)
        });
    }
  }
  else {
    message.channel.send("You are **NOT ALLOWED** to use ``-kick``.\n *If you believe this is a mistake, please contact* ***Mackenzie Molloy#2019*** *.* ").then(msg => msg.delete(2500));
  }
}
module.exports.config = {
  name: "kick",
  aliases: ["boot"]
}