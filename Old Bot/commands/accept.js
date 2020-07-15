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
                let accepted = new Discord.RichEmbed()

                .setColor(0xffa500)
                .setTitle("Congratulations " + username + "!")
                .setDescription("We would like to welcome you to the build team because your builder application has been accepted! We look forward to seeing you on the team and helping our dream to become a reality! If you have any questions or concerns please contact either <@278548721778688010> or <@287874798049165313> ASAP, other than that, we hope you have fun and enjoy your time here.\n\nRegards,\nFrozenWaters Management")
                //.setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(accepted)

                bot.fetchUser(aUser)
                    .then((User) => {
                        const mmember = message.guild.fetchMember(User)
                            .then((User2) => {
                                User2.addRole(BuilderR)
                                User2.addRole(BuilderG)
                                console.log("Given " + username + " Builder Group and Role as their application was accepted.")
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                //person.addRole(BuilderR);
                //person.addRole(BuilderG);

                let welcome = new Discord.RichEmbed()

                .setColor(0x43ff19)
                .setDescription("Please welcome, " + `<@${aUser}>` + " to the build team!")
    
                bot.channels.get(BuildChat).send(welcome)


                //Notice Warning
                let important = new Discord.RichEmbed()

                .setColor(0xff240c)
                .setTitle("Important Notice")
                .setDescription("To gain access to the network, and recieve your builder permissions ingame. You'll need to contact either, <@278548721778688010> or <@287874798049165313> via DM or in <#546067339058085899>.\n*(Make sure to provide your minecraft username)*\n\nTo get a transcript of your application, you can reply with ``-transcript``, then lastly, please confirm you've read these two messages by replying with ``-confirm`` so we can archive your application.\n\nRegards,\nFrozenWaters Management")
                .setThumbnail("https://i.imgur.com/P2rln5E.png")
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(important)

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
                let accepted = new Discord.RichEmbed()

                .setColor(0xffa500)
                .setTitle("Congratulations " + username + "!")
                .setDescription("We would like to welcome you to the development team because your developer application has been accepted! We look forward to seeing you on the team and helping our dream to become a reality! If you have any questions or concerns please contact either <@278548721778688010> or <@287874798049165313> ASAP, other than that, we hope you have fun and enjoy your time here.\n\nRegards,\nFrozenWaters Management")
                //.setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(accepted)

                bot.fetchUser(aUser)
                    .then((User) => {
                        message.guild.fetchMember(User)
                            .then((User2) => {
                                User2.addRole(DeveloperR)
                                User2.addRole(DeveloperG)
                                console.log("Given " + username + " Developer Group and Role as their application was accepted.")
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                let welcome = new Discord.RichEmbed()

                .setColor(0x43ff19)
                .setDescription("Please welcome, " + `<@${aUser}>` + " to the development team!")
        
                bot.channels.get(DevelopChat).send(welcome)

                let important = new Discord.RichEmbed()

                .setColor(0xff240c)
                .setTitle("Important Notice")
                .setDescription("To gain access to the network, and recieve your developer permissions ingame. You'll need to contact either, <@278548721778688010> or <@287874798049165313> via DM or in <#573642596350427176>.\n*(Make sure to provide your minecraft username)*\n\nRegards,\nFrozenWaters Management")
                .setThumbnail("https://i.imgur.com/P2rln5E.png")
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(important)

            }
            else if(message.channel.topic.includes("Network Helper")) { 

                //console.log(message.channel.id)
                let chan = message.channel

                let aUser = applications[chan.id].applicant
                let username = applications[chan.id].username
                let accepted = new Discord.RichEmbed()

                .setColor(0xffa500)
                .setTitle("Congratulations " + username + "!")
                .setDescription("We would like to welcome you to the staff team because your developer application has been accepted! We look forward to seeing you on the team and helping our dream to become a reality! If you have any questions or concerns please contact either <@278548721778688010> or <@287874798049165313> ASAP, other than that, we hope you have fun and enjoy your time here.\n\nRegards,\nFrozenWaters Management")
                //.setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(accepted)

                bot.fetchUser(aUser)
                    .then((User) => {
                        message.guild.fetchMember(User)
                            .then((User2) => {
                                User2.addRole(HelperR)
                                User2.addRole(StaffG)
                                console.log("Given " + username + " Helper Group and Role as their application was accepted.")
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                
                let welcome = new Discord.RichEmbed()

                .setColor(0x43ff19)
                .setDescription("Please welcome, " + `<@${aUser}>` + " to the staff team!")
        
                bot.channels.get(StaffChat).send(welcome)

                let important = new Discord.RichEmbed()

                .setColor(0xff240c)
                .setTitle("Important Notice")
                .setDescription("To gain access to the network, and recieve your helper permissions ingame. You'll need to contact either, <@278548721778688010> or <@287874798049165313> via DM or in <#527936742855147544>.\n*(Make sure to provide your minecraft username)*\n\nRegards,\nFrozenWaters Management")
                .setThumbnail("https://i.imgur.com/P2rln5E.png")
                .setTimestamp()
                .setFooter(`${config.footer}`, config.logo);
    
                message.channel.send(important)

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
        message.channel.send("<:disabled:575019099139342356> You are **NOT** allowed to use ``-accept``.").then(msg => msg.delete(2500));
    }
}
module.exports.config = {
  name: "accept",
  aliases: ["accepted"]
}
