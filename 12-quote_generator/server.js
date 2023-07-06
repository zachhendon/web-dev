const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));
app.listen(PORT);

app.get("/api/quotes/random", (req, res, next) => {
  res.send({
    quote: getRandomElement(quotes),
  });
});

app.get("/api/quotes", (req, res, next) => {
  let resQuotes = quotes;
  const person = req.query.person;
  if (person) {
    resQuotes = quotes.filter(
      (quote) => quote.person.toLowerCase() === person.toLowerCase()
    );
  }
  res.send({ quotes: resQuotes });
});

app.post("/api/quotes", (req, res, next) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (!quote || !person) {
    res.status(404).send();
  }
  quotes.push({
    quote,
    person,
  });
  res.send(quotes);
});
