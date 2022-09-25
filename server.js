const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || '4001';

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
  })

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
});

app.get('/api/quotes', (req, res, next) => {
    const filterQuotes = quotes.filter(author => {
        return author.person === req.query.person;
    });
    if (req.query.person) {
        res.send({ quotes: filterQuotes })
    } else {
        res.send({ quotes: quotes })
    }
});

app.post('/api/quotes', (req, res, next) => {
    const queryQuote = req.query.quote;
    const queryPerson = req.query.person;
    if (queryQuote || queryPerson) {
        const newQuoteObject = {quote: queryQuote, person: queryPerson};
        quotes.push(newQuoteObject);
        res.send({quote:newQuoteObject});
    } else {
        res.status(400).send()
    }
});