
var rl = require('readline-sync');
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require("axios");
const { MessageEmbed } = require('discord.js');

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.get("/", function(req, res) {

  res.render("home")
})

const Discord = require("discord.js")
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ]
})
const kurumiGifs = [
  '',
  '',
  '',
  '',
  'https://media1.tenor.com/m/Q7zpHvMuR7QAAAAC/lycoris-recoil-kurumi.gif',
  'https://media1.tenor.com/m/IH0uOu2AiukAAAAC/lycoris-recoil-%E3%83%AA%E3%82%B3%E3%83%AA%E3%82%B9%E3%83%AA%E3%82%B3%E3%82%A4%E3%83%AB.gif',
  'https://media1.tenor.com/m/MowCd7P9Mj8AAAAd/lycoris-recoil-anime.gif',
];

// Fungsi untuk memilih URL secara acak dari array
function getRandomKurumiGif() {
  const randomIndex = Math.floor(Math.random() * kurumiGifs.length);
  return kurumiGifs[randomIndex];
}


async function startAssistant(msg:string, input:string) {
  var reply;
  var char = "Stay in char. Kamu adalahs ebuah hacker yang super genius dengan samaran wallnut. Kamu itu sangat suka sekali hacking dan mengobrol dengna para programmer lainnya. kamu bicara tidak usah formal. pakai saja bahasa gaul seperti gw, lu dan lain lain."

  try{
    const apiurl = `https://sandipbaruwal.onrender.com/gpt2?prompt=${char + input}&uid=62825372`;
    const response = await axios.get(apiurl);
    reply = response.data
  }catch(e) {
    console.log(e)
    reply = "aduh maaf kaka, kayaknya aku rusak, bisa tag <@1156486226094870569> buat perbaiki aku ya:("
  }

  await msg.reply(reply + "\n" + getRandomKurumiGif()); // Mengedit pesan asli dengan balasan dari asisten
}



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


client.on('messageCreate', async (message) => {

  if (message.author.bot) return;
  if (message.content.startsWith("W>")) {
    const loadingMessage = await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
    await startAssistant(message, message.content.replace("W>", "").trim());
    // Mengirim pesan embed ke saluran tertentu

  }else if(message.content.startsWith("W-Motivation")) {
    const loadingMessage = await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
    const category = 'computers';
    const apiKey = 'b58Wa7EBN9cRvAUXRohMog==HchlC22tksPqpt82';

    axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      headers: {
        'X-Api-Key': apiKey
      }
    })
    .then(response => {
      if (response.data && response.data.length > 0) { // Periksa apakah respons memiliki data
        message.reply("*" + response.data[0].quote + "*"); // Mengirim quote pertama dari respons sebagai balasan
      } else {
        message.reply("Maaf, tidak ada kutipan yang ditemukan untuk kategori ini."); // Balasan jika tidak ada kutipan yang ditemukan
      }
    })
    .catch(error => {
      console.error('Error: ', error.response.data);
    });

   
  }
});



client.login("MTIxMzA2MDE5NzEzMjc5NTk3Ng.GIdcF4.lRat7So1jIVkscw2yCW4S5rh_JrY-hwr0Nabu8")


app.listen(8080, (req, res) => {
  Host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0'
})
