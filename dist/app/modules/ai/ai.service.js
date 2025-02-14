"use strict";
// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = void 0;
const chatgptFetch = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ai");
    // const prompt = data.message as string;
    // console.log(prompt)
    // const result = streamText({
    //   model: openai('gpt-4o'),
    //   system: 'You are a helpful assistant.',
    //   prompt,
    // });
    // console.log(result);
    // return result.toDataStreamResponse();
});
exports.aiService = {
    chatgptFetch,
};
