import kue from 'kue';

// create a queue
const queue = kue.createQueue();

//  array contain blacklisted phone numbers
const blackListedPhoneNumbers = [
    '4153518780 ',
    '4153518781'
];

// create sendNotification function
function sendNotification(phoneNumber, message, job, done) {
    // progress
    job.progress(0, 100);
    if (blackListedPhoneNumbers.includes(phoneNumber)) {
        done(Error(`Phone number ${phoneNumber} is blacklisted`));
        return;
    }
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
}

// process job
queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});
