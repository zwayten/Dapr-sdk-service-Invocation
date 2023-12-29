const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Use a different port for the second microservice

app.use(bodyParser.json());

// Define an endpoint for handling incoming requests
app.post('/invokee', (req, res) => {
  try {
    console.log("getting in app two");
    // Process the request in the second microservice
    const result = { message: 'Hello from the  ####### app TWO! #######' };
    res.json(result);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express server for the second microservice
app.listen(port, () => {
  console.log(`Second microservice is running on port ${port}`);
});