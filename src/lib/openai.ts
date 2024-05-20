import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_API_ORGANIZATION,
  project: process.env.OPENAI_API_PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
