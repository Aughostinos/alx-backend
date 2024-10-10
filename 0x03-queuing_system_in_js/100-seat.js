import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';
import kue from 'kue';

// Create an Express server
const app = express();
const port = 1245;

// Create a Redis client
const client = createClient();
const getAsync = promisify(client.get).bind(client);

// Create a Kue queue
const queue = kue.createQueue();

let reservationEnabled = true;

// Function to reserve seats
function reserveSeat(number) {
  client.set('available_seats', number);
}

// function to get the current available seats
async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return seats ? parseInt(seats, 10) : 0;
}

// Set initial available seats to 50 when launching the application
reserveSeat(50);

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      res.json({ status: 'Reservation failed' });
    } else {
      res.json({ status: 'Reservation in process' });
    }
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

// Route to process the reservation queue
app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const currentSeats = await getCurrentAvailableSeats();

    if (currentSeats <= 0) {
      done(new Error('Not enough seats available'));
      return;
    }

    reserveSeat(currentSeats - 1);

    if (currentSeats - 1 === 0) {
      reservationEnabled = false;
    }

    done();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
