const Discord = require("discord.js");

module.exports = {
    name: "atm",
    description: "ver a sua atm ou a de alguém",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "usuário que você quer ver a atm.",
         type: 6,
         required: false
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("user") || interaction.user
     
     const userdb = await client.userdb.findOne({
         userID: user.id
     }) || { economia: { banco: 0, money: 0}}
      
     interaction.reply({embeds: [new Discord.MessageEmbed()
     .setAuthor({ name: `${user.id == interaction.user.id ? `Sua atm.` : `Atm de ${user.username}`}`, iconURL: user.avatarURL() })
     .setColor("a5d7ff")
     .setDescription(`> 💸 Dinheiro: ${userdb.economia.money}
> 🏦 Dinheiro no banco: ${userdb.economia.banco}
> 💱 Dinheiro total: ${userdb.economia.money + userdb.economia.banco}`)
          ]})

    }
};
