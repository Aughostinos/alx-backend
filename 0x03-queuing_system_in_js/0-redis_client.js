import { createClient } from 'redis'

//create client
const client = createClient();

//handle connection
client.on('connect', () => {
  console.log('Redis client connected to the server')
});

//handle connection error
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`)
});
