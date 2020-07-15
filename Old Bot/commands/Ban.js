const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;
const fs = require("fs");
const moment = require('moment');
let punishments = JSON.parse(fs.readFileSync("./punishments.json", "utf8"));

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first()
  let reason = args.join(" ").slice(22);
  let timestamp = message.createdTimestamp

  message.delete()

  if(message.member.hasPermission("BAN_MEMBERS")) {

    if(!user) return message.channel.send("Please specify a user")

    if(!punishments[user.id]) punishments[user.id] = {
      "id": punishments[user.id],
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

    if(args.length >= 2 && message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))){
      message.guild.member(user).ban(reason);
      message.channel.send("Successfully banned **" + user.user.username + "** for **" + reason + "**")

      punishments[user.id].bans++;
      punishments[user.id].banreason.push(reason)
      punishments[user.id].banmod.push(message.author.id)
      punishments[user.id].bandate.push(moment().format('D/M/Y'))

      fs.writeFile("./punishments.json", JSON.stringify(punishments, null, 2), (err) => {
        if (err) console.log(err)
        });
    }

    else{
      message.channel.send("Incorrect usage; ``" + `${config.prefix}` + "ban <user> <reason>``")
    }
  }
}
module.exports.config = {
  name: "ban",
  aliases: ["banuser"]
}