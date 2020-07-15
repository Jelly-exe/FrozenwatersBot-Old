const Discord = require("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (client, message, args) => {
  // Deletes the command when executed
  message.delete();

  const amount = parseInt(args[0]);
  if(message.member.hasPermission("MANAGE_MESSAGES")) {
  
  if (isNaN(amount)) {
	  message.reply("I **can't** purge ``" + amount  + "`` because it's not a valid number.\nTry ``-purge <number>``");
  } 
  
  else if (amount < 2 || amount > 100) {
	  message.reply('You can only purge 2 to 100 messages at a time.');
  } 
  
  else {
    message.channel.bulkDelete(amount);
    message.channel.send("**Successfully** deleted " + amount + " messages! :wastebasket:").then(msg => msg.delete(2500));
  }
  }
  else{
    message.channel.send("You are **NOT ALLOWED** to use ``-purge``.\n *If you believe this is a mistake, please contact* ***Mackenzie Molloy#2019*** *.* ")
  }
}
module.exports.config = {
  name: "purge",
  aliases: ["clear"]
}
