const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");

exports.run = async (client, message, args) => {
    const noPermission = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> You do not have permission to run this command!')
    .setFooter(config.footer, config.footerImage)

    const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-permissions [botAdmins/founders/management/development/staff] [add/remove] [user]`')
    .setFooter(config.footer, config.footerImage)

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

    if (message.author.id !== '278548721778688010') message.channel.send(noPermission);
    if (message.author.id !== '278548721778688010') return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

    let user = message.mentions.users.first()
  
    let file;
    let type;

    if ((args[0] == 'botAdmins' || args[0] == 'founders' || args[0] == 'management' || args[0] == 'development' || args[0] == 'staff') && (args[1] == 'add'|| args[1] == 'remove') && user) {
        file = require(`../permissions/${args[0]}.json`);
    } 
    
    else {
        message.channel.send(invalid)
        return;
    }
  
    if (args[1] == 'add') {
        file.users.push(user.id)
        fs.writeFileSync(`./permissions/${args[0]}.json`, JSON.stringify(file), function (error) {
          if (error) throw error;
        });
        type = 'added to'
    }

    else if (args[1] == 'remove') {

      file.users = file.users.filter(function(value, index, arr){
        return value !== user.id;
      });
      fs.writeFileSync(`./permissions/${args[0]}.json`, JSON.stringify(file), function (error) {
        if (error) throw error;
      });
      type = 'removed from'
    }

    const valid = new Discord.RichEmbed()
    .setDescription('<a:animatedTick:608735122682019870> <@' + user.id + '> has been ' + type + ' the group `' + args[0] + '`.')
    .setFooter(config.footer, config.footerImage)
    message.channel.send(valid);
}

module.exports.config = {
    name: "permissions",
    aliases: [""],
    description: 'Add or remove users permissions.',
    area: 'Owner',
    priority: 9
}