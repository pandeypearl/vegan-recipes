const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path');
const app = express()
const router = express.Router();
const cors = require('cors')
app.use(cors())

// app.get('/', (_req, res) => {
//     res.sendFile("index.html")
// })

router.get('/', function(_req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

url = 'https://www.feastingathome.com/vegan-dinner-recipes/'

app.get('https://vegan-recipes-6gdm.onrender.com/results', (_req, res) => {
        axios(url)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const recipes = []
    
                $('h2 a', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    recipes.push({
                        title,
                        url
                    })
                })
                res.json(recipes)
            }).catch((err) => console.log(err))
})

app.use('/', router);
app.listen(PORT, () => console.log('server running on PORT ${PORT}'))