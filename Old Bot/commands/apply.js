const Discord = require ("discord.js");
const fs = require("fs");
let applications = JSON.parse(fs.readFileSync("./applications.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  const config = require("../config.json");
  const colour = config.colour;
  const categoryID = config.TicketCategory;

  const HelperAppsOpen = config.HelperApplications;
  const DeveloperAppsOpen = config.DeveloperApplications;
  const BuilderAppsOpen = config.BuilderApplications;
  const ConfigAppsOpen = config.ConfigApplications;

  const Management = config.management;
  const HeadDeveloper = config.HeadDeveloper;
  const HeadBuilderR = config.HeadBuilder;
  const HeadConfigurator = config.HeadConfigurator;

  let description = args.slice(0).join(' ')

  if(args.length === 1 && (args[0] === "1" || args[0].toLowerCase() === "builder" || args[0].toLowerCase() === "constructor") && BuilderAppsOpen === "true") {

    let sUser = message.author
    message.delete();
  
    let support = new Discord.RichEmbed()
          .setColor(colour)
          .setTitle(message.author.username + " - " + message.author.id)
          .setDescription('Hello **' + message.author.username + '**, please answer the following questions;\n\n**What is your name?** *(Prefer Forename and Surname)*\n**How old are you?** *(Must be 12+)*\n**Where do you live?** *(City/State + Timezone)*\n**Biography** *(Tell us a bit about yourself)*\n**Why do you want to apply for Builder?** *(Why this server?)*\n**Do you have any past experience?** *(Got a Portfoilo, show us it)*')
          .setThumbnail(message.author.avatarURL)
          .setTimestamp()
          .setFooter(`${config.footer}`, config.logo);
  
          message.guild.createChannel(`application-${message.author.username}`).then(async c => {
            c.setParent(categoryID);
            c.setTopic(message.author.username + " is applying for a position as a Network Builder")
            let HeadBuilder = message.guild.roles.find(x => x.name === HeadBuilderR)
    
            if(!HeadBuilder) return message.channel.send("The support role doesn't exist! Please create a role called **" + HeadBuilder + "**");
            applications[c.id] = {
              "applicant": message.member.id,
              "username": message.author.username,
              "action": 0
            }
            fs.writeFile("./applications.json", JSON.stringify(applications, null, 2), (err) => {
              if (err) console.log(err)
            });
            c.overwritePermissions(message.guild.defaultRole, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
            })
            c.overwritePermissions(message.member, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true
            })
            c.overwritePermissions(HeadBuilder, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            })
        
            const embed2 = new Discord.RichEmbed()
            .setColor(colour)
            .setDescription(`Your application has been created! Visit your application at ${c}`)
            .setTimestamp()
            .setFooter(`${config.footer}`);
        
            message.channel.send(embed2).then(msg => msg.delete(5000));
        
            let tagger = await c.send(`<@${HeadBuilder}>`)
            tagger.delete()
            c.send(support)

          }) 

  }
  else if(args.length === 1 && (args[0] === "2" || args[0].toLowerCase() === "developer" || args[0].toLowerCase() === "dev") && DeveloperAppsOpen === "true") {

    let sUser = message.author
    message.delete();
  
    let support = new Discord.RichEmbed()
          .setColor(colour)
          .setTitle(message.author.username + " - " + message.author.id)
          .setDescription('Hello **' + message.author.username + '**, please answer the following questions;\n\n**What is your name?** *(Prefer Forename and Surname)*\n**How old are you?** *(Must be 12+)*\n**Where do you live?** *(City/State + Timezone)*\n**Biography** *(Tell us a bit about yourself)*\n**Why do you want to apply for Developer?** *(Why this server?)*\n**Do you have any past experience?** *(Got a Portfoilo, show us it)*')
          .setThumbnail(message.author.avatarURL)
          .setTimestamp()
          .setFooter(`${config.footer}`, config.logo);
  
          message.guild.createChannel(`application-${message.author.username}`).then(async c => {
            c.setParent(categoryID);
            c.setTopic(message.author.username + " is applying for a position as a Network Developer")
            let HeadDev = message.guild.roles.find(x => x.name === HeadDeveloper)
            let Managers = message.guild.roles.find(x => x.name === Management)
    
            if(!HeadDev || !Managers) return message.channel.send("The support role doesn't exist! Please create a role called **" + HeadDev + Managers + "**");
            applications[c.id] = {
              "applicant": message.member.id,
              "username": message.author.username,
              "action": 0
            }
            fs.writeFile("./applications.json", JSON.stringify(applications, null, 2), (err) => {
              if (err) console.log(err)
            });
            c.overwritePermissions(message.guild.defaultRole, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
            })
            c.overwritePermissions(message.member, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true
            })
            c.overwritePermissions(HeadDev, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            })
            c.overwritePermissions(Managers, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            })
        
            const embed2 = new Discord.RichEmbed()
            .setColor(colour)
            .setDescription(`Your ticket has been created! Visit your ticket at ${c}`)
            .setTimestamp()
            .setFooter(`${config.footer}`);
        
            message.channel.send(embed2).then(msg => msg.delete(5000));
        
            let tagger = await c.send(`<@${Managers}><@${HeadDev}>`)
            tagger.delete()
            c.send(support)
          }) 
        }

  else if(args.length === 1 && (args[0] === "4" || args[0].toLowerCase() === "configurator" || args[0].toLowerCase() === "config") && ConfigAppsOpen === "true") {

  let sUser = message.author
  message.delete();

  let support = new Discord.RichEmbed()
      .setColor(colour)
      .setTitle(message.author.username + " - " + message.author.id)
      .setDescription('Hello **' + message.author.username + '**, please answer the following questions;\n\n**What is your name?** *(Prefer Forename and Surname)*\n**How old are you?** *(Must be 12+)*\n**Where do you live?** *(City/State + Timezone)*\n**Biography** *(Tell us a bit about yourself)*\n**Why do you want to apply for Developer?** *(Why this server?)*\n**Do you have any past experience?** *(Got a Portfoilo, show us it)*')
      .setThumbnail(message.author.avatarURL)
      .setTimestamp()
      .setFooter(`${config.footer}`, config.logo);

      message.guild.createChannel(`application-${message.author.username}`).then(async c => {
        c.setParent(categoryID);
        c.setTopic(message.author.username + " is applying for a position as a Network Configurator")
        let HeadDev = message.guild.roles.find(x => x.name === HeadConfigurator)
        let Managers = message.guild.roles.find(x => x.name === Management)

        if(!HeadDev || !Managers) return message.channel.send("The support role doesn't exist! Please create a role called **" + HeadConfigurator + Managers + "**");
        applications[c.id] = {
          "applicant": message.member.id,
          "username": message.author.username,
          "action": 0
        }
        fs.writeFile("./applications.json", JSON.stringify(applications, null, 2), (err) => {
          if (err) console.log(err)
        });
        c.overwritePermissions(message.guild.defaultRole, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false
        })
        c.overwritePermissions(message.member, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true
        })
        c.overwritePermissions(HeadDev, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true
        })
        c.overwritePermissions(Managers, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true
        })
    
        const embed2 = new Discord.RichEmbed()
        .setColor(colour)
        .setDescription(`Your ticket has been created! Visit your ticket at ${c}`)
        .setTimestamp()
        .setFooter(`${config.footer}`);
    
        message.channel.send(embed2).then(msg => msg.delete(5000));
    
        let tagger = await c.send(`<@${Managers}><@${HeadDev}>`)
        tagger.delete()
        c.send(support)
      }) 
    }

  else if(args.length === 1 && (args[0] === "3" || args[0].toLowerCase() === "helper" || args[0].toLowerCase() === "help") && HelperAppsOpen === "true") {

    let sUser = message.author
    message.delete();
  
    let support = new Discord.RichEmbed()
          .setColor(colour)
          .setTitle(message.author.username + " - " + message.author.id)
          .setDescription('Hello **' + message.author.username + '**, please answer the following questions;\n\n**What is your name?** *(Prefer Forename and Surname)*\n**How old are you?** *(Must be 12+)*\n**Where do you live?** *(City/State + Timezone)*\n**Biography** *(Tell us a bit about yourself)*\n**Why do you want to apply for Helper?** *(Why this server?)*\n**Do you have any past experience?** *(Got a Portfoilo, show us it)*')
          .setThumbnail(message.author.avatarURL)
          .setTimestamp()
          .setFooter(`${config.footer}`, config.logo);
  
          message.guild.createChannel(`application-${message.author.username}`).then(async c => {
            c.setParent(categoryID);
            c.setTopic(message.author.username + " is applying for a position as a Network Helper")
            let Managers = message.guild.roles.find(x => x.name === Management)
            
    
            if(!Managers) return message.channel.send("The support role doesn't exist! Please create a role called **" + Managers + "**");
            applications[c.id] = {
              "applicant": message.member.id,
              "username": message.author.username,
              "action": 0
            }
            fs.writeFile("./applications.json", JSON.stringify(applications, null, 2), (err) => {
              if (err) console.log(err)
            });
            c.overwritePermissions(message.guild.defaultRole, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
            })
            c.overwritePermissions(message.member, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true
            })
            c.overwritePermissions(Managers, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            })
        
            const embed2 = new Discord.RichEmbed()
            .setColor(colour)
            .setDescription(`Your application has been created! Visit your application at ${c}`)
            .setTimestamp()
            .setFooter(`${config.footer}`);
        
            message.channel.send(embed2).then(msg => msg.delete(5000));
        
            let tagger = await c.send(`<@${Managers}>`)
            tagger.delete()
            c.send(support)
          }) 

  }
  else if(DeveloperAppsOpen === "false" && HelperAppsOpen === "false" && BuilderAppsOpen === "false") {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Applications | ${config.name}`)
    .setDescription("\n**Sorry!** We're currently not look for any Staff, Development or Build Team Members at the moment.")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
  else if(DeveloperAppsOpen === "true" && HelperAppsOpen === "false" && BuilderAppsOpen === "false") {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Applications | ${config.name}`)
    .setDescription("\nCurrently, You can apply for the following;\n**»** Developer\n\n**Correct usage:** -apply [position]")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
  else if(DeveloperAppsOpen === "false" && HelperAppsOpen === "true" && BuilderAppsOpen === "false") {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Applications | ${config.name}`)
    .setDescription("\nCurrently, You can apply for the following;\n**»** Helper\n\n**Correct usage:** -apply [position]")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
  else if(DeveloperAppsOpen === "false" && HelperAppsOpen === "false" && BuilderAppsOpen === "true") {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Applications | ${config.name}`)
    .setDescription("\nCurrently, You can apply for the following;\n**»** Builder\n\n**Correct usage:** -apply [position]")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
  else if(DeveloperAppsOpen === "false" && HelperAppsOpen === "true" && BuilderAppsOpen === "true") {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Applications | ${config.name}`)
    .setDescription("\nCurrently, You can apply for the following;\n**»** Builder\n**»** Helper\n\n**Correct usage:** -apply [position]")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
  else if(DeveloperAppsOpen === "true" && HelperAppsOpen === "false" && BuilderAppsOpen === "true") {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Applications | ${config.name}`)
    .setDescription("\nCurrently, You can apply for the following;\n**»** Builder\n**»** Developer\n\n**Correct usage:** -apply [position]")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
  else if(DeveloperAppsOpen === "true" && HelperAppsOpen === "true" && BuilderAppsOpen === "false") {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Applications | ${config.name}`)
    .setDescription("\nCurrently, You can apply for the following;\n**»** Developer\n**»** Helper\n\n**Correct usage:** -apply [position]")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
  else {
    
    message.delete();
    let wrong = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(`Applications | ${config.name}`)
    .setDescription("\nCurrently, You can apply for the following;\n**»** Builder\n**»** Developer\n**»** Helper\n\n**Correct usage:** -apply [position]")
    .setTimestamp()
    .setFooter(`${config.footer}`, config.logo);

    message.channel.send(wrong).then(msg => msg.delete(5000));

  }
}
module.exports.config = {
  name: "apply",
  aliases: ["application"]
}
