const Discord = require("discord.js");

module.exports = {
    name: "retirar",
    description: "retirar seu dinheiro no banco",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "quantia",
         description: "digite uma quantia para retirar, ou digite [tudo]",
         type: 3,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let quantia = interaction.options.getString("quantia")
     
if(quantia < 1 || isNaN(quantia) && quantia.toLowerCase() != "tudo"){
    return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para retirar, ou digitar \`tudo\` para retirar tudo que você tem na carteira.`)
], ephemeral: true})
}

  let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
 
 const usermoney = userdb.economia.banco
 
 if(!userdb || usermoney == 0){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem dinheiro algum na sua conta do banco para retirada.")
], ephemeral: true})
 }
 
  let dinero;
 
 if(quantia.toLowerCase() == "tudo"){
     
     dinero = usermoney
     
 } else {
 
 quantia = ~~quantia

 if(usermoney < quantia)
   return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem toda essa quantia para retirar no momento, no seu banco atualmente só tem ${usermoney} dinheiros.`)
], ephemeral: true})

  dinero = quantia

}

  await client.userdb.updateOne({
      userID: interaction.user.id
  },{ $set: {
          "economia.money": userdb.economia.money + dinero,
          "economia.banco": usermoney - dinero
      }
    })

  interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`💸 Ta ná mão my friendo!`)
    .setColor("a5d7ff")
    .setDescription(`Você acaba de retirar  🤑 \`${dinero}\` dinheiros da sua conta do banco!`)
]})

    }
};
