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

// Mock streaming function - simulates token-by-token streaming
const streamMockResponse = async (fullResponse, onToken, delay = 30) => {
  // Split response into words and spaces for natural streaming
  const tokens = fullResponse.split(/(\s+)/);

  for (const token of tokens) {
    if (token && token.length > 0) {
      if (onToken && typeof onToken === 'function') {
        onToken(token);
      }
      // Small delay between tokens for smooth streaming effect
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Main function to generate AI response with streaming support
export const generateAIResponse = async (userMessage, onToken = null) => {
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

    // If onToken callback is provided, use streaming
    if (onToken && typeof onToken === 'function') {
      try {
        // Try to use actual streaming
        const stream = await chain.stream({
          input: userMessage,
        });

        let fullResponse = '';
        for await (const chunk of stream) {
          let content = '';
          if (typeof chunk === 'string') {
            content = chunk;
          } else if (chunk && typeof chunk === 'object') {
            content =
              chunk.content || chunk.text || chunk.message?.content || '';
          }

          if (content && typeof content === 'string') {
            fullResponse += content;
            onToken(content);
          }
        }

        // Add AI response to history
        if (fullResponse) {
          conversationHistory.push(new AIMessage(fullResponse));
        }

        // Limit conversation history
        if (conversationHistory.length > 20) {
          conversationHistory = conversationHistory.slice(-10);
        }

        return fullResponse;
      } catch (streamError) {
        console.warn(
          'Streaming failed, using invoke with mock streaming:',
          streamError
        );
        // Fall back to invoke and mock stream
        const response = await chain.invoke({
          input: userMessage,
        });

        const aiResponse = response.content || '';

        // Mock stream the response
        if (aiResponse && onToken) {
          await streamMockResponse(aiResponse, onToken);
        }

        // Add AI response to history
        if (aiResponse) {
          conversationHistory.push(new AIMessage(aiResponse));
        }

        // Limit conversation history
        if (conversationHistory.length > 20) {
          conversationHistory = conversationHistory.slice(-10);
        }

        return aiResponse;
      }
    } else {
      // No streaming - use regular invoke
      const response = await chain.invoke({
        input: userMessage,
      });

      const aiResponse = response.content;

      // Add AI response to history
      conversationHistory.push(new AIMessage(aiResponse));

      // Limit conversation history to last 10 messages to avoid token limits
      if (conversationHistory.length > 20) {
        conversationHistory = conversationHistory.slice(-10);
      }

      return aiResponse;
    }
  } catch (error) {
    console.error('Error generating AI response:', error);

    // Fallback error message
    if (error.message && error.message.includes('API_KEY')) {
      const errorMsg =
        "I'm having trouble connecting to my AI service. Please make sure the Google Gemini API key is configured in the .env file.";
      if (onToken) {
        await streamMockResponse(errorMsg, onToken);
      }
      return errorMsg;
    }

    const errorMsg =
      "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.";
    if (onToken) {
      await streamMockResponse(errorMsg, onToken);
    }
    return errorMsg;
  }
};

// Reset conversation history
export const resetConversation = () => {
  conversationHistory = [];
};
