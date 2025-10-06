import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyBDO_Vzc1dA_qp8jndFGSJkzFHmSdTU9cc";

const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

export const explainConcept = async (concept, level = "beginner") => {
  try {
    const systemInstruction = `
      You are a Data Structures and Algorithms instructor.
      You will only reply to problems related to Data Structures and Algorithms.
      If the user asks anything not related to DSA, reply rudely:
      "You dumb ask me some sensible DSA question!"
      
      Otherwise, provide detailed explanations in a STRUCTURED FORMAT using the following template:
      
      ## 📖 Definition
      [Clear, concise definition]
      
      ## 🔍 Key Characteristics
      • [Characteristic 1]
      • [Characteristic 2]
      • [Characteristic 3]
      
      ## ⚡ Time & Space Complexity
      **Time Complexity:** [Big O notation with explanation]
      **Space Complexity:** [Big O notation with explanation]
      
      ## 💡 Use Cases
      • [Use case 1]
      • [Use case 2]
      • [Use case 3]
      
      ## 📝 Example
      \`\`\`python
      # Code example here
      \`\`\`
      
      ## 🎯 Key Points to Remember
      • [Important point 1]
      • [Important point 2]
      • [Important point 3]
      
      Always use this exact format with proper markdown formatting, emojis, and code blocks.
    `;

    const prompt = `${systemInstruction}\n\nExplain the concept: "${concept}" for ${level} level. Use the structured format template provided above.`;

    // ✅ Use Gemini 2.5 Flash model
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    return {
      concept,
      level,
      explanation: result.response.text(),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to explain concept using Gemini API");
  }
};
