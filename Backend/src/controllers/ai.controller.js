
import { generateAIContent } from "../service/ai.service.js";
export const generateContentController = async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const result = await generateAIContent(prompt, mode);

    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "AI generation failed",
    });
  }
};
