const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
  }

  async generatePersonalizedContent(lead, template, tone = "professional") {
    if (!this.genAI) {
      throw new Error("AI Service not initialized. Missing API Key.");
    }

    const prompt = this.constructPrompt(lead, template, tone);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseAIResponse(text, lead, template);
    } catch (error) {
      console.error("AI Generation Error:", error);
      throw error;
    }
  }

  constructPrompt(lead, template, tone) {
    return `
      You are an expert B2B sales copywriter. Your goal is to write a hyper-personalized intro snippet and a cold email draft that feels completely human and non-automated.

      Lead Details:
      - Name: ${lead.first_name} ${lead.last_name}
      - Company: ${lead.company}
      - Role: ${lead.role}
      - Website: ${lead.website}
      - Company Description: ${lead.company_description || "Not provided"}

      Email Template:
      - Subject: ${template.subject}
      - Body: ${template.body_template}

      Desired Tone: ${tone}

      Instructions:
      1. Research the context based on the lead's role and company.
      2. Generate a unique "intro_snippet" (max 30 words) that mentions something specific about their business or role. Avoid generic praise.
      3. Generate a full "email_body" based on the template, replacing placeholders like {{first_name}}, {{company}}, and {{intro_snippet}}.
      4. Keep the email under 150 words.
      5. Avoid AI buzzwords like "delighted", "tapestry", "leverage", "robust".
      6. Use clean line breaks.

      Return the response in strictly valid JSON format:
      {
        "intro_snippet": "...",
        "email_body": "..."
      }
    `;
  }

  parseAIResponse(text, lead, template) {
    try {
      // Clean the response if it contains markdown code blocks
      const cleanText = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanText);
      return parsed;
    } catch (error) {
      console.error("Failed to parse AI response:", text);
      // Fallback: manually replace placeholders if JSON fails
      const fallbackBody = template.body_template
        .replace(/{{first_name}}/g, lead.first_name)
        .replace(/{{company}}/g, lead.company)
        .replace(/{{intro_snippet}}/g, "I've been following your work at " + lead.company);
      
      return {
        intro_snippet: "I've been following your work at " + lead.company,
        email_body: fallbackBody
      };
    }
  }

  // Helper to replace placeholders in a string
  replacePlaceholders(text, data) {
    return text.replace(/{{(\w+)}}/g, (match, key) => {
      return data[key] || match;
    });
  }
}

module.exports = new AIService();
