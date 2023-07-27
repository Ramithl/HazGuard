const accountSID = process.env.TWILIO_SID
const authToken = process.env.AUTH_TOKEN

const client = require('twilio')(accountSID, authToken)

client.calls.create({
    to: '+94767802033',
    from: '+12294148275',
    url: 'https://handler.twilio.com/twiml/EH887f8352bcf78013f9534125e067bd43'
})
.then(call => console.log(call.sid));