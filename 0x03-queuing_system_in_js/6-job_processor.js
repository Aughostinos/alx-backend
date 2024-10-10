import kue from 'kue'

// create a queue
const queue = kue.createQueue();

// create sendNotification function
function sendNotification(phoneNumber , message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// process job
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
