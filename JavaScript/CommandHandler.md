# CommandHandler

Bem o command handler, é algo simples, e que pode lhe ajudar muito (principalmente na otimização) !

Para começar você deve ir nas suas importações da **index.js** e importar algumas coisas:
```js
var fs = require('fs');

bot.commands = new Discord.Collection();//se você definiu "client", troque "bot" por client!
bot.aliases = new Discord.Collection();
```
Logo abaixo você tera que fazer pequenas coisas para detectar os comandos!
```js
fs.readdir('./commands', (erro, file) => {
  if (erro) console.log(erro.stack);
  let jsf = file.filter(f => f.endsWith('.js'));//isso fara com que apenas pega os comandos feitos em ".js"
  if (jsf.length < 0) console.log('Nenhum comando foi encontrado!');//caso não tenha nenhum comando ou possivelmente algum erro
  jsf.forEach((f, i) => {
    let p = require(`./commands/${f}`);
    bot.commands.set(p.conf.name, p);
    console.log(`Carregando comando: ${p.conf.name}`)
    p.conf.aliases.forEach(a => {
      bot.aliases.set(a, p.conf.name);
    })
  })
})
```
Agora para o evento de **message** importar os comandos você deve colocar:
```js
bot.on('message', message => {
  if (!message.content.startsWith(config.prefix)) return //Não processa mensagens que não começa com o prefixo do bot.
  let args = message.content.split(' ');
  let comando = args.shift().slice(config.prefix.length).toLowerCase();
  
  let cmd = bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando));
  if (cmd) {
    cmd.run(bot, message, args) //Executa o comando
  }
});
```
Bem o handler esta feito (bem simples) !

# Montagem de comando

```js
var Discord = require('discord.js');

module.exports = {
  conf: {
    name:    '',//nome do arquivo
    aliases: [],//aliases desejadas, isso é: uma segunda forma de execução do comando! Se não desejar nenhuma aliase apenas deixar vázio "[]"
    desc:    '',//descrição do comando
    usage:   '',//forma de utilização
    grupo:   '',//grupo em que se encontra o comando, ex: Administração,
    membro:  '',//o nivel em que o membro precisa ter, ex: Administrador, Membro, Dono
  },
  run: async(bot, message, args) => {
    //o código de seu comando sem utilizar "if (message.content.startWith('')) {}"
  }
}
```
Você deve repetir esse mesmo processo ([montagem de comando]()) em todos os comandos.

Agora apenas criar seus próprios comandos!
