const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors")
const stripe = require("stripe")('sk_test_51N8PH9SAv5vULD4tdj6dgBY3xTDXZ8APA2e0EI7L6SpoCRTv12SXizBSgurybLwenPPXN0cc6R67LhrCGVmRntWj00boozU9DD')
//API

//App Config
const app = express()
//Middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['get', 'post']
}))
//API routes
app.get('/', (req, res) => {
    res.status(200).send("Hello World")
})
app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log("Payment request Received Boom " + total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    })
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})
//Listen Command
exports.api = functions.https.onRequest(app)
