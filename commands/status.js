const Discord = require ("discord.js");
const config = require("../config-files/main.json");
const log = require('leekslazylogger');
const fs = require('fs');
const frozenwaters = require("../frozenwaters.js");

module.exports.run = async (client, message, args, con) => {

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isFounder(message, message.author.id)
  if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//


   let eventMessage = '';
   let commandMessage = ''
   fs.readdir("./events/", (err, files) => {
     if (err) return console.error(err);

     files.forEach(file => {
       const event = require(`../events/${file}`);

       let eventName = file.split(".")[0];

       eventMessage = eventMessage + '● `' + eventName + '`\n'
     });
     // -------------------------------------------------------- //

     fs.readdir("./commands/", (err2, files2) => {
        if (err) return console.error(err);
        let jsfile = files2.filter(f => f.split(".").pop() === "js")

        if (jsfile.length <= 0) {
            commandMessage = 'No commands loaded!'
            return;
        };

        jsfile.forEach((f, i) => {
            let props = require(`../commands/${f}`);
            commandMessage = commandMessage + '● `' + props.config.name + '`\n'
        });

        const embed = new Discord.RichEmbed()
        .setTitle('Bot is online.')
        .setDescription('All the bot infomation is located below:')
        .addField('Loaded Commands:', commandMessage)
        .addField('Loaded Events:', eventMessage);

        message.channel.send(embed)

    });
   });

}

module.exports.config = {
  name: "status",
  aliases: ["testing"],
  description: 'Test',
  area: 'Owner',
  priority: 9
}
