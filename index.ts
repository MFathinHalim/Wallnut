var rl = require("readline-sync");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
//const { setInterval } = require('timers/promises'); // Import if not already included

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var Discord = require("discord.js");
let Client = Discord.Client;
let Intents = Discord.Intents;
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const kurumiGifs = [
  "",
  "",
  "",
  "",
  "https://media1.tenor.com/m/Q7zpHvMuR7QAAAAC/lycoris-recoil-kurumi.gif",
  "https://media1.tenor.com/m/IH0uOu2AiukAAAAC/lycoris-recoil-%E3%83%AA%E3%82%B3%E3%83%AA%E3%82%B9%E3%83%AA%E3%82%B3%E3%82%A4%E3%83%AB.gif",
  "https://media1.tenor.com/m/MowCd7P9Mj8AAAAd/lycoris-recoil-anime.gif",
];

// Fungsi untuk memilih URL secara acak dari array
function getRandomKurumiGif() {
  const randomIndex = Math.floor(Math.random() * kurumiGifs.length);
  return kurumiGifs[randomIndex];
}

async function startAssistant(msg: any, input: string) {
  var reply;
  var char =
    "Stay in char. Kamu adalah sebuah hacker yang super genius dengan samaran wallnut. Kamu itu sangat suka sekali coding dan hacking. pakai saja bahasa gaul seperti gw, lu dan lain lain. kamu diajak bicara dengan pembicaraan  ' ".replace(
      / /g,
      "%20"
    );
  try {
    const apiurl = `https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(
      char + input
    )}' &uid=62825372`;
    const response = await axios.get(apiurl);
    reply = response.data.answer;
  } catch (e) {
    console.log(e);
    reply =
      "aduh maaf kaka, kayaknya aku rusak, bisa tag <@1156486226094870569> buat perbaiki aku ya:(";
  }

  await msg.reply(reply + "\n" + getRandomKurumiGif()); // Mengedit pesan asli dengan balasan dari asisten
}
const channel = client.channels.cache.get("1206268678895566948");

const sendRandomMessage = async () => {
  if (!channel) {
    console.log("No channel found with ID 1206268678895566948."); // Informative message
    return;
  }

  const randomMessage = "Halo Coders! "; // Replace this with your desired message
  try {
    await channel.send(randomMessage);
  } catch (error) {
    console.error("Error sending random message:", error);
  }
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(sendRandomMessage, 120 * 1000); // Start the interval after initial message
});

client.on("messageReply", async (message: any, reply: any) => {
  console.log(reply.content);
  if (reply.author.id !== "1213060197132795976")
    console.log("bukan urusan gweh"); // Hanya tanggapi balasan ke Wallnut
  const replyContent = reply.content.trim();

  const loadingMessage = await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
  await startAssistant(
    message,
    replyContent.replace("<@1213060197132795976>", "").trim()
  );
});

client.on("messageCreate", async (message: any) => {
  console.log(message.content);
  if (message.author.bot) return;
  if (message.content.startsWith("W>")) {
    let messageSebenarnya = message.content.replace("W>", "");
    const loadingMessage = await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
    if (messageSebenarnya.includes("RPhising")) {
      let id = messageSebenarnya.replace("RPhising", "").trim();
      // Cari pengguna berdasarkan ID
      let user = await client.users.fetch(id).catch(console.error);
      console.log(user);
      if (!user) return console.log("User tidak ditemukan!");

      // Ambil semua pesan pengguna yang mengandung discord.gg
      message.channel.messages
        .fetch({ limit: 100 })
        .then((messages: any) => {
          let userMessages = messages.filter(
            (msg: any) =>
              msg.author.id === user.id &&
              (msg.content.includes("https://", "") ||
                msg.content.includes("http://", "") ||
                msg.content.includes("discord.gg"))
          );
          if (userMessages.size > 0) {
            // Hapus pesan-pesan tersebut
            message.channel
              .bulkDelete(userMessages)
              .then((deleted: any) =>
                console.log(
                  `Deleted ${deleted.size} messages from ${user.username}.`
                )
              )
              .catch(console.error);
          } else {
            console.log(
              "Tidak ada pesan yang ditemukan dari pengguna tersebut dengan tautan discord.gg."
            );
          }
        })
        .catch(console.error); //
      message.reply(
        "<@1206223343905148959> <@1156486226094870569> ada phising weh ayo kalian tangani dengan tersangka <@" +
          id +
          ">"
      );
    } else {
      await startAssistant(message, messageSebenarnya.trim());
    }
  } else if (message.content.includes("<@1213060197132795976>")) {
    await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
    await startAssistant(
      message,
      message.content.replace("<@1213060197132795976>", "").trim()
    );
  } else if (message.content.startsWith("W-Motivation")) {
    const loadingMessage = await message.channel.sendTyping(); // Menyimpan pesan loading sebagai objek Message
    const category = "computers";
    const apiKey = "b58Wa7EBN9cRvAUXRohMog==HchlC22tksPqpt82";

    axios
      .get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: {
          "X-Api-Key": apiKey,
        },
      })
      .then((response: any) => {
        if (response.data && response.data.length > 0) {
          // Periksa apakah respons memiliki data
          message.reply("*" + response.data[0].quote + "*"); // Mengirim quote pertama dari respons sebagai balasan
        } else {
          message.reply(
            "Maaf, tidak ada kutipan yang ditemukan untuk kategori ini."
          ); // Balasan jika tidak ada kutipan yang ditemukan
        }
      })
      .catch((error: Error) => {
        console.error("Error");
      });
  }
});

require("dotenv").config();
client.login(process.env.id);

app.listen(8080, () => {
  Host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
});
