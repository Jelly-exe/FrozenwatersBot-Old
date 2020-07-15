const Discord = require("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (client, message, args) => {
  message.delete();

  let arg = args.join(' ');

  const error = new Discord.RichEmbed()
  .setColor(colour)
  .setAuthor("Incorrect usage")
  .setDescription("You've inputted either too many or too few arguments.\nUse ``" + `${config.prefix}` +"poll [Poll Name]; [Poll Reason]; [Option One]; [Option Two]``")
  .setTimestamp()
  .setFooter(`${config.footer}`, config.logo);

  if(!arg) return message.channel.send(error);
  if(arg && message.member.hasPermission("ADMINISTRATOR")) {

      let convert = arg.split(";")

      if(convert.length === 4) { 
      const poll = new Discord.RichEmbed()
      .setColor(colour)
	    .setAuthor(convert[0])
	    .setDescription(convert[1])
	    .addField("_ _", convert[2])
	    .addField("Or", convert[3])
      .setTimestamp()

      let sentEmbed = await message.channel.send(poll);

      await sentEmbed.react('1⃣');
      await sentEmbed.react('2⃣');
      }

      if(convert.length > 4) {
        let sentEmbed = message.channel.send(error);
      }   
  }
  else {

	const noMSG = new Discord.RichEmbed()
	.setColor(0xff2a00)
	.setAuthor("Insufficient Permission")
	.setDescription("Sorry, you **DO NOT** have permission to use this.")
	.setTimestamp()

	let sentEmbed = await message.channel.send(noMSG);
  }

}
module.exports.config = {
	name: "poll",
	aliases: ["vote"]
}
