const Discord = require('discord.js')
const Canvas = require('canvas')

const { registerFont } = require('canvas')
registerFont('././Font.otf', { family: 'Uniform' })

module.exports = {
    name: "perfil",
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
     }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto."}}

    const canvas = Canvas.createCanvas(850, 550)
    const ctx = canvas.getContext("2d")

    const background = await Canvas.loadImage("https://i.imgur.com/vFqyhnK.png")
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    const layout = await Canvas.loadImage("https://i.imgur.com/NPR3ALW.png")
    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

ctx.font = '30px Uniform';
ctx.fillStyle = '#F8F8F8';
ctx.fillText(`${user.username}`, 149 - user.username.length * 7, 37)

ctx.font = '22px Uniform';
ctx.fillStyle = '#F8F8F8';      
ctx.fillText(`${userdb.economia.sobremim.slice(0,64)}\n${userdb.economia.sobremim.slice(64,128)}\n${userdb.economia.sobremim.slice(128,192)}`, 60, 495)
      
ctx.font = '23px Uniform';
ctx.fillStyle = '#F8F8F8';
ctx.fillText(`${abreviar(userdb.economia.money)}`, 717, 229)
ctx.fillText(`${abreviar(userdb.economia.banco)}`, 690, 268)
ctx.fillText(`${abreviar(userdb.economia.banco + userdb.economia.money)}`, 672, 312)

ctx.save()
      
if(userdb.economia.marry.casado){
    const img = await Canvas.loadImage("https://i.imgur.com/JI5SfCN.png")
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    const marryUser = await client.users.fetch(userdb.economia.marry.com)

ctx.font = '20px Uniform';
  ctx.fillStyle = '#F8F8F8';
ctx.fillText(`${marryUser.username}`, 690 - marryUser.username.length * 7.4, 74)
  
    const avatarUser = marryUser.avatarURL({ dynamic: true, format: "png", size: 1024 });

ctx.beginPath();
      ctx.arc(688, 111, 33, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
  
    const marryAvatar = await Canvas.loadImage(`${avatarUser}`)
   ctx.drawImage(marryAvatar, 656, 79, 65, 65)

}

ctx.restore()
      
ctx.beginPath();
      ctx.arc(206, 100, 53, 4.7, Math.PI * 0);
      ctx.arc(206, 205, 53, 6.35, Math.PI * 0.52);
      ctx.arc(101, 205, 53, 1.65, Math.PI * 1);
      ctx.arc(101, 100, 53, 3.3, Math.PI * 1.5);
      ctx.closePath();
      ctx.clip();

const avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

    const userAvatar = await Canvas.loadImage(`${avatar}`)
    ctx.drawImage(userAvatar, 45, 45, 218, 218)
      
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'perfil.png')
     interaction.reply({ files: [attachment] })        

}
}

function abreviar(number, precision=2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
}
