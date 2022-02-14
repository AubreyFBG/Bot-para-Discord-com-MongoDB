const Discord = require("discord.js");

const config = require("./Config.json")

const mongo = require("mongoose");

const client = new Discord.Client({ intents: 32767 });

module.exports = client;

client.userdb = require("./Database/user.js")

client.slashCommands = new Discord.Collection();

require("./Handler")(client);

client.MongoConnect = () => mongo.connect(config.BotToken)

client.login(config.MongoURL);
