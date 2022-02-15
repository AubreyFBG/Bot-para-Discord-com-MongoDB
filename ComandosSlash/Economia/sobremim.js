const Discord = require("discord.js");

module.exports = {
    name: "sobremim",
    description: "alterar o sobremim do seu perfil",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "sobremim",
         description: "digite o conteúdo so seu sobremim",
         type: 3,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     const sobremim = interaction.options.getString("sobremim")
     
     let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }

userdb.economia.sobremim = sobremim; userdb.save()
      
     interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😉 Ta na mão chefe!`)
     .setColor("a5d7ff")
     .setDescription(`> Seu sobremim foi alterado para: \`${sobremim}\``)
          ]})

    }
};
