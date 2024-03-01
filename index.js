var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var rl = require('readline-sync');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var axios = require("axios");
var MessageEmbed = require('discord.js').MessageEmbed;
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", function (req, res) {
    res.render("home");
});
var Discord = require("discord.js");
var client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});
var kurumiGifs = [
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
    var randomIndex = Math.floor(Math.random() * kurumiGifs.length);
    return kurumiGifs[randomIndex];
}
function startAssistant(msg, input) {
    return __awaiter(this, void 0, void 0, function () {
        var reply, char, apiurl, response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    char = "Stay in char. Kamu adalahs ebuah hacker yang super genius dengan samaran wallnut. Kamu itu sangat suka sekali hacking dan mengobrol dengna para programmer lainnya. kamu bicara tidak usah formal. pakai saja bahasa gaul seperti gw, lu dan lain lain.";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    apiurl = "https://sandipbaruwal.onrender.com/gpt2?prompt=".concat(char + input, "&uid=62825372");
                    return [4 /*yield*/, axios.get(apiurl)];
                case 2:
                    response = _a.sent();
                    reply = response.data;
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    reply = "aduh maaf kaka, kayaknya aku rusak, bisa tag <@1156486226094870569> buat perbaiki aku ya:(";
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, msg.reply(reply + "\n" + getRandomKurumiGif())];
                case 5:
                    _a.sent(); // Mengedit pesan asli dengan balasan dari asisten
                    return [2 /*return*/];
            }
        });
    });
}
client.on("ready", function () {
    console.log("Logged in as ".concat(client.user.tag, "!"));
});
client.on('messageCreate', function (message) { return __awaiter(_this, void 0, void 0, function () {
    var loadingMessage, loadingMessage, category, apiKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (message.author.bot)
                    return [2 /*return*/];
                if (!message.content.startsWith("W>")) return [3 /*break*/, 3];
                return [4 /*yield*/, message.channel.sendTyping()];
            case 1:
                loadingMessage = _a.sent();
                return [4 /*yield*/, startAssistant(message, message.content.replace("W>", "").trim())];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!message.content.startsWith("W-Motivation")) return [3 /*break*/, 5];
                return [4 /*yield*/, message.channel.sendTyping()];
            case 4:
                loadingMessage = _a.sent();
                category = 'computers';
                apiKey = 'b58Wa7EBN9cRvAUXRohMog==HchlC22tksPqpt82';
                axios.get("https://api.api-ninjas.com/v1/quotes?category=".concat(category), {
                    headers: {
                        'X-Api-Key': apiKey
                    }
                })
                    .then(function (response) {
                    if (response.data && response.data.length > 0) { // Periksa apakah respons memiliki data
                        message.reply("*" + response.data[0].quote + "*"); // Mengirim quote pertama dari respons sebagai balasan
                    }
                    else {
                        message.reply("Maaf, tidak ada kutipan yang ditemukan untuk kategori ini."); // Balasan jika tidak ada kutipan yang ditemukan
                    }
                })["catch"](function (error) {
                    console.error('Error: ', error.response.data);
                });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
client.login("MTIxMzA2MDE5NzEzMjc5NTk3Ng.GIdcF4.lRat7So1jIVkscw2yCW4S5rh_JrY-hwr0Nabu8");
app.listen(8080, function (req, res) {
    Host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';
});
