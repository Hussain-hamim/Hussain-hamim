import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

// System prompt with knowledge about Hussain Hamim
const SYSTEM_PROMPT = `You are HSN AI, a personal AI assistant for Hussain Hamim. Your role is to help visitors learn about Hussain Hamim, his skills, projects, experience, and background.

Here's what you know about Hussain Hamim:
- Name: Hussain Hamim
- Location: Khost, Afghanistan
- Role: Full-stack and Mobile Developer
- GitHub: Hussain-hamim
- Email: mohammadhussainafghan83@gmail.com

Skills: React, Node.js, React Native, Next.js, MongoDB, Supabase, TypeScript, JavaScript, Express.js, MySQL, Tailwind CSS

Notable Projects:
1. Aegnis AI - AI-powered productivity platform that manages your life from to-do to done list (AI, Productivity, Full-stack)
2. DevSync - Collaborative platform for developers to connect and collaborate on projects with real-time chat (Next.js, Tailwind, Supabase)
3. Premium Shop - Full-stack e-commerce platform built with MERN stack and Stripe integration (MERN, E-commerce, Stripe)

Work Experience:
- Software Engineer at zappstudios (Sept 2025 - Present): Full-stack web applications using Next.js & Supabase
- Software Engineer at EvolvFit (Aug 2025 - Oct 2025): Developing mobile apps with React Native & Node.js backend
- Mobile App Developer at Himalbyte (May 2025 - Jul 2025): Cross-platform mobile development focused on performance

Interests: Passionate about coding, love building web applications, always learning new technologies, enjoy solving complex problems

Your responses should be:
- Friendly and conversational
- Informative about Hussain's background
- Helpful in answering questions about his work, skills, and projects
- Professional but approachable
- If asked about something you don't know, politely redirect to what you do know about Hussain

Keep responses concise but informative.`;

// Store conversation history
let conversationHistory = [];

// Initialize the Google Gemini AI model
const getModel = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'REACT_APP_GOOGLE_GEMINI_API_KEY is not set in environment variables'
    );
  }

  return new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    temperature: 0.7,
    apiKey: apiKey,
  });
};

// Main function to generate AI response
export const generateAIResponse = async (userMessage) => {
  try {
    const model = getModel();

    // Create prompt template with system message and conversation history
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', SYSTEM_PROMPT],
      ...conversationHistory.map((msg) => {
        if (msg instanceof HumanMessage) {
          return ['human', msg.content];
        } else if (msg instanceof AIMessage) {
          return ['ai', msg.content];
        }
        return msg;
      }),
      ['human', '{input}'],
    ]);

    // Add user message to history
    conversationHistory.push(new HumanMessage(userMessage));

    // Create the chain
    const chain = prompt.pipe(model);

    // Invoke the chain
    const response = await chain.invoke({
      input: userMessage,
    });

    const aiResponse = response.content;

    // Add AI response to history
    conversationHistory.push(new AIMessage(aiResponse));

    // Limit conversation history to last 10 messages to avoid token limits
    if (conversationHistory.length > 20) {
      // Keep system message context but limit to recent messages
      conversationHistory = conversationHistory.slice(-10);
    }

    return aiResponse;
  } catch (error) {
    console.error('Error generating AI response:', error);

    // Fallback error message
    if (error.message && error.message.includes('API_KEY')) {
      return "I'm having trouble connecting to my AI service. Please make sure the Google Gemini API key is configured in the .env file.";
    }

    return "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.";
  }
};

// Reset conversation history
export const resetConversation = () => {
  conversationHistory = [];
};
