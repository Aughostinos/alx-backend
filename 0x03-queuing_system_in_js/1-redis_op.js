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

//set new school functions
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

//displaySchoolValue
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(err);
    }else {
      console.log(reply);
    }
  });
}
