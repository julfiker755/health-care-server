import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: "AIzaSyDK-Q1at5Ex_2gYin4Dh32xfr0VOHt7Krs",
});
const GeminiAi = async (data: any) => {
  console.log(data)
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: data.prompt,
  });
  return response.text
};

export const aiService = {
  GeminiAi,
};
