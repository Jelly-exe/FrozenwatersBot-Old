const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (bot, message, args) => {

    message.delete()
    let StaffChat = config.StaffChat
    let DevelopChat = config.DevelopmentChat
    let BuildChat = config.BuilderChat
    let applications = JSON.parse(fs.readFileSync("./applications.json", "utf8"));
    const Founder = message.guild.roles.find(x => x.name === "Founder")

    //Applicable roles
    //Builders
    let Builder = config.BuilderR
    let Builders = config.BuilderG
    const BuilderR = message.guild.roles.find(x => x.name === Builder)
    const BuilderG = message.guild.roles.find(x => x.name === Builders)

    //Developers
    let Developers = config.Developer
    let Development = config.Development
    const DeveloperR = message.guild.roles.find(x => x.name === Developers)
    const DeveloperG = message.guild.roles.find(x => x.name === Development)

    //Helper

    let Helpers = config.HelperR
    let Staff = config.StaffG
    const HelperR = message.guild.roles.find(x => x.name === Helpers)
    const StaffG = message.guild.roles.find(x => x.name === Staff)

    if(message.member.roles.has(Founder.id)){
        if(message.channel.name.startsWith("application-")){
            if(message.channel.topic.includes("Network Builder")) { 

                //console.log(message.channel.id)
                let apply = message.channel.id

                let aUser = applications[apply].applicant
                let username = applications[apply].username

                let denied = new Discord.RichEmbed()

                .setColor(0xff240c)
                .setTitle("Commiserations " + username + "!")
                .setDescription("Unfortunately **" + username + "**, we are sorry to say that we cannot accept your Builder application. This could be due to a number of reasons (contact us for these reasons) but we would love to see you apply again, you are allowed to re-apply in 2 weeks time. In the mean time, feel free to apply for any of our other roles and we hope you have fun playing on the server! If you have any questions between now and then, feel free to contact either <@278548721778688010> or <@287874798049165313>.\n\nRegards,\nFrozenWaters Management")
                //.setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
                message.channel.send(denied)


                applications[message.channel.id].action++;
                fs.writeFile("./applications.json", JSON.stringify(applications, null, 2), (err) => {
                  if (err) console.log(err)
                })
            }
            else if(message.channel.topic.includes("Network Developer")) { 

                //console.log(message.channel.id)
                let chan = message.channel

                let aUser = applications[chan.id].applicant
                let username = applications[chan.id].username
                let denied = new Discord.RichEmbed()

                .setColor(0xff240c)
                .setTitle("Commiserations " + username + "!")
                .setDescription("Unfortunately **" + username + "**, we are sorry to say that we cannot accept your Developer application. This could be due to a number of reasons (contact us for these reasons) but we would love to see you apply again, you are allowed to re-apply in 2 weeks time. In the mean time, feel free to apply for any of our other roles and we hope you have fun playing on the server! If you have any questions between now and then, feel free to contact either <@278548721778688010> or <@287874798049165313>.\n\nRegards,\nFrozenWaters Management")
                //.setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(denied)

            }
            else if(message.channel.topic.includes("Network Helper")) { 

                //console.log(message.channel.id)
                let chan = message.channel

                let aUser = applications[chan.id].applicant
                let username = applications[chan.id].username
                let denied = new Discord.RichEmbed()

                .setColor(0xff240c)
                .setTitle("Commiserations " + username + "!")
                .setDescription("Unfortunately **" + username + "**, we are sorry to say that we cannot accept your Helper application. This could be due to a number of reasons (contact us for these reasons) but we would love to see you apply again, you are allowed to re-apply in 2 weeks time. In the mean time, feel free to apply for any of our other roles and we hope you have fun playing on the server! If you have any questions between now and then, feel free to contact either <@278548721778688010> or <@287874798049165313>.\n\nRegards,\nFrozenWaters Management")
                //.setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(denied)

            }
            else {

                let important = new Discord.RichEmbed()

                .setColor(0xff240c)
                .setTitle("Oops, something went wrong!")
                .setDescription("Channel Topic is invalid, does not include either, 'Network Helper, 'Network Developer' or 'Network Builder'.")
                .setThumbnail("https://i.imgur.com/P2rln5E.png")
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(important)
            }
        }
        else {
            message.channel.send("<:disabled:575019099139342356> This channel is **NOT** an application.").then(msg => msg.delete(2500));
        }
    }
    else {
        message.channel.send("<:disabled:575019099139342356> You are **NOT** allowed to use ``-deny``.").then(msg => msg.delete(2500));
    }
}
module.exports.config = {
  name: "deny",
  aliases: ["denied"]
}
