const fs = require('fs');

async function featureTracker(feature) {
    let featureTrackerLog = require('./featureTrackerLog.json');
    featureTrackerLog[feature]++;
    fs.writeFile('./featureTrackerLog.json', JSON.stringify(featureTrackerLog), (err) => {if (err) throw err;})
}

module.exports = featureTracker;