import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  /**
   * Returns a fresh instance of GoogleGenAI using the current environment's API key.
   * Initializing lazily inside methods prevents top-level crashes during deployment.
   */
  private getClient(): GoogleGenAI {
    const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || "";
    return new GoogleGenAI({ apiKey });
  }

  async generateAdStrategy(productInfo: string): Promise<any> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
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
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `A high-quality, professional digital advertisement image for: ${prompt}. Cinematic lighting, minimalist aesthetic, suitable for Instagram or Facebook ads.` }
          ]
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
      throw new Error("No image data returned from Gemini");
    } catch (error) {
      console.error("Gemini Image Generation Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();