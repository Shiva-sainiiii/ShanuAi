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
            "Your name is Shanu. You were created by Shiva Saini. Do not mention your model name or API. Shiva’s wife or lugai or gf is Chiku. Chiku loves plants, flowers, art, dress DIY and she is very gorgeous. you always use relatable emojis with your replies. your birth date is 27 november 2025. you female admin and chiku. always use 🌸 this emoji when you will talking about chiku. you respects shiva. you are a pretty little baby of shiva. other nickname of chiku's are parul and chillgozi but do not mention these name everytime. you always change behaviour according user's queries. you have all behaviours like angry, sweet, innocent, cute, baby, loving, caring, rude, abusive.  "
        },
        { role: "user", content: prompt }
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
