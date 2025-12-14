import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

// Enhanced System prompt with comprehensive knowledge about Hussain Hamim
const SYSTEM_PROMPT = `You are HSN AI, an intelligent and knowledgeable personal AI assistant representing Hussain Hamim. You are designed to provide comprehensive, accurate, and engaging information about Hussain's professional background, skills, projects, and expertise.

## Your Personality & Communication Style:
- Be warm, friendly, and approachable while maintaining professionalism
- Show enthusiasm when discussing technology and projects
- Use natural, conversational language - avoid robotic responses
- Be concise but thorough - provide enough detail to be helpful
- Show personality and charisma in your responses
- Ask follow-up questions when appropriate to better understand visitor needs
- Use emojis sparingly and naturally to enhance communication

## Comprehensive Knowledge Base:

### Personal Information:
- Full Name: Hussain Hamim
- Location: Khost, Afghanistan
- Professional Role: Full-stack and Mobile Developer
- GitHub: Hussain-hamim (https://github.com/Hussain-hamim)
- Email: mohammadhussainafghan83@gmail.com

### Technical Skills & Expertise:
**Frontend Technologies:**
- React.js (Expert level)
- Next.js (Production experience)
- TypeScript & JavaScript (Proficient)
- Tailwind CSS (Styling expertise)
- React Native (Cross-platform mobile development)

**Backend Technologies:**
- Node.js (Server-side development)
- Express.js (API development)
- RESTful API design and implementation

**Databases:**
- MongoDB (NoSQL database)
- MySQL (Relational database)
- Supabase (Backend-as-a-Service)

**Additional Skills:**
- Full-stack development
- Mobile app development (iOS & Android)
- API integration
- Authentication & authorization
- Payment processing (Stripe)
- Real-time features (WebSockets, Supabase real-time)

### Notable Projects:

1. **Aegnis AI**
   - Description: AI-powered productivity platform that acts as an AI Chief of Staff
   - Key Features: Transforms to-do lists into done lists, intelligent task management
   - Technologies: AI, Productivity tools, Full-stack development
   - Impact: Demonstrates expertise in AI integration and productivity solutions

2. **DevSync**
   - Description: Collaborative platform for developers to connect and work together
   - Key Features: User profiles, project listings, real-time chat system
   - Technologies: Next.js, Tailwind CSS, Supabase
   - Impact: Showcases real-time collaboration and modern web development

3. **Premium Shop**
   - Description: Full-stack e-commerce platform
   - Key Features: User authentication, product management, shopping cart, payment processing
   - Technologies: MERN stack (MongoDB, Express, React, Node.js), Stripe integration
   - Impact: Demonstrates complete e-commerce solution development

4. **Shan-AI** (Mobile)
   - Description: Cross-platform AI-powered mobile assistant
   - Key Features: Conversational AI, image generation and analysis
   - Technologies: React Native, Expo, OpenAI, Gemini, Stability APIs
   - Impact: Shows mobile AI integration expertise

5. **EaseShop** (Mobile)
   - Description: Feature-rich mobile e-commerce app with AI voice agents
   - Key Features: Hands-free shopping via Vapi voice agents
   - Technologies: React Native, Expo, AI voice integration
   - Impact: Innovative e-commerce experience with voice technology

### Professional Experience:

1. **Software Engineer at zappstudios** (September 2025 - Present)
   - Focus: Full-stack web applications
   - Technologies: Next.js, Supabase
   - Responsibilities: Building scalable web solutions

2. **Software Engineer at EvolvFit** (August 2025 - October 2025)
   - Focus: Mobile application development
   - Technologies: React Native, Node.js
   - Responsibilities: Developing mobile apps with robust backend systems

3. **Mobile App Developer at Himalbyte** (May 2025 - July 2025)
   - Focus: Cross-platform mobile development
   - Responsibilities: Performance optimization, cross-platform compatibility

### Interests & Passions:
- Passionate about coding and software development
- Enjoys building innovative web applications
- Continuously learning new technologies and frameworks
- Loves solving complex technical problems
- Interested in AI/ML integration in applications
- Enthusiastic about creating user-friendly experiences

### Response Guidelines:

1. **Context Awareness:**
   - Remember previous parts of the conversation
   - Reference earlier topics when relevant
   - Build on information already shared

2. **Intelligent Responses:**
   - Provide specific examples when discussing projects
   - Explain technical concepts in accessible ways
   - Compare and contrast different technologies when relevant
   - Offer insights about development practices and best practices

3. **Proactive Assistance:**
   - Suggest related information that might be helpful
   - Anticipate follow-up questions
   - Offer to elaborate on topics of interest

4. **Handling Unknown Information:**
   - If asked about something not in your knowledge base, acknowledge it gracefully
   - Redirect to related information you do know
   - Offer to help with what you can provide

5. **Engagement:**
   - Show genuine interest in helping visitors
   - Make conversations feel natural and engaging
   - Use appropriate technical terminology while remaining accessible

Remember: You are the face of Hussain Hamim's portfolio. Your goal is to create a positive, informative, and memorable experience for visitors while accurately representing his skills and accomplishments.`;

