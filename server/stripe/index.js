const router = require('express').Router()
module.exports = router
const keyPublishable = process.env.PUBLISHABLE_KEY || 'pk_test_ifL68KcdvyP86xfWifl8kvDn';
const keySecret = process.env.SECRET_KEY || 'sk_test_z9T2TEGSVCerfuyqG9MRPfL2';

const stripe = require('stripe')(keySecret);

const postStripeCharge = res => (stripeErr, stripeRes) => {
    console.log("stripeErr!", stripeErr, "stripeRes", stripeRes)
    if (stripeErr) res.status(500).send({error: stripeErr})
    else res.status(200).send({success: stripeRes})
}

router.post('/payment', (req, res) => {
    console.log('REQ.BODY', req.body)
    console.log('REQ.PARAMS.ID', req.params.id)

    const request = { 
        amount: req.body.amount,
        description: req.body.description,
        currency: req.body.currency,
        source: req.body.source,
        receipt_email: req.body.receipt_email,
    }
    stripe.charges.create(request, postStripeCharge(res))
    // stripe.charges.create(request)
    // .then(charge => {
    //     return res.send(charge)
    // })
    // .catch(err => {
    //   console.log('Error:', err);
    //   res.status(500).send({error: 'Purchase Failed'});
    // });
})  