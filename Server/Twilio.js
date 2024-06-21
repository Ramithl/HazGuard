const accountSID = 'ACd82a615b37fa580d5d5a54f9d76b999b'
const authToken = '6dbc3a18699c9abfa313e30bd105a8c3'

const client = require('twilio')(accountSID, authToken)

client.calls.create({
    to: '+94767802033',
    from: '+12294148275',
    url: 'https://handler.twilio.com/twiml/EH887f8352bcf78013f9534125e067bd43'
})
.then(call => console.log(call.sid));