const Discord = require ("discord.js");
const config = require("../config-files/main.json");
const log = require('leekslazylogger');
const fs = require('fs');
const frozenwaters = require("../frozenwaters.js");
const swear = require("../config-files/swearList.json");
const Filter = require('bad-words'),
    filter = new Filter({ placeHolder: '#'});

module.exports.run = async (client, message, args, con) => {

//---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  let perms = frozenwaters.isFounder(message, message.author.id)
  if (perms === false) return;

  //---------------------------------------------------------------------[ Permissions ]---------------------------------------------------------------------//

  message.channel.send('No.')
}

module.exports.config = {
  name: "test",
  aliases: ["testing"],
  description: 'Test',
  area: 'Owner',
  priority: 9
}
