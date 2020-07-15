const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const log = require('leekslazylogger')
const moment = require('moment');

const config = require("./config-files/main.json");

const staff = require('./permissions/staff.json')
const development = require('./permissions/development.json')
const management = require('./permissions/management.json')
const founders = require('./permissions/founders.json')
const botAdmins = require('./permissions/botAdmins.json')

const warn = require('./punishments/warn.json')
const mute = require('./punishments/mute.json')
const kick = require('./punishments/kick.json')
const ban = require('./punishments/ban.json')

const noPermission = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> You do not have permission to run this command!')
    .setFooter(config.footer, config.footerImage)

const invalid2 = new Discord.RichEmbed()
    .setDescription('<a:animatedCross:608735120303718460> You cannot warn yourself!')
    .setFooter(config.footer, config.footerImage)

//////////////////
//   MAIN AREA  //
//////////////////

function makeId(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function isStaff(message, commandUser) {
    let allowed = false
    staff.users.forEach(function(user){
        if(commandUser == user){
            allowed = true
            return true;
        }
    });
    if (allowed == false) {
        development.users.forEach(function(user){
            if(commandUser == user){
                allowed = true
                return true;
            }
        });
        if (allowed == false) {
            management.users.forEach(function(user){
                if(commandUser == user){
                    allowed = true
                    return true;
                }
            });
            if (allowed == false) {
                founders.users.forEach(function(user){
                    if(commandUser == user){
                        allowed = true
                        return true;
                    }
                });
                if (allowed == false) {
                    botAdmins.users.forEach(function(user){
                        if(commandUser == user){
                            allowed = true
                            return true;
                        }
                    });
                    if (allowed == false) {
                        message.channel.send(noPermission)
                        return false;
                    }
                }
            }
        }
    }
}

function isDeveloper(message, commandUser) {
    let allowed = false
    development.users.forEach(function(user){
        if(commandUser == user){
            allowed = true
            return true;
        }
    });
    if (allowed == false) {
        management.users.forEach(function(user){
            if(commandUser == user){
                allowed = true
                return true;
            }
        });
        if (allowed == false) {
            founders.users.forEach(function(user){
                if(commandUser == user){
                    allowed = true
                    return true;
                }
            });
            if (allowed == false) {
                botAdmins.users.forEach(function(user){
                    if(commandUser == user){
                        allowed = true
                        return true;
                    }
                });
                if (allowed == false) {
                    message.channel.send(noPermission)
                    return false;
                }
            }
        }
    }
}

function isManagement(message, commandUser) {
    let allowed = false
    management.users.forEach(function(user){
        if(commandUser == user){
            allowed = true
            return true;
        }
    });
    if (allowed == false) {
        founders.users.forEach(function(user){
            if(commandUser == user){
                allowed = true
                return true;
            }
        });
        if (allowed == false) {
            botAdmins.users.forEach(function(user){
                if(commandUser == user){
                    allowed = true
                    return true;
                }
            });
            if (allowed == false) {
                message.channel.send(noPermission)
                return false;
            }
        }
    }
}

function isFounder(message, commandUser) {
    let allowed = false
    founders.users.forEach(function(user){
        if(commandUser == user){
            allowed = true
            return true;
        }
    });
    if (allowed == false) {
        botAdmins.users.forEach(function(user){
            if(commandUser == user){
                allowed = true
                return true;
            }
        });
        if (allowed == false) {
            message.channel.send(noPermission)
            return false;
        }
    }
}

function isBotAdmin(message, commandUser) {
    let allowed = false
    botAdmins.users.forEach(function(user){
        if(commandUser == user){
            allowed = true
            return true;
        }
    });
    if (allowed == false) {
        message.channel.send(noPermission)
        return false;
    }
}

function checkStaff(message, commandUser) {
    let allowed = false
    staff.users.forEach(function(user){
        if(commandUser == user){
            allowed = true
            return true;
        }
    });
    if (allowed == false) {
        development.users.forEach(function(user){
            if(commandUser == user){
                allowed = true
                return true;
            }
        });
        if (allowed == false) {
            management.users.forEach(function(user){
                if(commandUser == user){
                    allowed = true
                    return true;
                }
            });
            if (allowed == false) {
                founders.users.forEach(function(user){
                    if(commandUser == user){
                        allowed = true
                        return true;
                    }
                });
                if (allowed == false) {
                    botAdmins.users.forEach(function(user){
                        if(commandUser == user){
                            allowed = true
                            return true;
                        }
                    });
                    if (allowed == false) {
                        return false;
                    }
                }
            }
        }
    }
}

function warnUser(message, user, reason, mod) {
    if (!warn[user.id]) warn[user.id] = {
        "warningIds": [],
        "warningReasons": [],
        "warningDates": [],
        "warningMods": []
    }

  warn[user.id].warningIds.push(makeId(8))
  warn[user.id].warningReasons.push(reason)
  warn[user.id].warningDates.push(moment().format('D/M/Y'))
  warn[user.id].warningMods.push(mod.id)

  fs.writeFileSync(`./punishments/warn.json`, JSON.stringify(warn), function (error) {
    if (error) throw error;
  });
}

////////////////////
//  EXPORTS AREA  //
////////////////////

module.exports = {
    isStaff: isStaff,
    isDeveloper: isDeveloper,
    isManagement: isManagement,
    isFounder: isFounder,
    isBotAdmin: isBotAdmin,
    warnUser: warnUser,
    makeId: makeId,
    checkStaff: checkStaff
}
