
var rl = require('readline-sync');
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require("axios");
const { MessageEmbed } = require('discord.js');
const { setInterval } = require('timers/promises'); // Import if not already included

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.get("/", function(req, res) {

  res.render("home")
})

var Discord = require("discord.js");
let Client = Discord.Client;
let Intents = Discord.Intents;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
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
  var char = "Stay in char. Kamu adalah sebuah hacker yang super genius dengan samaran wallnut. Kamu itu sangat suka sekali coding dan hacking. pakai saja bahasa gaul seperti gw, lu dan lain lain. kamu diajak bicara dengan pembicaraan  ' ".replace(/ /g, "%20");
  try{
    const apiurl = `https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(char + input)}' &uid=62825372`;
    const response = await axios.get(apiurl);
    reply = response.data.answer
  }catch(e) {
    console.log(e)
    reply = "aduh maaf kaka, kayaknya aku rusak, bisa tag <@1156486226094870569> buat perbaiki aku ya:("
  }

  await msg.reply(reply + "\n" + getRandomKurumiGif()); // Mengedit pesan asli dengan balasan dari asisten
}
const channel = client.channels.cache.get('1206268678895566948');

const sendRandomMessage = async () => {
  if (!channel) {
    console.log("No channel found with ID 1206268678895566948."); // Informative message
    return;
  }

  const randomMessage = "Halo Coders! "; // Replace this with your desired message
  try {
    await channel.send(randomMessage);
  } catch (error) {
    console.error('Error sending random message:', error);
  }
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(sendRandomMessage, 120 * 1000); // Start the interval after initial message
});


client.on('messageReply', async (message, reply) => {
  console.log(reply.content)
  if (reply.author.id !== '1213060197132795976') console.log("bukan urusan gweh"); // Hanya tanggapi balasan ke Wallnut
  const replyContent = reply.content.trim();


    const loadingMessage = await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
    await startAssistant(message, replyContent.replace("<@1213060197132795976>", "").trim());

});

client.on('messageCreate', async (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  if (message.content.startsWith("W>")) {
    const loadingMessage = await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
    await startAssistant(message, message.content.replace("W>", "").trim());
    // Mengirim pesan embed ke saluran tertentu

  }else if(message.content.includes("<@1213060197132795976>")) {
    const loadingMessage = await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
    await startAssistant(message, message.content.replace("<@1213060197132795976>", "").trim());
  }
   else if(message.content.startsWith("W-Motivation")) {
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


require("dotenv").config()
client.login(process.env.id)


app.listen(8080, (req, res) => {
  Host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0'
})
