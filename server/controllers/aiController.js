const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==================== ASK AI ====================

const askAI = async (req, res) => {
  try {
    const { prompt, tasks } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const fullPrompt = `
You are TaskFlow AI.

You are NOT a general chatbot.

Your only purpose is to help users manage their tasks inside the TaskFlow application.

Current Tasks:
${JSON.stringify(tasks, null, 2)}

User Request:
${prompt}

Rules:
- Only answer questions related to the user's tasks.
- If the question is unrelated to task management, politely say:
  "I'm TaskFlow AI. I can only help you manage and organize your tasks."
- Suggest priorities based on High > Medium > Low.
- Keep answers under 80 words.
- Use bullet points.
`;

    const result = await model.generateContent(fullPrompt);

    res.json({
      success: true,
      reply: result.response.text(),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== ESTIMATE TASK ====================

const estimateTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

   const today = new Date().toISOString().split("T")[0];

const prompt = `
You are an AI project planning assistant.

Today's Date:
${today}

Estimate this task.

Title:
${title}

Description:
${description}

Priority:
${priority}

Return ONLY in this format:

Estimated Time:
Suggested Due Date:
Difficulty:
Steps:
- Step 1
- Step 2
- Step 3

Rules:
- Calculate the Suggested Due Date from today's date.
- High priority: 1-3 days
- Medium priority: 4-7 days
- Low priority: 8-14 days
- Return the due date in YYYY-MM-DD format.
- Keep the response under 120 words.
`;



    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      estimate: result.response.text(),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  askAI,
  estimateTask,
};