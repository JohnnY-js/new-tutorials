# Mongoose
Chega um ponto que para melhorar a experiência com seu bot precisa usar uma database. Aqui será um tutorial do básico do mongo db, uma database muito utilizada para bots.

## Iniciando...
Para começar, é preciso instalar o mongoose. Para isso, use:

```npm i mongoose --save```

# Criando conta no MLab.com
Após executar esse comando, crie uma conta no site [mlab.com](https://mlab.com), esse site é onde sua database ficará hospedada. Crie uma conta como mostra as imagens abaixo:

Crie sua conta
![index](https://i.imgur.com/jA42Ej5.png)

Coloque seus dados
![dados](https://i.imgur.com/hlXvgWp.png)

Crie uma nova database
![database](https://i.imgur.com/cnWpI78.png)

Escolha o plano e continue
![plano](https://i.imgur.com/tcqqZPk.png)

Escolha a região e continue
![regiao](https://i.imgur.com/FjpXocX.png)

Escolha o nome da database
![nome](https://i.imgur.com/sSbczDv.png)

Verifique tudo e conclua
![end](https://i.imgur.com/90VNxvs.png)

# Fazendo Login
... Após criar a sua database, você vai precisar fazer login nela, para isso use o seu link de login

![login](https://i.imgur.com/y4vA1jH.png) 

que existe na página principal do mlab.com. O usuário e senha que pede aqui você pode verificar ou criar como nessa imagem

![users](https://i.imgur.com/ZMTSRgF.png)

Coloque no arquivo principal do seu bot o seguinte código:

```const mongoose = require('mongoose')
mongoose.connect(`seu link`,{ useNewUrlParser: true,
reconnectTries: Number.MAX_VALUE, 
reconnectInterval: 1000,
keepAlive: 1, 
connectTimeoutMS: 30000, }).then(c => {
    console.log('Concectado à Database!')
}).catch(e => {
    console.log(`Ocorreu um erro ao contectar à database: ${e.message}`)
})
```

Agora que já fez login, crie um arquivo do esquema (a estrutura de dados), que aqui será de um servidor. Para criar um novo esquema use mongoose.Schema({}) e defina as propiedades dele. Lembre-se sempre que ids, de canal, servidor, cargo ou qualquer outro tipo tem que ser String.

```
var mongoose = require('mongoose');
var Servidor = mongoose.Schema({
    id: String,
    canalwelcome: String,
    canalleave: String,
    mensagemwelcome: String,
    mensagemleave: String,
    cargomoderador: String,
    prefixo: String,
    vip: String
});
module.exports = mongoose.model('Servidores', Servidor);
```

## Exemplo para criar um Servidor
Para criar um novo dado na database, você deve importar o arquivo em que o esquema está, usando o `require`. Exemplo da criação do servidor:
```
const Servidor = require('servidores.js')
let servidor = new Servidor({
    id: 'false',
    canalwelcome: 'false',
    canalleave: 'false',
    mensagemwelcome: 'false',
    mensagemleave: 'false',
    cargomoderador: 'false',
    prefixo: '!',
    vip: 'false'
})
servidor.save()
```

Aqui os dados estão como todos `false`, menos o prefixo. Esses serão os dados padrão para quando o servidor for criado. A função `save()` salva os dados do novo servidor na sua database. Podemos verificar o servidor agora quando se manda uma mensagem, caso não exista ele já criar o servidor. É recomendado usar uma Collection do discord para salvar seu servidor em cachê e assim não precisar buscar na database a cada mensagem

Em seu arquivo principal, coloque

``` client.servidores = new Discord.Collection() ```

Então em seu evento de mensagem coloque

```
//Coloque essa parte no topo do arquivo
const Servidores = require('seu aquivo servidores')

//Essa parte dentro do seu evento mensagem
let servidor = client.servidores[message.guild.id] || Servidores.findOne({id: message.guild.id}),async (erro, servidor) => {
        if(erro) console.log(erro)
        if(!servidor) {
            //aqui o servidor vai ser criado, só colocar o código acima...
        else {
            client.servidores[message.guild.id] = {
                id: servidor.id,
                canalwelcome: servidor.canalwelcome,
                canalleave: servidor.canalleave,
                mensagemwelcome: servidor.mensagemwelcome,
                mensagemleave: servidor.mensagemleave,
                cargomoderador: servidor.cargomoderador,
                prefixo: servidor.prefixo,
                vip: servidor.vip
            }
            return
        }
//O prefixo do servidor já está pronto, é só colocar
let prefixo = servidor.prefixo
```

Bom uso! :)
