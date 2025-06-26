// Edge Function: Generates a random absurd motivational quote

import { serve } from "https://deno.land/std/http/server.ts";

const quotes = {
  en: [
    "Believe in yourself, even if your code doesn't.",
    "Success is just a bug away from disaster.",
    "Think outside the box... then panic inside it.",
    "You miss 100% of the naps you don’t take.",
    "Failure is just success trying to cosplay a bug.",
    "Walk confidently in the wrong direction.",
    "Your dreams are valid — even if they involve llamas and Javascript.",
    "Keep going. Coffee hasn’t betrayed you yet.",
    "Do it for the meme.",
    "Push yourself — just like you push to Git."
  ],
  es: [
    "Cree en ti, aunque tu código no lo haga.",
    "El éxito está a un bug de distancia del desastre.",
    "Piensa fuera de la caja... luego entra en pánico dentro de ella.",
    "Fallás el 100% de las siestas que no tomás.",
    "El fracaso es solo el éxito disfrazado de bug.",
    "Avanza con seguridad... en la dirección equivocada.",
    "Tus sueños valen, incluso si incluyen llamas y Javascript.",
    "Seguí adelante. El café aún no te traicionó.",
    "Hacelo por el meme.",
    "Impulsate... así como hacés push a Git."
  ]
};

serve(async (request) => {
  const allowedOrigin = "http://localhost:5173";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const body = await request.json();
    const language = body?.language || "en";
    const messages = quotes[language] || quotes.en;
    const randomIndex = Math.floor(Math.random() * messages.length);
    const quote = messages[randomIndex];
    console.log("Motivational quote:", quote);

    return new Response(JSON.stringify({ quote }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
