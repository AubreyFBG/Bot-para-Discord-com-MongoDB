const Discord = require("discord.js");

module.exports = {
    name: "divorciar",
    description: "se divorciar de alguem.",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        
     const userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
          
     if(!userdb || !userdb.economia.marry.casado){
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`✋ Calma ae filhão...`)
    .setColor("a5d7ff")
    .setDescription(`Você não está casado com ninguém.`)
], ephemeral: true})
     }

    const butao = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`sim`)
		.setLabel('Sim')
		.setStyle('SECONDARY'),
		new Discord.MessageButton()
		.setCustomId(`nao`)
		.setLabel('Não')
		.setStyle('SECONDARY'),
			);

   const casado = await client.users.fetch(userdb.economia.marry.com)

   interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Divórcio 💔`)
    .setColor("a5d7ff")
    .setDescription(`${interaction.user}, tem certeza que deseja se divorciar de ${casado.username}?`)
], components: [butao], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
  
  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o comando pode usar o botão.`)
], ephemeral: true})

   collector.stop()

   if(i.customId == "sim"){
       
       await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $set:{
          "economia.marry.casado": false,
          "economia.marry.com": 0
       }
       })
       
       await client.userdb.updateOne({
           userID: casado.id
       }, { $set:{
          "economia.marry.casado": false,
          "economia.marry.com": 0
       }
       })
       
       
       interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`💔 Pelo visto o amor acabou...`)
    .setColor("a5d7ff")
    .setDescription(`Você acaba de se divorciar de ${casado.username}.`)
], components: []})
   }
   
   if(i.customId == "nao"){
      interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😶 A vida continua...`)
    .setColor("a5d7ff")
    .setDescription(`O divórcio foi cancelado.`)
], components: []})
       
   }
   
})

})

    }
};
