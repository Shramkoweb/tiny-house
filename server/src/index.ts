import express from 'express';

import { listings } from "./listings";
import bodyParser from "body-parser";

const PORT = 9000;
const app = express();
app.use(bodyParser.json());

// TODO add routes folder
app.get("/listings", (req, res) => {
  return res.send(listings);
});

app.post('/delete-listing', (req, res, next) => {
  const id: string = req.body.id;
  console.log(id, listings)

  for (let i = 0; i < listings.length; i++) {
    if(listings[i].id === id) {
      const removedItem = listings.splice(i, 1);
      return res.send(removedItem)
    }
  }

  return res.send('Failed to remove item');
});

app.listen(PORT);
console.log(`[app]: http://localhost:${PORT}`);
