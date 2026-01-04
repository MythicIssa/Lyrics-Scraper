<div align="center">

<h2><strong>🎵 Lyrics Scraper</strong></h2>
<p><em>A lightweight Node.js + Express Scraper for fetching song lyrics from Genius</em></p>

<p align="center">
  <a href="#">
    <img title="LYRICS-SCRAPER" src="https://img.shields.io/badge/LYRICS--SCRAPER-green?colorA=%23222222&colorB=%23017e40&style=for-the-badge">
  </a>
  <a href="https://github.com/MythicIssa">
    <img title="Author" src="https://img.shields.io/badge/Author-Issa-red.svg?style=for-the-badge&logo=github">
  </a>
  <a href="https://github.com/MythicIssa">
    <img title="Open Source" src="https://img.shields.io/badge/Open%20Source-YES-brightgreen.svg?style=for-the-badge">
  </a>
  <a href="#">
    <img title="Maintained" src="https://img.shields.io/badge/Maintained-YES-green.svg?style=for-the-badge">
  </a>
  <a href="/LICENSE">
    <img title="License" src="https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge">
  </a>
</p>

</div>

---

## 🚀 Features

- Search songs by title
- Fetch lyrics, artist name, song image, and Genius link
- JSON API response
- Lightweight and easy to run locally

## ⚙️ Tech Stack

- Node.js
- Express
- Axios
- JSDOM

## 📂 Project Structure

```text
Lyrics-Scraper/
├── src/
│   ├── routes/
│   │   └── lyrics.js
│   └── index.js
├── package.json
└── README.md
```

## 🔧 Installation

```bash
git clone https://github.com/MythicIssa/Lyrics-Scraper.git
cd Lyrics-Scraper
npm install
```

## ▶️ Usage

```bash
npm start
```

Server will run at:

```text
http://localhost:3000
```

## 📡 API Endpoint

```text
GET /lyrics?title=SONG_NAME
```

Example:

```text
http://localhost:3000/lyrics?title=Blinding%20Lights
```

### ✅ Successful Response

```json
{
  "creator": "Issa",
  "status": true,
  "result": {
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "lyrics": "I said, ooh, I'm blinded by the lights...",
    "thumb": "https://...",
    "link": "https://genius.com/..."
  }
}
```

### 🟥 Error Responses

**Missing title**

```json
{
  "status": false,
  "error": "Missing song title (?title=)"
}
```

**Song not found**

```json
{
  "status": false,
  "error": "Song not found"
}
```

## ⚠️ Notes

- This project scrapes Genius pages and may break if Genius changes their site.
- Intended for educational purposes only.
- Do not use for heavy production traffic.

## ❤️ Credit

> This project was created by [Issa](https://github.com/MythicIssa).  
> Special thanks to the open-source community behind the tech used.

## 📄 License

Licensed under the **ISC License**  
See the [LICENSE](/LICENSE) file for more details
