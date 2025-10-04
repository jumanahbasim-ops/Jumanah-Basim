
import { GoogleGenAI } from "@google/genai";
import type { Neo } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getAsteroidSummary(neo: Neo): Promise<string> {
  const avgDiameterKm = (neo.estimated_diameter.kilometers.estimated_diameter_min + neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;

  const prompt = `
    You are an expert planetary scientist communicating with the public for NASA.
    Your tone is engaging, informative, and reassuring.
    
    Given the following data for the Near-Earth Object "${neo.name}":
    - Average Estimated Diameter: ${avgDiameterKm.toFixed(2)} km
    - Is Potentially Hazardous: ${neo.is_potentially_hazardous_asteroid}
    - It has ${neo.close_approach_data.filter(d => d.orbiting_body === 'Earth').length} recorded close approaches to Earth.
    
    Please provide a brief, educational, and easy-to-understand summary. 
    1. Start with its name.
    2. Describe its size using a relatable comparison (e.g., 'as large as...', 'about the size of...').
    3. If it's "Potentially Hazardous", briefly and calmly explain that this is a classification for asteroids that come within a certain distance of Earth's orbit and are of a certain size, and that it does not mean an impact is imminent. Emphasize that its trajectory is well-tracked.
    4. If it is not "Potentially Hazardous", state that it poses no threat.
    5. Conclude with an interesting fact or note about its discovery or characteristics if you can infer one.
    
    Keep the entire summary under 120 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Could not fetch summary from Gemini API.");
  }
}
