const client = require("../../index");
const mongo = require("mongoose")
client.on("ready", () =>{
 
let status = [
      `Transando em ${client.guilds.cache.size} servidores.`,
      `Chupando ${client.users.cache.size} usuários.`,
      `Essa budega foi criado pela Aubrey, não se esqueça disso.`
    ],
    i = 0
  setInterval(() =>{
client.user.setActivity(`${status[i++ % status.length]}`, { 
    type: `WATCHING` 
})
  }, 1000 * 30); 

client.user.setStatus('online')
     
  mongo.connection.on('connected', () =>{
  console.log('🍃 MongoDB on')
})
  client.MongoConnect()

  console.log(`🤖 Bot on em ${client.user.tag} `)

})
