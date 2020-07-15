const Discord = require("discord.js");

const config = require("../config.json");

const colour = config.colour;



module.exports.run = async (client, message, args) => {

  

  

  message.delete()

  if(args.length === 1 && (args[0] === "2" || args[0].toLowerCase() === "moderation" || args[0].toLowerCase() === "Mod")){

    const ticketsMSG = new Discord.RichEmbed()

    .setColor(colour)

    .setAuthor("Moderation | " + `${config.name}`)

    .setDescription("\n\n``" + `${config.prefix}` + "addswear [word]`` | Adds a word/phrase to the blacklist\n``"  + `${config.prefix}` + "remswear [word]`` | Removes a word/phrase from the blacklist\n``" + `${config.prefix}` + "ban [user] [reason]`` | Bans selected user from the discord\n``" + `${config.prefix}` + "kick [user] [reason]`` | Kicks selected user from the discord\n``" + `${config.prefix}` + "warn [user] [reason]`` | Warns selected user\n``" + `${config.prefix}` + "tempmute [user] [time]s [reason]`` | Mutes selected user for selected time\n ``" + `${config.prefix}` + "history [user]`` | Lists all previous punishment that the selected user has had")

    .setTimestamp()

    .setFooter(`${config.footer}`, config.logo);

  

    let sentEmbed = await message.channel.send(ticketsMSG); 

  }



  else if(args.length === 1 && (args[0] === "1" || args[0].toLowerCase() === "tickets" || args[0].toLowerCase() === "ticket")){

    const ticketsMSG = new Discord.RichEmbed()

    .setColor(colour)

    .setAuthor("Tickets | " + `${config.name}`)

    .setDescription("\n\n``" + `${config.prefix}` + "new [description]`` | Opens a ticket regarding your issue\n``" + `${config.prefix}` + "add [@user]`` | Adds selected user to your ticket\n``" + `${config.prefix}` + "remove [@user]`` | Removes selected user from your ticket\n``" + `${config.prefix}` + "close`` | Closes your ticket\n``" + `${config.prefix}` + "transcript`` | Gives you the ticket transcript\n")

    .setTimestamp()

    .setFooter(`${config.footer}`, config.logo);

  

    let sentEmbed = await message.channel.send(ticketsMSG); 

  }



  else if(args.length === 1 && (args[0] === "3" || args[0].toLowerCase() === "manage" || args[0].toLowerCase() === "management") && message.member.roles.has('537687192529797130')){

    const ticketsMSG = new Discord.RichEmbed()

    .setColor(colour)

    .setAuthor("Management | " + `${config.name}`)

    .setDescription("\n\n**__Applications__**\n``" + `${config.prefix}` + "accept`` | Accepts an application\n``" + `${config.prefix}` + "deny`` | Denies an application\n``" + `${config.prefix}` + "announce [everyone/here/normal]; [announcement title]; [announcement description]`` | Allows you to do an embeded announcement\n``"  + `${config.prefix}` + "poll [Poll Name]; [Poll Reason]; [Option One]; [Option Two]`` | Creates a poll in the posted channel\n``" + `${config.prefix}` + "toggleapplications [helper/builder/developer]`` | Allows you to toggle applications (Open or closed)\n")

    .setTimestamp()

    .setFooter(`${config.footer}`, config.logo);

  

    let sentEmbed = await message.channel.send(ticketsMSG); 

  } 



  else if(args.length === 1 && (args[0] === "3" || args[0].toLowerCase() === "manage" || args[0].toLowerCase() === "management") && !message.member.roles.has('537687192529797130')){

    const ticketsMSG = new Discord.RichEmbed()

    .setColor(0xff0000)

    .setAuthor("Error | " + `${config.name}`)

    .setDescription("You are **NOT** allowed to view this category!")

    .setFooter(`${config.footer}`, config.logo);

  

    let sentEmbed = await message.channel.send(ticketsMSG); 

  } 



  else {

	const noMSG = new Discord.RichEmbed()

	.setColor(colour)

	.setAuthor("Help | " + `${config.name}`)

  .setDescription("\nUse **" + `${config.prefix}` + "help [category]** to get information about a category.\nYou can get information about the following categories:\n\n**»** Tickets\n**»** Moderation\n**»** Management")

	.setTimestamp()

	.setFooter(`${config.footer}`, config.logo);



	let sentEmbed = await message.channel.send(noMSG);

  }

}

module.exports.config = {

  name: "help",

  aliases: ["?"]

}

