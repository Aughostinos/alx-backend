import { createClient, print } from 'redis';
import { promisify } from 'util';

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

const getAsync= promisify(client.get).bind(client);

//set new school functions
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

//displaySchoolValue
async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply);
  } catch (err) {
    console.error(err);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');