const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var mysql = require('mysql');
var randomstring = require("randomstring")

var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

con.connect();

client.on("ready", () => {
  console.log(`Địt Mẹ Mày Ranh Con`);
  client.user.setActivity(`Bot Ngu Biết Whitelist`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const member = message.mentions.members.first()

  if(command === "a") {
    if(!message.member.roles.some(r=>["Administrator","Moderator"].includes(r.name))) {
      message.reply("abbb");
    } else {
      message.reply("Sorry, you don't have permissions to use this!")
    }
  }

  if(command === "getscript") { 
  con.query(`SELECT userkey FROM whitelistbot WHERE discord_id = '${message.author.id}'`, function (error, results, fields) {
  if (error) throw error
      let userkey = results[0].userkey
      message.channel.send(`Key You ** ${userkey} **`)
    });
  }

  if(command === "changip") {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
    const taggedUser = message.mentions.users.first();
    message.channel.send(`Changed IP ${args[0]}`);
    let sql;
    sql = `UPDATE whitelistbot SET IP = '${args[0]}' WHERE discord_id = '${message.author.id}'`;
    con.query(sql)
  }

 if(command === "whitelist") {
    if (message.mentions.users.size) {
    const taggedUser = message.mentions.users.first();
    message.channel.send(`${taggedUser.username} Had Whitelist`);
    let sql;
    sql = `INSERT INTO whitelistbot (discord_id, userkey, IP) VALUES ('${taggedUser.id}', '${randomstring.generate()}', 'khong')`;
    con.query(sql)
  } else {
    message.reply('Please tag a valid user!');
  }}

  if(command === "wl") {
    if (message.mentions.users.size) {
    const taggedUser = message.mentions.users.first();
    message.channel.send(`${taggedUser.username} Had Whitelist`);
    let sql;
    sql = `INSERT INTO whitelistbot (discord_id, userkey, IP) VALUES ('${taggedUser.id}', '${randomstring.generate()}', 'khong')`;
    con.query(sql)
  } else {
    message.reply('Please tag a valid user!');
  }}
});

client.login(config.token);
