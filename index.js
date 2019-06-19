const Discord = require('discord.js')
const client = new Discord.Client()
var auth = ''
var authed = 0
var authstart = Date.now()
var continueintro = ''
//~ var citizenlist = new Map()

//~ function citizen(id, username) {
	//~ this.id = id;
	//~ this.username = username;
	//~ this.score = 0;
//~ }

function introgeneral(msg) {
		
	msg.author.send(
		"Welcome. I am your introductory guide to Moradaland, for all the services you will require. \n" +
		"It is with pleasure that I welcome you to Moradaland\nAt each juncture, send !continue to continue the tutorial"
	)
		
	return
}


function checkauthentication(username, msg) {
	if (authed != username) {
		msg.reply('No u')
		return false
	}
	if (Date.now() - authstart > 30000) {
		authed = ''
		msg.reply('Authentication Timeout!')
		return false
	}
	return true
}

client.on('ready', () => {
	console.log('Logged in as ' + client.user.tag)
})

client.on('message', msg => {
	console.log('Received ' + msg.author.username)
	
	//AUTH=======
	if (msg.content === '12qwaszx' && auth === msg.author.username) {
		var authcur = Date.now() - authstart;
		auth = ''
		if (authcur > 30000) {
			authstart = Date.now()
			return msg.author.send('Authentication Timeout!')
		}
		authstart = Date.now()
		authed = msg.author.username
		return msg.author.send('Authentication Success!')
	}
	//==========
	if (!msg.content.startsWith('!')) return
	
	console.log(' ' + msg.content + '\n');

	//AUTHRequest=========
    if (msg.content.startsWith('!auth')) {
		if (Date.now() - authstart > 30000) {
			auth = ''
			authed = ''
		}
		if (auth != '' || authed != '') {
			return msg.author.send('Sorry, someone else is authenticating')
		}
		if (msg.channel.type != 'dm') msg.reply('Please check your dm')
		auth = msg.author.username
		authstart = Date.now()
        return msg.author.send('Enter Authentication code')
        .catch(error => msg.reply('Sorry, an error occured.'))
    }
    //=============
    
    //Bot-tests==========
    if (msg.channel.name != 'bot-tests') {
		return msg.reply('This bot only works in bot-tests, if you are an alpha tester')
    }
    //===================
    
    //kick=============
    if (msg.content.startsWith('!kick')) {
		const member = msg.mentions.members.first()
		
		if (!checkauthentication(msg.member.displayName, msg)) return
        if (!member) {
            return msg.reply('Who are you trying to kick? You must mention a user.')
        }
        if (!member.kickable) {
            return msg.reply('I can\'t kick ' + member.user.tag + '. Sorry!')
        }
        return member.kick()
		.then(() => message.reply('${member.user.tag} was kicked.'))
		.catch(error => message.reply('Sorry, an error occured.'))
	}
	//==================

	//Help==================
    if (msg.content === '!help') {
        return msg.reply(
            'Moradaland Services (Alpha) is a test project by The United World Republic to serve as a central assistance bot for Moradans.\n' +
            '!help -- Information about this bot\n' +
            '!citizen -- Information about Moradan Citizenship\n' +
            '!gov -- Information about the Moradan Government\n' +
            '!dea -- Information about the Department of Executive Administration\n' +
            '!dfa -- Information about the Department of Foreign Affairs\n' +
            '!drp -- Information about the Department of RolePlay\n' +
            '!links -- Links for various Moradaland stuff\n' +
            '\n' +
            '!auth -- Authenticate for the following functions\n' +
            '!kick <member mention> -- Kicks the given member\n' +
            '\n' +
            'Other functions:\n' +
            'Welcome message\n'
        ).then(sent => console.log('Sent a reply to ' + sent.author.username)).catch(console.error);
    }
    //=================
    
    //citizen============
    if (msg.content === '!citizen') {
		return msg.reply(
			'The citizenship database is managed by the department of Executive Administration. Message @Hispano to request for citizenship!\n' +
			'Being a Moradan citizen means you get to participate in the Moradan Roleplay and join the Moradan Government. See !gov or !drp to find out more!\n'
		)
	}
	//==================
	
	//gov============
	if (msg.content === '!gov') {
		return msg.reply(
			'The Moradan Government is made up of 3 parts, the Department of Roleplay (!drp), the Department of Executive Administration (!dea) and the Department of Foreign Affairs (!dfa). Each department runs Moradaland in a different aspect.'
		)
	}
	//==================
	
	//dfa==================
	if (msg.content == '!dfa') {
		return msg.reply(
			'The Department of Foreign Affairs, or the DFA for short, is one of the 3 departments of Moradaland. Its main functions are:\n'+
			'- Promoting the region\n' +
			'- Engaging in diplomatic relationships with other regions\n' +
			'- Introducing the region to new citizens\n\n' +
			'The Department of Foreign Affairs is currently headed by The United World Republic (@palpatinezw)\n'
		)
	}
	//=============================
	
	//dea====================
	if (msg.content == '!dea') {
		return msg.reply (
			'The Department of Executive Administration, or the DEA for short, is one of the 3 departments of Moradaland. Its main functions are:\n'+
			'- Maintatining stability within the region\n' +
			'- Maintaining law and order in the region\n' +
			'- Managing citizens\n\n' +
			'The Department of Executive Administration is currently headed by CSLYMY (@Hispano)\n'
		)
	}
	//=======================
	
	//drp==================
	if (msg.content == '!drp') {
		return msg.reply(
			'The Department of RolePlay, or the DRP for short, is one of the 3 departments of Moradaland. Its main functions are:\n'+
			'- Operating the roleplay of Moradaland\n' +
			'- Chairing the Moradaland International Committee\n' +
			'The Department of Executive Administration is currently headed by Yrsaland (@AuroraBorealisX)\n'
		)
	}
	//================
	
	//links==========
	if (msg.content == '!links') {
		return msg.reply(
			'REGION: http://www.nationstates.net/region=moradaland\n'+
			'Forum: http://moradaland.forumotion.com\n'+
			'WhatsApp: https://chat.whatsapp.com/FzV2E5xXgCEAp12AZBtkqq\n'+
			'Discord: https://discord.gg/vCGsKVX\n'+
			'Citizens Registry: http://tinyurl.com/MoradalandCitizen\n'+
			'Map: https://drive.google.com/drive/folders/1vjhCdIGVnb7pWI1MtZK4jBGsrkymQzT2?usp=sharing'
		)
	}
	//============
	
	//register
	//~ if (msg.content.startsWith('!register')) {
		//~ const member = msg.mentions.members.first()
		
		//~ if (!checkauthentication(msg.member.displayName, msg)) return
        //~ if (!member) {
            //~ return msg.reply('Who are you trying to register? You must mention a user.')
        //~ }
        //~ citizen.set(member.username, new citizen(msg.content.substr(10, 14), member.username))
	//~ }
	//================
	
	//intro
	if (msg.content == "!intro") {
		 msg.reply("Welcome the Moradaland Basic Starters tutorial\nRefer to the instructions on your dm")
		 return introgeneral(msg)
		
	}
	
	if (msg.content == '!continue') {
		continueintro = msg.author.username
		return
	}
	
	msg.reply('Sorry, function does not exist')
})

//Welcome message=====
client.on('guildMemberAdd', member => {
    member.guild.channels.get('577470439849197569').send(
		"Welcome to Moradaland. I am Moradalands bot. Check !help for a full list of commands.\n" +
		"Check the pins under #announcements to find a list of links. Alternatively, use !links\n" +
		"Send !help to know more about me and my functions! If you are new here, check out !intro to get started!\n"	
	);
})
//====================

client.login(process.env.BOT_TOKEN)
