const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const btcValor = require('btc-value');
//const commando = require('discord.js-commando');

const bot = new Discord.Client();
//const botc = new commando.Client();

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online`);
    console.log('I am ready!');
    bot.user.setPresence({ game: { name: 'CBlol', type: 0 } });
});

bot.on('message', async message => {

  	
  	if (message.author.bot) return;
  	if (message.channel.type === "dm") return;
  	
  	let prefixo = botconfig.prefixo;
  	let mensagemArray = message.content.split(" ");
  	let comando = mensagemArray[0];
  	let args = mensagemArray.slice(1);
  	
  	if (comando === `${prefixo}oi`){
  	    return message.channel.send('Eae');
  	}
  	if (comando === `${prefixo}ping`){
  	    //return message.reply('pong');
  	    return message.channel.send('pong');
  	}
  	
  	if (message.content == `${prefixo}btcdia`) {
        btcValor().then(value => {
        btcValor.getPercentageChangeLastDay().then(percentage => {
            var perc = percentage
            if (perc > 0){
                message.channel.send(`BTC: ${value}$ \nSubiu (ultimo dia): ${perc}% :hugging:`);
               } else if (perc < 0){
                message.channel.send(`BTC: ${value}$ \nDesceu (ultimo dia): ${perc}% :sob:`);
               } else {
                message.channel.send(`BTC: ${value}$ \nManteve (ultimo dia): ${perc}% :rolling_eyes:`);
               }
            });
        });
  	}
  	
  	if (message.content == `${prefixo}btcsemana`) {
        btcValor().then(value => {
        btcValor.getPercentageChangeLastWeek().then(percentage => {
            var perc = percentage
            if (perc > 0){
                message.channel.send(`BTC: ${value}$ \nSubiu (ultima semana): ${perc}% :hugging:`);
               } else if (perc < 0){
                message.channel.send(`BTC: ${value}$ \nDesceu (ultima semana): ${perc}% :sob:`);
               } else {
                message.channel.send(`BTC: ${value}$ \nManteve (ultima semana): ${perc}% :rolling_eyes:`);
               }
            });
        });
  	}
});

//botc.registry.registerGruop('random', 'Random');
//botc.registry.registerDefaults();
//botc.registry.registerCommandsIn(__dirname, '/comandos');

// tem que ser assim pra utilizar no Heroku
//bot.login(process.env.BOT_TOKEN);
//botc.login(process.env.BOT_TOKEN);
// use este pra testar sem ter que dar push no deploy do Heroku
//bot.login("<string key>");
bot.login(botconfig.token);