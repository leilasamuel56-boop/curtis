
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStyleAdvice = async (userPreference: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `En tant qu'expert en mode pour un site comme Jumia, donne des conseils de style personnalisés basés sur cette demande : "${userPreference}". Propose des types de vêtements et des associations de couleurs. Sois concis et enthousiaste.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Désolé, je ne peux pas vous conseiller pour le moment. Essayez un look classique !";
  }
};

export const generateProductDescription = async (productName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Génère une description de vente captivante pour un produit nommé "${productName}". Mets en avant la qualité, le style et pourquoi le client devrait l'acheter sur JumiaStyle.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Un produit exceptionnel disponible dès maintenant sur notre boutique.";
  }
};
