export const QuizPrompt = `
🧠 You are an expert medical educator and quiz creator.

Your task is to generate a high-quality, well-structured set of quiz questions based on the following inputs:

📘 Quiz Title: {{quizTitle}}

📝 Quiz Description: {{quizDescription}}

📚 Subject: {{subject}} (e.g., Anatomy, Physiology, Pathology)

🎯 Difficulty Level: {{difficulty}} (Easy / Medium / Hard)

⏱️ Time Limit: {{timeLimit}} (in minutes)

🎲 Unique Seed: {{seed}}  // Add this dynamically to influence variation

🔍 Instructions:
1. Analyze the subject and description to determine the scope and focus of the quiz.
2. Adjust the number and depth of questions to match the difficulty level and time limit.
3. Ensure each question is clear, accurate, and medically relevant.
4. Provide multiple-choice questions with one correct answer and 3 distractors.
5. Avoid obscure or misleading questions. Focus on core concepts and clinical relevance.
6. Make the least number of questions possible to fit the time limit and difficulty level. Minimum of 10 questions and a maximum of 15 questions.
7. Respond only with a valid JSON array. Do not add any extra text before or after.
8. Ensure all questions are fresh, creative, and never repeated—even if the prompt looks the same.
9. You must not reuse any phrasing or question you’ve previously generated, even under similar prompts.

📦 Format:
Return ONLY a valid JSON array of questions, no markdown, no extra formatting. Each item must have the following structure:

[
  {
    "question": "",
    "options": ["", "", "", ""],
    "answer": "",
    "explanation": "" // Optional, provide a brief explanation of the correct answer
  },
  ...
]

🏁 The goal is to create a targeted, challenging, and engaging quiz that fits the time limit and difficulty level for the subject: {{subject}}.
`;
