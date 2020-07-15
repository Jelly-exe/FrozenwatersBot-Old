const Discord = require ("discord.js");
const fs = require("fs");
let applications = JSON.parse(fs.readFileSync("./applications.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    message.delete()
    let apply = message.channel.id

    if(message.channel.name.startsWith("application-")){
        if(applications[message.channel.id].action >= 1) {


            let aUser = applications[apply].applicant
            let username = applications[apply].username
            let category = bot.channels.find(c => c.name == "ARCHIVE" && c.type == "category")

            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false
              })


            message.channel.setParent(category.id);

            message.channel.send("<:enabled:575019088821092381> **Successfully** archived application.")
        }
        else {
            message.channel.send("<:disabled:575019099139342356> You have nothing to confirm.").then(msg => msg.delete(2500));
        }

    }
    else{
        message.channel.send("<:disabled:575019099139342356> This isn't an application channel.").then(msg => msg.delete(2500));
    }
}
module.exports.config = {
  name: "confirm",
  aliases: ["read"]
}
