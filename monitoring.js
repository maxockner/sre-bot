const axios = require('axios');
const cron = require('node-cron');

// Replace with your own PagerDuty API Key
const pagerDutyServiceKey = 'Your PagerDuty Service Key';
const incidentKey = '/square_number is broken!';

const triggerPagerDuty = async (err) => {
  try {
    const data = {
      service_key: pagerDutyServiceKey,
      event_type: 'trigger',
      description: `/square_number is broken. Error: ${err}`,
      incident_key: incidentKey
    };
    
    await axios.post('https://events.pagerduty.com/generic/2010-04-15/create_event.json', data);
  } catch (err) {
    console.error('Failed to trigger PagerDuty', err);
  }
};

const checkSquareNumber = async () => {
  try {
    const res = await axios.get('http://localhost:3000/square_number/3');

    if (res.data !== 9) {
      console.log('Square number API returned unexpected value:', res.data);
      await triggerPagerDuty(`Expected result to be 9 but got ${res.data}`);
    }
  } catch (err) {
    console.error('Failed to fetch from square number API', err);
    await triggerPagerDuty();
  }
};

// Run the task every 5 seconds
cron.schedule('*/5 * * * * *', checkSquareNumber);
