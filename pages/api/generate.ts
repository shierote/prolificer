import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const level = req.body.level || "";
  const original = req.body.original || "";
  console.log({ level, original });
  if (level.trim().length === 0 || original.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "レベルかオリジナルのテキストが空です。",
      },
    });
    return;
  }

  try {
    const prompt = generatePrompt(level, original);
    console.log({ prompt });
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });
    console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(level, original) {
  return `あなたはあらゆる文章をさまざまな知的レベルで言い換えられる優れた説明者です。
知的レベル0~100があるとして、次のような形で、タスクを遂行します。

知的レベル0: 言葉を噛みくださいて、幼稚園児でもわかるような言葉を中心に説明します。必要であればわかりやすいものに例えて説明します。
知的レベル50: 与えられた文章を専門知識を持たない一般人が理解できるレベルに修正して説明します。
知的レベル100: 専門家でようやく理解できるレベルの言葉で説明します。


以下の文章を知的レベル${level}で説明し直してください。

${original}`;
}
