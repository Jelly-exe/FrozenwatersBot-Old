const Discord = require ("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  const config = require("../config.json");
  const colour = config.colour;
  const HelperAppsOpen = config.HelperApplications;
  const DeveloperAppsOpen = config.DeveloperApplications;
  const BuilderAppsOpen = config.BuilderApplications;
  let FounderRole = message.guild.roles.find(x => x.name === "Founder")

  message.delete()
  if(message.member.roles.has(FounderRole.id)) {
  if(args.length === 1 && (args[0] === "3" || args[0].toLowerCase() === "helper" || args[0].toLowerCase() === "moderator")) {
    if(HelperAppsOpen === "true") {
      config.HelperApplications = "false";
      fs.writeFileSync('./config.json', JSON.stringify(config), function (error) {
        if (error) throw error;
      });
      message.channel.send("<:disabled:575019099139342356> **Disabled** Helper applications.").then(msg => msg.delete(2500));
    }
    if(HelperAppsOpen === "false") {
      config.HelperApplications = "true";
      fs.writeFileSync('./config.json', JSON.stringify(config), function (error) {
        if (error) throw error;
      });
      message.channel.send("<:enabled:575019088821092381> **Enabled** Helper applications.").then(msg => msg.delete(2500));
    }
  }
  else if(args.length === 1 && (args[0] === "2" || args[0].toLowerCase() === "dev" || args[0].toLowerCase() === "developer")) {
    if(DeveloperAppsOpen === "true") {
      config.DeveloperApplications = "false";
      fs.writeFileSync('./config.json', JSON.stringify(config), function (error) {
        if (error) throw error;
      });
      message.channel.send("<:disabled:575019099139342356> **Disabled** Developer applications.").then(msg => msg.delete(2500));
    }
    if(DeveloperAppsOpen === "false") {
      config.DeveloperApplications = "true";
      fs.writeFileSync('./config.json', JSON.stringify(config), function (error) {
        if (error) throw error;
      });
      message.channel.send("<:enabled:575019088821092381> **Enabled** Developer applications.").then(msg => msg.delete(2500));
    }
  }
  else if(args.length === 1 && (args[0] === "1" || args[0].toLowerCase() === "builder" || args[0].toLowerCase() === "constructor")) {
    if(BuilderAppsOpen === "true") {
      config.BuilderApplications = "false";
      fs.writeFileSync('./config.json', JSON.stringify(config), function (error) {
        if (error) throw error;
      });
      message.channel.send("<:disabled:575019099139342356> **Disabled** Builder applications.").then(msg => msg.delete(2500));
    }
    if(BuilderAppsOpen === "false") {
      config.BuilderApplications = "true";
      fs.writeFileSync('./config.json', JSON.stringify(config), function (error) {
        if (error) throw error;
      });
      message.channel.send("<:enabled:575019088821092381> **Enabled** Builder applications.").then(msg => msg.delete(2500));
    }
  }
  else {
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Toggle Applications | ${config.name}`)
    .setDescription("\nYou can toggle the following applications;\n**»** Builder\n**»** Developer\n**»** Helper")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));
  }
  }
  else {
    message.channel.send("<:disabled:575019099139342356> You are **NOT** allowed to use ``-toggleapplications``.").then(msg => msg.delete(2500));
  }
}
module.exports.config = {
  name: "toggleapplications",
  aliases: ["toggleapps"]
}
