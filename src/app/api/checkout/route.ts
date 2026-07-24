import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {

  const body = await req.json();

  const amount = Number(body.price);

  if (!amount || isNaN(amount)) {
    return NextResponse.json(
      {
        error:"Invalid price"
      },
      {
        status:400
      }
    );
  }


  const session = await stripe.checkout.sessions.create({

    mode:"payment",

    line_items:[
      {
        price_data:{
          currency:"gbp",

          product_data:{
            name:body.name,
          },

          unit_amount: amount * 100,
        },

        quantity:1,
      }
    ],

    success_url:
    `${process.env.NEXT_PUBLIC_URL}/payment-success`,

    cancel_url:
    `${process.env.NEXT_PUBLIC_URL}/payment-cancel`,
  });


  return NextResponse.json({
    url:session.url
  });
}