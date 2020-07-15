const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const applications = require('../config-files/applications.json');
const frozenwaters = require("../frozenwaters.js");

exports.run = async (client, message, args) => {

  const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-toggle [helper/builder/developer/configurator]`')
    .setFooter(config.footer, config.footerImage)
  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isFounder(message, message.author.id)
  if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  const HelperAppsOpen = applications.helper;
  const DeveloperAppsOpen = applications.developer;
  const BuilderAppsOpen = applications.builder;
  const ConfiguratorAppsOpen = applications.configurator;

  if (args.length < 1) {
    message.channel.send(invalid)
    return;
  }
  let finalMessage= '';

  //-----------------------[ Helper ]-----------------------//
  if (args[0] == 'helper' && HelperAppsOpen == true) {
    applications.helper = false
    finalMessage = 'Helper applications **disabled**.'
  }

  else if (args[0] == 'helper' && HelperAppsOpen == false) {
    applications.helper = true
    finalMessage = 'Helper applications **enabled**.'
  }

  //-----------------------[ Builder ]-----------------------//
  else if (args[0] == 'builder' && BuilderAppsOpen == true) {
    applications.helper = false
    finalMessage = 'Builder applications **disabled**.'
  }
  else if (args[0] == 'builder' && BuilderAppsOpen == false) {
    applications.helper = true
    finalMessage = 'Builder applications **enabled**.'
  }

  //-----------------------[ Developer ]-----------------------//
  else if (args[0] == 'developer' && DeveloperAppsOpen == true) {
    applications.helper = false
    finalMessage = 'Developer applications **disabled**.'
  }

  else if (args[0] == 'developer' && DeveloperAppsOpen == false) {
    applications.helper = true
    finalMessage = 'Developer applications **enabled**.'
  }

  //-----------------------[ Configurator ]-----------------------//
  else if (args[0] == 'configurator' && ConfiguratorAppsOpen == true) {
    applications.helper = false
    finalMessage = 'Configurator applications **disabled**.'
  }

  else if (args[0] == 'configurator' && ConfiguratorAppsOpen == false) {
    applications.helper = true
    finalMessage = 'Configurator applications **enabled**.'
  }

  else {
    message.channel.send(invalid)
    return;
  }

  fs.writeFileSync('./config-files/applications.json', JSON.stringify(applications), function (error) {
    if (error) throw error;
  });

  const valid = new Discord.RichEmbed()
    .setDescription(`<a:animatedTick:608735122682019870> ${finalMessage}`)
    .setFooter(config.footer, config.footerImage)
  message.channel.send(valid)
}

module.exports.config = {
  name: "toggle",
  aliases: ["toggleapplications"],
  description: 'Toggles applications',
  area: 'Owner',
  priority: 9
}
