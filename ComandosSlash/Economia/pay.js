const Discord = require("discord.js");

module.exports = {
    name: "pay",
    description: "transferir algum valor para algum usuário.",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "usuário que você quer mandar o dinheiro",
         type: 6,
         required: true
        },
        {
         name: "quantia",
         description: "a quantia de dinheiro de que você quer enviar",
         type: 10,
         required: true
        }
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("user")
     
     const quantia = ~~interaction.options.getNumber("quantia")
     
     if(user.id == interaction.user.id){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Calma lá patrão...`)
    .setColor("a5d7ff")
    .setDescription("Você não pode transferir dinheiro para si mesmo.")
], ephemeral: true})
 }
     
     const userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
     
     if(!userdb || userdb.economia.money == 0){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem dinheiro nenhum em mãos. Caso tiver dinheiro no banco, retire-o de lá antes de tentar fazer a transferência.")
], ephemeral: true})
 }
 
      if(userdb.economia.money < quantia){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem todo esse dinheiro em mãos. Caso tiver dinheiro no banco, retire-o de lá antes de tentar fazer a transferência.")
], ephemeral: true})
 }
 
      if(quantia < 1){
    return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para tranferir para outro usuário.`)
], ephemeral: true})
}
 
     let userdb2 = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb2){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb2 = await client.userdb.findOne({ userID: user.id })
     }

interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`💸 Dinheiro rolando!`)
    .setColor("a5d7ff")
    .setDescription(`**Hey** ${user}! ${interaction.user} quer lhe tranferir 💰 \`${quantia}\` dinheiros para você.
> *Para concluir a transação os 2 usuários devem clicar na reação.*`)
], fetchReply: true}).then(msg =>{
    
    msg.react("💸")
    
    const filter = (reaction, usuário) => {
	return reaction.emoji.name === '💸' && ([interaction.user.id, user.id]).includes(usuário.id)
};

const collector = msg.createReactionCollector({ filter: filter, time: 1000 * 60 * 10 });

collector.on('collect', (reaction) => {
    
    const users = reaction.users.cache.map(a => a.id)
    
	if(users.includes(interaction.user.id) && users.includes(user.id)){
	    
	    collector.stop()
	    
	if(userdb.economia.money < quantia){
	   
	    return interaction.channel.send({embeds: [new Discord.MessageEmbed()
    .setTitle(`💸 Dinero acabou...`)
    .setColor("a5d7ff")
    .setDescription(`Infelizmente ${interaction.user} não tem mais essa quantia de dinheiro para lhe pagar...`)
]})
	}
	    
	    userdb.economia.money = userdb.economia.money - quantia; userdb.save();
	    
	    userdb2.economia.money = userdb2.economia.money + quantia; userdb2.save();
	
	interaction.channel.send({embeds: [new Discord.MessageEmbed()
    .setTitle(`💸 Dinheiro rolou!`)
    .setColor("a5d7ff")
    .setDescription(`A transição de ${quantia} dinheiros de ${interaction.user} para ${user} foi feita com sucesso!`)
]})

	}
});

})

    }
}
