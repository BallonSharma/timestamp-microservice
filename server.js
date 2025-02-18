// coded by Rajat sharma




const express = require('express');
const path = require('path');
const app = express();

// i m serving here static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// and here i Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// jumping in logical stuff nowwwww.

app.get('/api/:date?', (req, res) => {
  let date;
  if (!req.params.date) {
    date = new Date();
  } else if (!isNaN(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