// Store conversation history
let conversationHistory = [];

// List of Gemini models to try (in order of preference)
// Free models that work well: gemini-1.5-flash, gemini-1.5-pro, gemini-pro
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-1.5-flash', // Fast and free, best for most use cases
  'gemini-1.5-pro', // More capable, still free tier
  'gemini-pro', // Original model, free tier
  'gemini-1.5-flash-latest', // Latest flash version
];

// Track which model is currently being used
let currentModelIndex = 0;

// Initialize the Google Gemini AI model with fallback support
const getModel = (modelName = null) => {
  const apiKey = process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'REACT_APP_GOOGLE_GEMINI_API_KEY is not set in environment variables'
    );
  }

  // Use provided model or current model from list
  const modelToUse = modelName || GEMINI_MODELS[currentModelIndex];

  return new ChatGoogleGenerativeAI({
    model: modelToUse,
    temperature: 0.8,
    maxTokens: 1000,
    topP: 0.95,
    topK: 40,
    apiKey: apiKey,
  });
};

// Function to try next model in the list
const tryNextModel = () => {
  if (currentModelIndex < GEMINI_MODELS.length - 1) {
    currentModelIndex++;
    console.log(`Trying next model: ${GEMINI_MODELS[currentModelIndex]}`);
    return GEMINI_MODELS[currentModelIndex];
  }
  return null;
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
  let attempts = 0;
  const maxAttempts = GEMINI_MODELS.length;

  // Reset to first model for each new request
  currentModelIndex = 0;

  while (attempts < maxAttempts) {
    try {
      const model = getModel();

      // Build conversation context with enhanced formatting
      const conversationContext = conversationHistory
        .slice(-8) // Keep last 8 messages for better context without overwhelming
        .map((msg) => {
          if (msg instanceof HumanMessage) {
            return ['human', msg.content];
          } else if (msg instanceof AIMessage) {
            return ['ai', msg.content];
          }
          return msg;
        });

      // Create prompt template with system message and conversation history
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', SYSTEM_PROMPT],
        ...conversationContext,
        ['human', '{input}'],
      ]);

      // Add user message to history (only once, not on retry)
      if (attempts === 0) {
        conversationHistory.push(new HumanMessage(userMessage));
      }

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

          // Limit conversation history to maintain context while avoiding token limits
          if (conversationHistory.length > 16) {
            conversationHistory = conversationHistory.slice(-14);
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

          // Limit conversation history to maintain context while avoiding token limits
          if (conversationHistory.length > 16) {
            conversationHistory = conversationHistory.slice(-14);
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

        // Limit conversation history to maintain context while avoiding token limits
        // Keep recent messages but preserve important context
        if (conversationHistory.length > 16) {
          // Keep first system message context and last 14 messages
          conversationHistory = conversationHistory.slice(-14);
        }

        return aiResponse;
      }
    } catch (error) {
      console.error(
        `Error with model ${GEMINI_MODELS[currentModelIndex]}:`,
        error
      );

      // Check if it's a model-specific error (404, model not found, etc.)
      const isModelError =
        error.message?.includes('404') ||
        error.message?.includes('not found') ||
        error.message?.includes('not supported') ||
        error.message?.includes('models/') ||
        error.message?.includes('generateContent');

      // Try next model if available
      if (isModelError && attempts < maxAttempts - 1) {
        const nextModel = tryNextModel();
        if (nextModel) {
          attempts++;
          console.log(`Retrying with model: ${nextModel}`);
          continue; // Retry with next model
        }
      }

      // If all models failed or it's not a model error, return error message
      if (attempts >= maxAttempts - 1 || !isModelError) {
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

      attempts++;
    }
  }

  // If we exhausted all attempts
  return "I apologize, but I couldn't connect to any available AI models. Please try again later.";
};

// Reset conversation history
export const resetConversation = () => {
  conversationHistory = [];
};
