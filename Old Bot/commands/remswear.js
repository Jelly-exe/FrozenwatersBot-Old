const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config.json");
const colour = config.colour;
const Staff = config.StaffG

module.exports.run = async (bot, message, args) => {
    const StaffG = message.guild.roles.find(x => x.name === Staff)
    const forbidenWords = JSON.parse(fs.readFileSync("./badwords.json", "utf8"));
    message.delete()
    let word = args.slice(0).join(' ')

    if(message.member.roles.has(StaffG.id)) {
        if(!word) {
            message.channel.send("<:disabled:575019099139342356> You are **NOT** supplying a word or phrase you'd like to unblacklist.").then(msg => msg.delete(2500));
        }
        else {
            
            for(var i = 0; i < forbidenWords.length; i++) {
                if(forbidenWords.includes(word)) {

                    forbidenWords.splice(word);
                    fs.writeFile("./badwords.json", JSON.stringify(forbidenWords, null, 2), (err) => {
                        if (err) console.log(err)
                        })
                    message.channel.send("<:enabled:575019088821092381> **Successfully** removed specified word/phrase from the blacklist!").then(msg => msg.delete(2500));

                }
            
                else {
                     message.channel.send("<:disabled:575019099139342356> Couldn't find specified word or phrase within the blacklist.").then(msg => msg.delete(2500));
                }
            }
        }
    }
    else {
        message.channel.send("<:disabled:575019099139342356> You are **NOT** allowed to use ``-remswear``.").then(msg => msg.delete(2500));
    }

}
module.exports.config = {
  name: "remswear",
  aliases: ["remswearword"]
}