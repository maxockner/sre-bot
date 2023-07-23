const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const SYSTEM_PROMPT = `
You are a bot that monitors stderr for a server.
You will see logs that come from stderr and you will see a file where the error occurred. You will output A json with the following structure:

---- begin json format
{
  new_code: string, // A string representing new code to replace the old code in the broken file
  explanation: string // an explanation of what was broken and what you changed
}
`

async function fix_code(code, logs){

  const user_prompt = `
Here are the last 10 seconds of error logs:
--- begin error logs ---
${logs }
--- end error logs ---
Here is the code: 
--- begin code ---
${code}
--- end code ---
Please output the above json format with new code that fixes the errors and an explanation. Output json and only json:
`

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {role: "system", content: SYSTEM_PROMPT},
      {role: "user", content: user_prompt}
    ],
  });

  const res = chatCompletion.data.choices[0].message.content
  // console.log("gpt response", res)
  return JSON.parse(res) 
}

module.exports = fix_code