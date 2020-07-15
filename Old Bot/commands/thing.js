const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;
const categoryID = config.TicketCategory;
const fs = require("fs");
const TicketRole = config.TicketRole;

module.exports.run = async (bot, message, args) => {

    message.delete()
    let text = args.slice(1).join(' ')
    if(args[0] === "1") { //&& message.author.id === "287874798049165313" || "278548721778688010") {

        const embed = new Discord.RichEmbed()
        .setColor(colour)
        .setAuthor("Useful Information")
        .setDescription("**__WorldEdit__**\n[Basics](https://www.youtube.com/watch?v=SOOvommDpUA)\n[Tips & Ticks **Really Useful**](https://www.youtube.com/watch?v=X7FjfzE9eLQ)\n[Terraforming](https://www.youtube.com/watch?v=rOMXNSEATr8)\n[Bits & Bobs](https://www.youtube.com/watch?v=uSormHoPnL4)\n\n**__VoxelSniper__**\n[Basics](https://www.youtube.com/watch?v=WhqbDi6ICA8)\n[More Basics **Overlaps**](https://www.youtube.com/watch?v=UM4SpgWK_eo)\n[Terrain **Mountains**](https://www.youtube.com/watch?v=HBsI8t3wBF4)\n[Terraforming](https://www.youtube.com/watch?v=IEuvpsALkbs)\n\nThere are many more videos on both of these subjects, just go onto to either google or youtube a search ``VoxelSniper`` or ``WorldEdit``.")
        message.channel.send(embed)
    }
    else {
      const embed = new Discord.RichEmbed()
        .setColor(colour)
        .setTitle(":gear: Settings")
        .setDescription("**Notifications**\n\n:newspaper: - Recieve announcement notifications\n:gift:  - Recieve giveaway notifications\n:notepad_spiral: - Recieve poll notifcations\n")
        let settings = await message.channel.send(embed)
        await settings.react("📰")
        await settings.react("🎁")
        await settings.react("🗒")
    }

}
module.exports.config = {
  name: "thing",
  aliases: ["builder"]
}
