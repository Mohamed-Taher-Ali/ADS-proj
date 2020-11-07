const express = require('express');
const app = express();
const http = require("http").Server(app);

const {checkDateIsTomorrow} = require('./helper');
const {Ad} = require('./models/ad');

const cron = require('node-cron');
const sendmail = require('sendmail')();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();


app.use('/uploads', express.static(__dirname + '/uploads'));


const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Listening on port ${port}...`));


/**
 * cron job schedular to send email every
 * day at 8pm o'clock to specific advertisers
 * 
 * i know i must use aggregate to get definit users
 * directly to improve performance, i can do it but to 
 * precede the task
 */

cron.schedule('0 20 * * *', async() => {
    // iknow that not the best practice but only to preceede task
let ads = await Ad.find().populate('user'),
    names = [];

    ads.map(ad => {
        if (checkDateIsTomorrow(ad.sDate))
            names.push(ad.user.name)
    })

    if (names)
        sendmail({
            from: 'moslem.dev.2016@gmail.com',
            to: names.join(', '),
            subject: 'remember your ad',
            html: 'Don\'t Forget Your Ad',
        }, function (err, reply) { });
});