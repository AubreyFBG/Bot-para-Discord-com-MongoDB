const Discord = require("discord.js")
module.exports = {
  name: "help",
  description: "Ver a lista de comandos do bot",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
   
  const embed = new Discord.MessageEmbed()
    .setTitle('🤖 Ver todos os comandos do bot!')
    .setColor("a5d7ff")
    .setDescription('Selecione uma categoria de comandos para ver.')
  
const row = new Discord.MessageActionRow()
	.addComponents(
	new Discord.MessageSelectMenu()
    .setCustomId('menu')
	.setPlaceholder('selecione uma categoria de comandos.')
	.addOptions([
		{
			label: 'Economia',
      emoji: '🤑',
			value: 'economia',
		},
		{
	    	label: 'Outros',
        emoji: '🌐',
		    value: 'outros',
		},
	]),
			);

interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {

  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {

  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o menu pode usá-lo.`)
], ephemeral: true})

   i.deferUpdate()

 if(i.values[0] == "economia"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('🤑 Comandos de Economia:')
    .setColor("a5d7ff")
    .addFields(
		{ name: '__Atm__', value: 'Ver quanto dinheiro você, ou outro usuário tem.' },
		{ name: '__Casar__', value: 'Casar com o amor da sua vida! Ou não...' },
    { name: '__Daily__', value: 'Pegar seu prêmio diário de dinheiros.' },
		{ name: '__Depositar__', value: 'Depositar o dinheiro que você tem na mão no banco' },
    		{ name: '__Divorciar__', value: 'Se divorciar no corno que te chifrou.' },
		{ name: '__Empregos__', value: 'Ver os empregos disponíveis e pega-los' },
    { name: '__Pay__', value: 'Transferir alguma quantia para alguém.' },
		{ name: '__Perfil__', value: 'Ver o seu perfil ou de algum outro usuário.' },
    { name: '__Rank__', value: 'Ver as pessoas mais ricas da economia do bot.' },
		{ name: '__Retirar__', value: 'Retirar o dinheiro do banco para as mãos.' },
    { name: '__Sobremim__', value: 'Alterar o conteúdo do seu sobremim do perfil.' },
		{ name: '__Work__', value: 'Trabalhar no seu emprego pego no /Empregos.' },
	)
    ]})
 }
  if(i.values[0] == "outros"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('🌐 Outros comandos:')
    .setColor("a5d7ff")
    .addFields(
		{ name: '__Ping__', value: 'Ver o ping do bot e da Database.' },
		{ name: '__Help__', value: 'Ver uma lista de todos os comandos.' },
      )
              ]})
  }
  
})//collector
  
})//.then
    
  }
}
