const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
const colour = config.colour;
const Handlebars = require("handlebars");
var mysql = require('mysql');

let welcomechannel = config.welcomeLeavelog;
let logchannel = config.logschannel;

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

let prefix = config.prefix;



//function updates() {
    // MySQL Database connection
        //var con = mysql.createConnection({
        //host: "167.86.69.112",
        //user: "u1_jI56n7aaa0",
        //password: "f7JAOkxclNoUrIZU",
        //database: "s1_litebans",
        //})

        //con.connect(function(err) {
         //   if (err) throw err;
        // con.query("SHOW tables", function (err, result, fields) {
          //    if (err) throw err;
           //   console.log(result);
        //});
    //});
//}
//setInterval(updates, 10000, 'funky');



fs.readdir("./commands/", (err, files) => {

    console.log("𝐅𝐫𝐨𝐳𝐞𝐧𝐖𝐚𝐭𝐞𝐫𝐬 [v1.1] loading commands...")
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands!");
        return;
    };
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Loaded ${f} `);
        bot.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            bot.aliases.set(alias, props.config.name)
        });
    });
    console.log("Successfully loaded all commands.")
});
bot.on('error', (error) => {

    console.log(error)
    const errorm = new Discord.RichEmbed()
    .setColor(0xff2819)
    .setAuthor("ERROR!")
    .setDescription("An error or internal exception has occured")
    .setTimestamp()

    bot.channels.get("587665871359574017").send(errorm);
})

bot.on("ready", async () => {
    console.log(`𝐅𝐫𝐨𝐳𝐞𝐧𝐖𝐚𝐭𝐞𝐫𝐬 [v1.2] is now online!`)
    bot.user.setActivity("the lake freeze over", { type: "WATCHING" });
});

bot.on('guildMemberAdd', (guildMember) => {

    let member = guildMember

    const welcome = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor(member.user.tag, member.user.displayAvatarURL)
    .setDescription("**" + member.user.username + "** has joined the discord!")
    .setTimestamp()

    bot.channels.get(welcomechannel).send(welcome);
});

bot.on('guildMemberRemove', (guildMember) => {

    let member = guildMember

    const welcome = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setAuthor(member.user.tag, member.user.displayAvatarURL)
    .setDescription("**" + member.user.username + "** has left the discord!")
    .setTimestamp()

    bot.channels.get(welcomechannel).send(welcome);
});

//On Deleted Message
bot.on("messageDelete", async message => { 
    //console.log(bot.user.id)
    if(message.author.id !== bot.user.id) {
        let logs = await message.guild.fetchAuditLogs({type: 72});
        let entry = logs.entries.first();
        
        let logembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setColor(colour)
        .setDescription("Message deleted in " + message.channel)
        .addField("Message", message.content)
        .addField("Executor", entry.executor)
        .setTimestamp()
        .setFooter(`${config.footer}`, config.logo);
        
        bot.channels.get(logchannel).send(logembed);
}}) 

bot.on("message", async message => {

    const forbidenWords = JSON.parse(fs.readFileSync("./badwords.json", "utf8"));

    if(message.member.id != "278548721778688010" && !message.author.bot) {
        for (var i = 0; i < forbidenWords.length; i++) {
            if (message.content.toLowerCase().includes(forbidenWords[i]) && !message.content.toLowerCase().includes("-remswear")) {
                //message.delete()
                message.channel.send("Please do **NOT** swear, **" + message.author.username + "**!")
                break;
            }
        }
    }

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase()
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) commandfile.run(bot, message, args);


});

bot.on("messageUpdate", async message => {

    const forbidenWords = JSON.parse(fs.readFileSync("./badwords.json", "utf8"))

    if(message.member.id != "278548721778688010" && !message.author.bot) {
        for(var i = 0; i < forbidenWords.length; i++) {
            if(message.content.toLowerCase().includes(forbidenWords[i]) && !message.content.toLowerCase().includes("-remswear")) {
                //message.delete()
                message.channel.send("Nice try **" + message.author.username + "**, please do **NOT** swear.")
            }
        }
    }
})

bot.on('message', async message => {

    if (message.channel.parent == null) {

    }
    else {
        if (message.channel.parent.name === "TICKETS" || message.channel.parent.name === "ARCHIVE") {
            try {
                if (fs.existsSync(`./tickets/${message.channel.id}.html`)) {
                    const html = `\n<div class='msg'>\n<div class='msg-left'>\n<img class='msg-avatar' src='{{avatar}}' />\n</div>\n<div class='msg-right'>\n<span class='msg-user' title='{{username}}#{{discriminator}}'>{{username}}</span>\n<span class='msg-date'>{{time}}</span>\n<div class='msg-content'>{{msg}}</div>\n</div>\n</div>`;
                    const template = Handlebars.compile(html);
                    const data = template({avatar: `${message.author.avatarURL}`, username: `${message.author.username}`, discriminator: `${message.author.discriminator}`, time: `${message.createdAt}`, msg: `${message.content}`});
                    fs.appendFileSync(`./tickets/${message.channel.id}.html`, data, function (error) {
                        if (error) throw error;
                    });
                } else {
                    const html = `<title>{{title}}</title><style>body {background-color: #36393E;color: rgba(255, 255, 255, 0.7);font-family: Whitney, Helvetica Neue, Helvetica, Arial, sans-serif;font-size: 16px;}a {color: #0096CF;text-decoration: none;}a:hover {text-decoration: underline;}div.pre {    background-color: #2F3136;    color: rgb(131, 148, 150);    font-family: Consolas, Courier New, Courier, Monospace;    white-space: pre-wrap;}span.pre {    font-family: Consolas, Courier New, Courier, Monospace;    padding-left: 2px;    padding-right: 2px;    white-space: pre-wrap;}div#info {    display: flex;   margin-bottom: 10px;    margin-left: 5px;    margin-right: 5px;    max-width: 100%;}div#log {     max-width: 100%;}img.guild-icon {    max-height: 64px;    max-width: 64px;}div.info-right {    flex: 1;    margin-left: 10px;}div.guild-name {    color: #FFFFFF;font-size: 1.4em;}div.channel-name {    color: #FFFFFF;    font-size: 1.2em;}div.channel-messagecount {    margin-top: 2px;}div.msg {    border-top: 1px solid rgba(255, 255, 255, 0.04);    display: flex;    margin-left: 10px;    margin-right: 10px;    padding-bottom: 15px;    padding-top: 15px;}div.msg-left {    height: 40px;    width: 40px;}img.msg-avatar {    border-radius: 50%;    height: 40px;    width: 40px;}div.msg-right {    flex: 1;    margin-left: 20px;    min-width: 50%;}span.msg-user {    color: #FFFFFF;    font-size: 1em;}span.msg-date {    color: rgba(255, 255, 255, 0.2);    font-size: .75em;    margin-left: 5px;}span.msg-edited {   color: rgba(255, 255, 255, 0.2);   font-size: .8em;    margin-left: 5px;}div.msg-content {    font-size: .9375em;    word-wrap: break-word;}div.msg-attachment {    margin-bottom: 5px;    margin-top: 5px;}img.msg-attachment {    max-height: 500px;    max-width: 50%;}img.emoji {    height: 24px;    width: 24px;}span.mention {    font-weight: 600;}</style>\n<div id='info'>\n<div class='info-left'>\n<img class='guild-icon' src='{{gicon}}' />\n</div>\n<div class='info-right'>\n<div class='guild-name'>{{gname}}</div>\n<div class='channel-name'>#{{cname}}</div>\n\n</div>\n</div>`;
                    const template = Handlebars.compile(html);
                    const data = template({title: `${message.channel.name}`, gicon: `${message.guild.iconURL}`, gname: `${message.guild.name}`, cname: `${message.channel.name}`, topic: `${message.channel.topic}`});

                    fs.writeFileSync(`./tickets/${message.channel.id}.html`, data, function (error) {
                        if (error) throw error;
                    });
                }
            } catch(error) {
                console.log(error);
                const errorm = new Discord.RichEmbed()
                .setColor(0xff2819)
                .setAuthor("ERROR!")
                .setDescription(`${error}`)
                .setTimestamp()
            
                bot.channels.get("587665871359574017").send(errorm);
            }
    }
    }
});

bot.login(config.token);