const Discord = require("discord.js");

module.exports = {
    name: "rank",
    description: "rank dos maiores dinheiros",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
     
     let userdb = await client.userdb.find({})
      userdb.sort((a,b) => (b.economia.money + b.economia.banco) - (a.economia.money + a.economia.banco))
      
      userdb = userdb.slice(0,10)
      
     interaction.reply({embeds: [new Discord.MessageEmbed()
     .setTitle(`📊 • Rank dos mais ricos da Economia!`)
     .setColor("a5d7ff")
     .setDescription(`> ${userdb.map((user, i) => `#${i+1} | 👥**${client.users.cache.get(user.userID).tag || `sumido#0000`}** (💸${abreviar(user.economia.money + user.economia.banco)})`).join("\n> ") }`)
          ]})

    }
}

 function abreviar(number, precision=2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
 }
