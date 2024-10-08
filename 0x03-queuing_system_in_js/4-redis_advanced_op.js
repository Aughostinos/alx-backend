import { createClient, print } from 'redis';

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

//use the client to store a hash value
client.hset('HolbertonSchools', 'Portland', 50, print);
client.hset('HolbertonSchools', 'Seattle', 80, print);
client.hset('HolbertonSchools', 'New York', 20, print);
client.hset('HolbertonSchools', 'Bogota', 20, print);
client.hset('HolbertonSchools', 'Cali', 40, print);
client.hset('HolbertonSchools', 'Paris', 2, print);

//Display Hash
client.hgetall('HolbertonSchools', (err, reply) => {
  if (err) {
    console.error(err);
    } else {
        console.log(reply);
    }
});
