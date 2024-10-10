import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

// Create a queue
const queue = kue.createQueue();

// Test createPushNotificationsJobs function
describe('createPushNotificationsJobs', () => {
  before(() => {
    kue.Job.rangeByState('complete', 0, 1000, 'asc', () => {});
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
  });

  after(() => {
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs(123, queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      {
        phoneNumber: '1234567890',
        message: 'This is a test notification 1',
      },
      {
        phoneNumber: '0987654321',
        message: 'This is a test notification 2',
      },
    ];

    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
  });
});
