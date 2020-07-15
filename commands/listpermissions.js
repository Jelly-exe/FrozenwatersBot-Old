const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");

exports.run = async (client, message, args) => {
    //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

    let perms = frozenwaters.isFounder(message, message.author.id)
    if (perms === false) return;

    //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

    const botAdmin = require("../permissions/botAdmins.json");

    const founders = require("../permissions/founders.json");
    const management = require("../permissions/management.json");
    const development = require("../permissions/development.json");
    const staff = require("../permissions/staff.json");

    let botAdminMessage = '';

    let foundersMessage = '';
    let managementMessage = '';
    let developmentMessage = '';
    let staffMessage = '';

    botAdmin.users.forEach(function(user){
        botAdminMessage = botAdminMessage + `● <@${user}>\n`
    });

    founders.users.forEach(function(user){
        foundersMessage = foundersMessage + `● <@${user}>\n`
    });

    management.users.forEach(function(user){
        managementMessage = managementMessage + `● <@${user}>\n`
    });

    development.users.forEach(function(user){
        developmentMessage = developmentMessage + `● <@${user}>\n`
    });

    staff.users.forEach(function(user){
        staffMessage = staffMessage + `● <@${user}>\n`
    });

    const valid = new Discord.RichEmbed()
    .setTitle('User Permissions')
    .setDescription('These are all the user permissions.')
    .addField('Bot Admins:', botAdminMessage)
    .addField('Founders:', foundersMessage)
    .addField('Management:', managementMessage)
    .addField('Development:', developmentMessage)
    .addField('Staff:', staffMessage);

    message.channel.send(valid);
}

module.exports.config = {
    name: "listperms",
    aliases: ["listpermissions"],
    description: 'List all user perms.',
    area: 'Owner',
    priority: 9
}
