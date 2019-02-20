const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Conectaco com sucesso ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('Pong!');
  }
});

client.login('token');
