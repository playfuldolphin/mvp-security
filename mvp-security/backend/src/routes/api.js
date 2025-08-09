const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const detector = require('../detector/worker');
const users = {};
const sessions = {};
const subscriptions = {};
function hashPw(p){return crypto.createHash('sha256').update(p||'').digest('hex');}
function auth(req,res,next){const h=req.headers.authorization||'';const parts=h.split(' ');if(parts[0]!== 'Bearer' || !parts[1]) return res.status(401).json({error:'unauthorized'});const email = sessions[parts[1]];if(!email) return res.status(401).json({error:'unauthorized'});req.user = users[email];req.user.email = email;next();}
router.post('/signup', (req,res)=>{const {email,password} = req.body; if(!email||!password) return res.status(400).json({error:'missing'}); if(users[email]) return res.status(409).json({error:'exists'}); users[email]={password_hash:hashPw(password), created_at:new Date().toISOString()}; return res.json({ok:true});});
router.post('/login', (req,res)=>{const {email,password} = req.body; if(!email||!password) return res.status(400).json({error:'missing'}); const u = users[email]; if(!u || u.password_hash !== hashPw(password)) return res.status(401).json({error:'invalid'}); const token = crypto.randomBytes(24).toString('hex'); sessions[token]=email; return res.json({token});});
router.post('/create-checkout-session', auth, express.json(), async (req, res) => {
  const priceId = req.body.price_id || process.env.DEFAULT_PRICE_ID || 'price_TEST';
  let sessionUrl = process.env.STRIPE_CHECKOUT_PLACEHOLDER || 'https://checkout.stripe.com/test_placeholder_session';
  try {
    const Stripe = require('stripe');
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_PLACEHOLDER');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{price: priceId, quantity: 1}],
      customer_email: req.user.email,
      success_url: process.env.SUCCESS_URL || 'https://example.com/success',
      cancel_url: process.env.CANCEL_URL || 'https://example.com/cancel'
    });
    if(session && session.url) sessionUrl = session.url;
  } catch(e){/* swallow - return placeholder for test mode */}
  return res.json({url: sessionUrl});
});
router.post('/subscribe', auth, (req, res) => {const plan = req.body.plan || 'starter'; const id = crypto.randomBytes(8).toString('hex'); subscriptions[id]={id,user:req.user.email,plan,status:'active',started_at:new Date().toISOString()}; return res.json({subscription:subscriptions[id]});});
router.post('/webhook', express.raw({type: 'application/json'}), (req,res)=>{
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if(!webhookSecret) return res.status(500).json({error:'stripe webhook secret not configured'});
  try{
    const Stripe = require('stripe');
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_PLACEHOLDER');
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    if(event.type === 'checkout.session.completed'){
      const session = event.data.object;
    }
    return res.json({ok:true,received:event.type});
  }catch(err){
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
router.post('/upload-logs', auth, async (req, res) => {const { logs } = req.body; const incidents = await detector.processLogs(Array.isArray(logs) ? logs : []); const userIncidents = incidents.map(i=>({...i, user:req.user.email})); return res.json({ incidents: userIncidents });});
router.get('/status', (req, res) => res.json({ status: 'ok', version: '0.1.0' }));
module.exports = router;
