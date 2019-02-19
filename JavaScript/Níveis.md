#Sitema Níveis
Basicamente o sistema de nível dá uma quantidade de experiência ao usuário conforme interage com o servidor. Ao passar de nível, as pessoas podem ganhar cargos por exemplo. É importante lembrar que seu bot tenha uma database, caso contrário isso será praticamente inviável.

##Começando...
Existem duas formas, a que você pode deixar níveis finitos (você mesmo definir quanto de xp é necessário e quantos níveis terá) ou infinitos.

###Níveis Infinitos
Começe definindo uma fórmula em que seus níveis serão baseados, o valor para passar para o nível 1. Assim, o valor que definir irá mostrar a quantidade de xp que precisa para passar para próximo nível.

Exemplo da constante:

>const getXp = (nivel) => Math.floor(((nivel / 0.2) * (nivel / 0.3)) * Math.PI)

Para eu passar para o nível 1, vou precisar de 52 de xp. Para passar para o nível 2, precisará de 209 e assim por diante.

####XP da mensagem
Para dar xp, é importante avaliar se a mensagem merece receber Xp. Você pode passar por vários filtros, como se a mensagem contém caracteres repetidos, se é apenas emoji, se é curta de mais e etc. Geralmente o xp é dado dependendo do tamanho da mensagem, após passar por esses filtros. Aqui está um filtro de caracteres repetidos:

>const removerDuplicados = s => s.split("").sort().reduce((a,b)=>(a[a.length-1]!=b)?(a+b):a,"")

Você pode passar a mensagem pelo filtro, você pode contar quantos caracteres diferentes foram usados, e assim se for maior que 6 (por exemplo), dar uma quantidade de xp aleatória.
Para dar xp aleatório, usamos o Math.random(), que é nativo no JavaScript.

>Math.floor(Math.random() * 10 + 1)

Aqui será gerado um número aleatório de 1 a 10 e a função Math.floor() arredonda para o menor número inteiro. Para mudar a quantidade de xp, você pode alterar tanto o número 10 (máximo), como o 1 (mínimo). 
Exemplo do código atual do xp da mensagem:

>	let mensagemPura = removerDuplicados(message.content)//Verificar quantidade de caracteres diferentes na mensagem.
>	let mensagemXP = 0;
>	if(mensagemPura.length >= 7) mensagemXP = Math.floor(Math.random() * 3 + 1)//Número aleatório entre 1 e 3
>	if(mensagemPura.length >= 12) mensagemXP += Math.floor(Math.random() * 3 + 1)//Número aleatório entre 1 e 3
>//Se a quantidade de caracteres diferentes for maior/igual a 7 ou maior/igual a 12, gera número aleatório entre 1 e 3 (tornando o máximo de xp possível de se obter 9 por mensagem.)

#####Passar de Nível
Agora que verificamos o xp que a mensagem vale, salve no perfil do usuário o xp e então vamos verificar se ele pode passar de nível.

>    let xp = usuario.xp //Pega o xp do usuário
>    let requerXp = getXp(usuario.level + 1)//Verifica quanto de xp irá precisar para passar para o próximo nível usando a constante que você definiu
>    if(xp > requerXp) {
>        //Passou de nível!
>    }

Se ele passou de nível, você pode enviar uma mensagem...

>    let xp = usuario.xp //Xp do usuário
>    let requerXp = getXp(usuario.level + 1)//Verifica quanto de xp irá precisar para passar para o próximo nível usando a constante que você definiu
>    if(xp > requerXp) {
>        //Passou de nível!
>        //Atualize o nível do usuário na sua database!
>        message.channel.send(`O usuário ${message.author} acaba de passar para o nível ${usuario.level + 1}`)
>    }

![Final](https://i.imgur.com/0eWmgIB.png)
