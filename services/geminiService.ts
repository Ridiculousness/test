
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async generateAdStrategy(productInfo: string): Promise<any> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Act as a senior media buyer at AdBuy.ai. Create a comprehensive advertising strategy for: ${productInfo}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              targetAudience: { type: Type.STRING },
              channels: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestedBudget: { type: Type.STRING },
              creativeHook: { type: Type.STRING },
              primaryPainPoint: { type: Type.STRING },
              roasProjection: { type: Type.STRING }
            },
            required: ["headline", "targetAudience", "channels", "suggestedBudget", "creativeHook", "primaryPainPoint", "roasProjection"]
          }
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Strategy Generation Error:", error);
      throw error;
    }
  }

  async generateAdCreative(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `A high-quality, professional digital advertisement image for: ${prompt}. Cinematic lighting, minimalist aesthetic, suitable for Instagram or Facebook ads.` }
          ]
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image data returned");
    } catch (error) {
      console.error("Gemini Image Generation Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
