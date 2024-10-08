import { createClient } from 'redis'

//create client
const subscriber = createClient()

//connecting to redis
subscriber.on('connect', () => {
  console.log('Redis client connected to the server')
});

//error handling
subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`)
});

//subscribe to a channel
subscriber.subscribe('holberton school channel');

//message handling
subscriber.on('message', (channel, message) => {
  console.log(message);
    if (message === 'KILL_SERVER') {
      subscriber.unsubscribe('holberton school channel');
      subscriber.quit();
    }
});
