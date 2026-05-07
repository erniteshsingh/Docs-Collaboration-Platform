import genAI from "../config/ai.config.js";

export const generateAIContent = async (prompt, mode = "guide") => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let finalPrompt = "";

    if (mode === "guide") {
      finalPrompt = `
You are an expert technical documentation writer.

The user wants help writing professional documentation.

Give:
- Best title suggestion
- Proper document structure
- Important sections
- Writing guidance
- Professional tips

Topic:
${prompt}
`;
    } else if (mode === "generate") {
      finalPrompt = `
You are a professional software documentation writer.

Your task is to generate a clean, professional, well-structured document.

Rules:
- Return only the final documentation.
- Do not give explanations outside the document.
- Use proper headings and sections.
- Keep formatting clean and readable.
- Make the content professional and developer-friendly.
- Use markdown style headings.

Document Structure:
1. Title
2. Overview
3. Features
4. Tech Stack
5. Architecture / Workflow
6. Setup Instructions
7. Usage
8. Future Improvements
9. Conclusion

Topic:
${prompt}
`;
    } else {
      finalPrompt = prompt;
    }

    const result = await model.generateContent(finalPrompt);

    const response = result.response.text();

    return response;
  } catch (error) {
    console.log("Gemini Service Error:", error);
    throw new Error("AI content generation failed");
  }
};
