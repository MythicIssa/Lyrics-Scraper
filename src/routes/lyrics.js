const express = require('express')
const axios = require('axios')
const { JSDOM } = require('jsdom')

const router = express.Router()

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9'
}

router.get('/', async (req, res) => {
  const query = req.query.title

  if (!query) {
    return res.status(400).json({
      status: false,
      error: 'Missing song title (?title=)'
    })
  }

  try {
    const searchUrl = `https://genius.com/api/search/multi?per_page=5&q=${encodeURIComponent(query)}`
    const search = await axios.get(searchUrl, { headers }).then(r => r.data)

    const section = search.response.sections.find(s => s.type === 'song')
    if (!section || !section.hits.length) {
      return res.status(404).json({
        status: false,
        error: 'Song not found'
      })
    }

    const song = section.hits[0].result
    const songUrl = song.url

    const html = await axios.get(songUrl, { headers }).then(r => r.data)
    const dom = new JSDOM(html)
    const doc = dom.window.document

    const lyricsEls = doc.querySelectorAll('[data-lyrics-container]')
    if (!lyricsEls.length) {
      return res.status(404).json({
        status: false,
        error: 'Lyrics not found'
      })
    }

    let lyrics = Array.from(lyricsEls)
      .map(el => el.textContent)
      .join('\n')

    lyrics = lyrics
      .replace(/^\d+\s+Contributors[\s\S]*?Lyrics/i, '')
      .replace(/^Translations[\s\S]*?Lyrics/i, '')
      .replace(/“.*?”[\s\S]*?Read More/i, '')
      .replace(/\[([^\]]+)\]/g, '\n\n[$1]\n')
      .replace(/([a-z0-9])([A-Z])/g, '$1\n$2')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    const title =
      doc.querySelector('h1')?.textContent?.trim() || song.title

    const artist = song.primary_artist?.name || 'Unknown Artist'

    const image =
      doc.querySelector('meta[property="og:image"]')?.content ||
      song.song_art_image_url ||
      ''

    res.json({
      creator: 'Issa',
      status: true,
      result: {
        title,
        artist,
        lyrics,
        thumb: image,
        link: songUrl
      }
    })
  } catch {
    res.status(500).json({
      status: false,
      error: 'Internal scraper error'
    })
  }
})

module.exports = router
