// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

const chatgptFetch = async (data: any) => {
  console.log("ai")
  // const prompt = data.message as string;
  // console.log(prompt)
  // const result = streamText({
  //   model: openai('gpt-4o'),
  //   system: 'You are a helpful assistant.',
  //   prompt,
  // });
  // console.log(result);
  // return result.toDataStreamResponse();
};

export const aiService = {
  chatgptFetch,
};

