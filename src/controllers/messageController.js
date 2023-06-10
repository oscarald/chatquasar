import twilio from 'twilio';
import { auth } from '../../firebase.js';



const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async (req, res) => {
    try {
        const message = await client.messages.create({
            body: 'Hola desde Twilio',
            to: '+59174089941',  // Text this number
            from: '+13613109907' // From a valid Twilio number
        })
        console.log(message.sid)
        /* const message = await client.verify.v2.services('VAb8d9672700592d7f402eba6644baad72')
        .verifications
        .create({to: '+59174089941', channel: 'sms'}) */
        
        return res.status(201).json(message)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const messageFirebase = async (req, res) => {
    try {
        /* const auth = getAuth();
        const phoneNumber = '+59174089941';
        signInWithPhoneNumber(auth, phoneNumber)
        .then((confirmationResult) => {})
        .catch((error) => {}) */
        
        /* auth.verifyPhoneNumber('+59174089941')
        .then((confirmationResult) => {
            console.log(confirmationResult)
        }).catch((error) => {
            console.log(error)
        }) */
        //console.log({ auth })
        
        return res.status(201).json({ message: 'Mensaje enviado' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export { sendMessage, messageFirebase } 