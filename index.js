const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const cors = require('cors')
app.use(cors())


url = 'https://www.feastingathome.com/vegan-dinner-recipes/'

app.get('/results', (req, res) => {
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


app.listen(PORT, () => console.log('server running on PORT ${PORT}'))