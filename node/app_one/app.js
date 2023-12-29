const express = require('express');
const bodyParser = require('body-parser');
const { DaprClient, HttpMethod } = require('@dapr/dapr');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const daprHost = "127.0.0.1";
const daprPort = "3501";

// Define an endpoint for handling incoming requests
app.post('/invoke-service', async (req, res) => {
  try {
    const daprClient = new DaprClient({ daprHost, daprPort });
    console.log("getting in app one", req.body);
    // Invoke another service using Dapr
    const response = await daprClient.invoker.invoke('app_two', 'invokee', HttpMethod.POST, req.body);

    res.json(response);
  } catch (error) {
    console.error('Error invoking service:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});