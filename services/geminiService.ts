import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAppBlueprint = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    // Fallback simulation if no key is present
    await new Promise(resolve => setTimeout(resolve, 1500));
    return JSON.stringify({
      appName: "TEOS Generated App",
      stack: ["Next.js 15", "FastAPI", "PostgreSQL"],
      features: ["Auth (JWT)", "RBAC", "Audit Logging"],
      compliance: "TESL v2.0 Compliant",
      message: "I've generated a blueprint based on your request. The system includes a secure backend API and a responsive React frontend."
    }, null, 2);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are TEOS Gen, an AI architect for the TEOS App Studio. 
      The user wants to build an app. 
      Analyze this request: "${prompt}".
      Return a JSON summary of the recommended tech stack, features, and compliance notes.
      Do not use Markdown formatting, just return the raw JSON string.`,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating blueprint. Please check your network or API quota.";
  }
};

export const chatWithTeos = async (message: string, history: {role: string, content: string}[]): Promise<string> => {
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "I am simulating the TEOS Gen AI. Connect a valid API Key to get real architectural advice.";
  }

  try {
    // We utilize generateContent for single turn, but treating it like chat for simplicity in this demo
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `System: You are TEOS Gen, a helpful AI assistant for building compliant apps using the TEOS stack (Next.js, FastAPI, React Native).
      User: ${message}`,
    });
    return response.text;
  } catch (error) {
    return "I'm having trouble connecting to the TEOS Core. Please try again.";
  }
};