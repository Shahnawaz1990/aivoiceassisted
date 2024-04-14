import express from 'express';
import OpenAI from "openai";

const openai = new OpenAI();

const app = express();
app.use(express.static('templates'));





const messages = []



async function main(input) {
  messages.push({ role: 'user', content: input })
  console.log(messages)
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-3.5-turbo',
  });

  // console.log(completion.choices);
  return completion.choices[0]?.message?.content 
}


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/api', async function (req, res, next) {
  console.log(req.body)
  const mes = await main(req.body.input)
  res.json({success: true, message: mes})
})

app.listen(3000, () => {
  console.log('Running');
});