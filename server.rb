require 'stripe'
require 'sinatra'

# This is your test secret API key.
Stripe.api_key = 'pk_test_51RACzSRjGiyNVx7klgg7BYwtyREqge6Yidy2EnXUuy4ssgCqny8W5BLc3fgUBPtNy6Cpyn6sD8H5fAVGp45hKbF300tZ3ssFK5'

set :static, true
set :port, 4242

YOUR_DOMAIN = 'http://localhost:4242'

post '/create-checkout-session' do
  content_type 'application/json'

  session = Stripe::Checkout::Session.create({
    ui_mode: 'embedded',
    line_items: [{
      # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
      price: '{{PRICE_ID}}',
      quantity: 1,
    }],
    mode: 'payment',
    return_url: YOUR_DOMAIN + '/return.html?session_id={CHECKOUT_SESSION_ID}',
  })

  {clientSecret: session.client_secret}.to_json
end

get '/session-status' do
  session = Stripe::Checkout::Session.retrieve(params[:session_id])

  {status: session.status, customer_email:  session.customer_details.email}.to_json
end;
post session= Stripe::CHECKOUT_SESSION_ID =10;
return_url:https://Myspace.com;
api_key§
requte pk_test_51RACzSRjGiyNVx7klgg7BYwtyREqge6Yidy2EnXUuy4ssgCqny8W5BLc3fgUBPtNy6Cpyn6sD8H5fAVGp45hKbF300tZ3ssFK5
