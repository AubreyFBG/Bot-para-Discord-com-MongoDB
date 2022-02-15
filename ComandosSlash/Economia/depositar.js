const Discord = require("discord.js");

module.exports = {
    name: "depositar",
    description: "depositar seu dinheiro no banco",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "quantia",
         description: "digite uma quantia para depositar, ou digite [tudo]",
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
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para depositar, ou digitar \`tudo\` para depositar tudo que você tem na carteira.`)
], ephemeral: true})
}

  let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
 
 if(!userdb || userdb.economia.money == 0){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem dinheiro nenhum em conta. Use `/daily` para pegar seu prêmio diário, ou pegue um emprego em `/empregos` e use `/work` para trabalhar.")
], ephemeral: true})
 }
 
  const usermoney = userdb.economia.money
 
  let dinero;
 
 if(quantia.toLowerCase() == "tudo"){
     
     dinero = usermoney
     
 } else {
 
 quantia = ~~quantia

 if(usermoney < quantia)
   return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem toda essa quantia para depositar no momento, atualmente você só tem ${usermoney} dinheiros.`)
], ephemeral: true})

  dinero = quantia

}

  await client.userdb.updateOne({
      userID: interaction.user.id
  },{ $set: {
          "economia.money": usermoney - dinero,
          "economia.banco": userdb.economia.banco + dinero
      }
    })

  interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`💸 Ta ná mão my friendo!`)
    .setColor("a5d7ff")
    .setDescription(`Você acaba de transferir 🤑 \`${dinero}\` dinheiros para sua conta do banco!`)
]})

    }
};
