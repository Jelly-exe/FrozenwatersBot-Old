const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");
const frozenwaters = require("../frozenwaters.js");

exports.run = async (client, message, args) => {

    const invalid = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> Please supply the correct arguments! \n`-swear [add/remove] [word]`')
    .setFooter(config.footer, config.footerImage)

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

    let perms = frozenwaters.isStaff(message, message.author.id)
    if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

    let file;
    let type;

    if ((args[0] == 'add'|| args[0] == 'remove')) {
        file = require("../config-files/swearList.json");
    }

    else {
        message.channel.send(invalid)
        return;
    }

    if (args[0] == 'add') {
        file.words.push(args[1])
        fs.writeFileSync(`./config-files/swearList.json`, JSON.stringify(file), function (error) {
          if (error) throw error;
        });
        type = 'added to'
    }

    else if (args[0] == 'remove') {

      file.words = file.words.filter(function(value, index, arr){
        return value !== args[1];
      });
      fs.writeFileSync(`./config-files/swearList.json`, JSON.stringify(file), function (error) {
        if (error) throw error;
      });
      type = 'removed from'
    }

    const valid = new Discord.RichEmbed()
    .setDescription('<a:animatedTick:608735122682019870> `' + args[1] + '` has been ' + type + ' the list.')
    .setFooter(config.footer, config.footerImage)
    message.channel.send(valid);
}

module.exports.config = {
    name: "swear",
    aliases: ["swearWords"],
    description: 'Add or remove swear words.',
    area: 'Staff',
    priority: 5
}
