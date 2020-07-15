const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;
const categoryID = config.TicketCategory;
const fs = require("fs");
const TicketRole = config.TicketRole;

module.exports.run = async (bot, message, args) => {

  let description = args.slice(0).join(' ')

  if(!description) {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Support Ticket`)
    .setDescription(`\nTo get assistance with anything that is troubling you, do the following;\n**-new [description]**`)
    .setTimestamp()

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
  else {

    let sUser = message.author
    message.delete();
  
    let support = new Discord.RichEmbed()
          .setColor(colour)
          .setTitle(message.author.username + " - " + message.author.id)
          .setDescription(' ')
          .addField("Description", description)
          .setThumbnail(message.author.avatarURL)
          .setTimestamp()
  
          message.guild.createChannel(`ticket-${message.author.username}`).then(async c => {
            c.setParent(categoryID);
            let supportrole = message.guild.roles.find(x => x.name === TicketRole)
    
            if(!supportrole) return message.channel.send("The support role doesn't exist! Please create a role called **" + TicketRole + "**");
            c.overwritePermissions(message.guild.defaultRole, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
            })
            c.overwritePermissions(message.member, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            })
            c.overwritePermissions(supportrole, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            })
        
            const embed2 = new Discord.RichEmbed()
            .setColor(colour)
            .setDescription(`Your ticket has been created! Visit your ticket at ${c}`)
            .setTimestamp()
            .setFooter(`${config.footer}`);
        
            message.channel.send(embed2).then(msg => msg.delete(5000));
        
            let tagger = await c.send(`<@${supportrole}>`)
            tagger.delete()
            c.send(support)
          }) 

  }
}
module.exports.config = {
  name: "new",
  aliases: ["ticket"]
}
