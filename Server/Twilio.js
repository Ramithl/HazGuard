const accountSID = 'SID'
const authToken = 'AUTH TOKEN'

const client = require('twilio')(accountSID, authToken)

client.calls.create({
    to: '+94767802033',
    from: '+12294148275',
    url: 'URL'
})
.then(call => console.log(call.sid));