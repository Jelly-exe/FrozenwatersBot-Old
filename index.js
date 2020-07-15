// Imports
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const log = require('leekslazylogger')

const config = require("./config-files/main.json");
const token = require("token.json");
const swear = require("./config-files/swearList.json");

// function createRegex(word) {
//   let regex = '(';

//   for (let i = 0; i < word.length; i++) {
//     regex = regex + word.charAt(i) + '+(\\W|\\d|_)*';
//   }

//   regex = regex + ')';
//   return regex;
// }

// function createCensor(wordLength) {
//   let x = '';
//   for (let i = 0; i < wordLength; i++) {
//     x = x + '\\*';
//   }
//   return x;
// }

// Create Discord client
const client = new Discord.Client();
client.config = config;

client.commands = new Enmap();
client.aliases = new Discord.Collection();

// Initialize logger
log.init();


// client.on("message", async message => {
//   if (message.content.indexOf(config.prefix) == 0) return;
//   let oldMessage = message.content;

//   swear.words.forEach(function(word) {
//     let regexString = createRegex(word);

//     let regex = new RegExp(regexString, "gi");
//     let isTrue = regex.test(message.content);
//     let swearWords2 = regex.exec(message.content);

//     if (isTrue == true) {
//       let swearWords = regex.exec(message.content);
//       let x = createCensor(swearWords[0].length);
//       message.content = message.content.replace(regex, x);
//     }
//   });

//   if (message.content == oldMessage) return;

//   let name = '';

//   if (message.member.nickname) name = message.member.nickname;
//   else name = message.author.username;

//   message.delete()
//   message.channel.createWebhook(name, message.author.avatarURL)
//   .then(async wb => {
//     const webhook = new Discord.WebhookClient(wb.id, wb.token)
//     await webhook.send(message.content)
//     webhook.delete()
//   });
// });

// client.on("messageUpdate", async (oldMessage, message) => {
//   if (message.content.indexOf(config.prefix) == 0) return;
//   let originalMessage = message.content;

//   swear.words.forEach(function(word) {
//     let regexString = createRegex(word);

//     let regex = new RegExp(regexString, "gi");
//     let isTrue = regex.test(message.content);
//     let swearWords2 = regex.exec(message.content);

//     if (isTrue == true) {
//       let swearWords = regex.exec(message.content);
//       let x = createCensor(swearWords[0].length);
//       message.content = message.content.replace(regex, x);
//     }
//   });

//   if (message.content == originalMessage) return;

//   let name = '';

//   if (message.member.nickname) name = message.member.nickname;
//   else name = message.author.username;

//   message.delete()
//   message.channel.createWebhook(name, message.author.avatarURL)
//   .then(async wb => {
//     const webhook = new Discord.WebhookClient(wb.id, wb.token)
//     await webhook.send(message.content)
//     webhook.delete()
//   });
// });

let doIt = true
client.on('messageReactionAdd', (messageReaction, user) => {

  if (messageReaction.message.channel.id !== config.channels.polls)  return;

    let users = messageReaction.users.array();
    let reactor = users[users.length - 1];
    if (reactor.bot == true) return;
    const file = require(`./reactions/${messageReaction.message.id}`)
    let dupe = false
    file.users.forEach(async function(user){
      if (user == reactor.id) {
        dupe = true
        doIt = false
        await messageReaction.remove(reactor.id)
        doIt = true
      }
    });
    if (dupe == false) {
      file.users.push(reactor.id)
      fs.writeFileSync(`./reactions/${messageReaction.message.id}.json`, JSON.stringify(file), function (error) {
        if (error) throw error;
      });
    }
});

client.on('messageReactionRemove', (messageReaction, user) => {
  if (doIt == false) return;

  if (messageReaction.message.channel.id !== config.channels.polls) return;

    let users = messageReaction.users.array();
    let reactor = users[users.length - 1];
    if (user.bot == true) return;

    const file = require(`./reactions/${messageReaction.message.id}`)
    file.users = file.users.filter(function(value, index, arr){
      return value !== user.id;
    });

    fs.writeFileSync(`./reactions/${messageReaction.message.id}.json`, JSON.stringify(file), function (error) {
      if (error) throw error;
    });
});

let a = 1
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    log.info(a + `: Attempting to load the event '${eventName}'`);
    a = a + 1;
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/", (err, files) => {
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        log.warn("Couldn't find commands!")
        return;
    };
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        log.info(a + `: Attempting to load the command '${f}'`)
        client.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, props.config.name)
        });
        a = a + 1;
    });
    log.info("Successfully loaded all commands.")
});

client.login(`${token.token}`);
