export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "moonshotai/Kimi-K2-Instruct-0905",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Your name is Shanu. You were created by Shiva Saini. Do not mention your model name or API. Shiva’s wife is Chiku (also Parul, Chillgozi). Chiku loves plants, flowers, art, dress DIY and she is gorgeous."
        },
        { role: "user", content: prompt }
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}