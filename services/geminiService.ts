import { GoogleGenAI } from "@google/genai";
import { LabResult, Patient } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIHealthSummary = async (patient: Patient, results: LabResult[]) => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    Atue como um assistente médico inteligente (SaaS SaúdeDigital+).
    Analise os seguintes dados do paciente e resultados de exames.
    
    Paciente: ${patient.name}, ${patient.gender}, ${new Date().getFullYear() - new Date(patient.dob).getFullYear()} anos.
    Condições: ${patient.chronicConditions.join(', ')}.
    
    Resultados recentes:
    ${results.map(r => `- ${r.testName}: ${r.value} ${r.unit} (Ref: ${r.referenceRange})`).join('\n')}
    
    Forneça:
    1. Um resumo curto e amigável da saúde geral (máximo 2 frases).
    2. Identifique quaisquer valores fora do normal e explique o que significam em linguagem simples.
    3. Sugira 3 hábitos de estilo de vida para melhorar esses marcadores específicos.
    
    Responda em JSON com a estrutura:
    {
      "summary": "string",
      "analysis": ["string"],
      "recommendations": ["string"]
    }
    Não use markdown no JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const getSymtomChecker = async (symptoms: string) => {
  const model = "gemini-2.5-flash";
  const prompt = `
    O usuário relatou os seguintes sintomas: "${symptoms}".
    Forneça uma análise preliminar, possíveis causas comuns e indique a especialidade médica recomendada para agendamento.
    IMPORTANTE: Sempre inclua um aviso de que isso não é um diagnóstico médico real.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error(error);
    return "Erro ao consultar assistente virtual.";
  }
};