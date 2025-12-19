import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

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

// Groq models to try (in order of preference)
// Based on user's example: prioritizing models with good tool support and high TPM
const GROQ_MODELS = [
  "llama-3.3-70b-versatile", // 300K TPM - best for LangChain tools
  "llama-3.1-8b-instant", // 6K TPM - fast (may hit limits)
  "llama-3.1-70b-versatile", // Fallback
  "mixtral-8x7b-32768", // Alternative
];

// Track which model is currently being used
let currentModelIndex = 0;

// Track rate-limited models to skip them quickly
const rateLimitedModels = new Set();

// Track quota-exceeded models (need longer wait time)
const quotaExceededModels = new Map(); // Map of model name to retry time

// Track last request time to throttle requests
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 500; // Minimum 500ms between requests

// Reset rate-limited models after some time (5 minutes)
const resetRateLimitedModels = () => {
  setTimeout(() => {
    rateLimitedModels.clear();
    console.log("Rate limit tracking reset");
  }, 5 * 60 * 1000); // 5 minutes
};

// Reset quota-exceeded models after 24 hours (daily quota resets)
const resetQuotaExceededModels = () => {
  setTimeout(() => {
    quotaExceededModels.clear();
    console.log("Quota tracking reset (daily quota should be reset)");
  }, 24 * 60 * 60 * 1000); // 24 hours
};

// Initialize the Groq AI model with fallback support
const getModel = (modelName = null) => {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "REACT_APP_GROQ_API_KEY is not set in environment variables"
    );
  }

  // Use provided model or current model from list
  const modelToUse = modelName || GROQ_MODELS[currentModelIndex];

  const modelInstance = new ChatGroq({
    model: modelToUse,
    temperature: 0.4, // Lower temperature for faster, more deterministic responses
    maxTokens: 2048, // Increased from 1000 for better responses
    apiKey: apiKey.trim(),
    maxRetries: 1, // Reduced retries to fail faster and try next model
  });

  return modelInstance;
};

// Function to try next model in the list
const tryNextModel = () => {
  if (currentModelIndex < GROQ_MODELS.length - 1) {
    currentModelIndex++;
    console.log(`Trying next model: ${GROQ_MODELS[currentModelIndex]}`);
    return GROQ_MODELS[currentModelIndex];
  }
  return null;
};

// Mock streaming function - simulates token-by-token streaming
const streamMockResponse = async (fullResponse, onToken, delay = 30) => {
  // Split response into words and spaces for natural streaming
  const tokens = fullResponse.split(/(\s+)/);

  for (const token of tokens) {
    if (token && token.length > 0) {
      if (onToken && typeof onToken === "function") {
        onToken(token);
      }
      // Small delay between tokens for smooth streaming effect
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Main function to generate AI response with streaming support
export const generateAIResponse = async (userMessage, onToken = null) => {
  // Throttle requests to avoid rate limits
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const delay = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`Throttling request: waiting ${delay}ms to avoid rate limits`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  lastRequestTime = Date.now();

  let attempts = 0;
  const maxAttempts = GROQ_MODELS.length;

  // Reset to first model for each new request, but skip rate-limited models
  currentModelIndex = 0;

  // Skip to first non-rate-limited and non-quota-exceeded model
  while (currentModelIndex < GROQ_MODELS.length) {
    const modelName = GROQ_MODELS[currentModelIndex];
    const isRateLimited = rateLimitedModels.has(modelName);
    const quotaInfo = quotaExceededModels.get(modelName);
    const isQuotaExceeded = quotaInfo && Date.now() < quotaInfo.retryAfter;

    if (isRateLimited) {
      console.log(`Skipping rate-limited model at start: ${modelName}`);
      currentModelIndex++;
    } else if (isQuotaExceeded) {
      const waitTime = Math.ceil((quotaInfo.retryAfter - Date.now()) / 1000);
      console.log(
        `Skipping quota-exceeded model at start: ${modelName} (retry in ${waitTime}s)`
      );
      currentModelIndex++;
    } else {
      break; // Found a usable model
    }
  }

  // If all models are rate-limited or quota-exceeded, clear and start fresh
  if (currentModelIndex >= GROQ_MODELS.length) {
    console.warn(
      "All models are rate-limited or quota-exceeded. Clearing and starting fresh..."
    );
    rateLimitedModels.clear();
    quotaExceededModels.clear();
    currentModelIndex = 0;
  }

  while (attempts < maxAttempts) {
    try {
      // Skip rate-limited and quota-exceeded models
      const currentModelName = GROQ_MODELS[currentModelIndex];
      const isRateLimited = rateLimitedModels.has(currentModelName);
      const quotaInfo = quotaExceededModels.get(currentModelName);
      const isQuotaExceeded = quotaInfo && Date.now() < quotaInfo.retryAfter;

      if (isRateLimited) {
        console.log(`Skipping rate-limited model: ${currentModelName}`);
        const nextModel = tryNextModel();
        if (!nextModel) {
          rateLimitedModels.clear();
          quotaExceededModels.clear();
          currentModelIndex = 0;
          continue;
        }
        attempts++;
        continue;
      }

      if (isQuotaExceeded) {
        const waitTime = Math.ceil((quotaInfo.retryAfter - Date.now()) / 1000);
        console.log(
          `Skipping quota-exceeded model: ${currentModelName} (retry in ${waitTime}s)`
        );
        const nextModel = tryNextModel();
        if (!nextModel) {
          rateLimitedModels.clear();
          quotaExceededModels.clear();
          currentModelIndex = 0;
          continue;
        }
        attempts++;
        continue;
      }

      const model = getModel();

      // Build conversation context with enhanced formatting
      const conversationContext = conversationHistory
        .slice(-8) // Keep last 8 messages for better context without overwhelming
        .map((msg) => {
          if (msg instanceof HumanMessage) {
            return ["human", msg.content];
          } else if (msg instanceof AIMessage) {
            return ["ai", msg.content];
          }
          return msg;
        });

      // Create prompt template with system message and conversation history
      const prompt = ChatPromptTemplate.fromMessages([
        ["system", SYSTEM_PROMPT],
        ...conversationContext,
        ["human", "{input}"],
      ]);

      // Add user message to history (only once, not on retry)
      if (attempts === 0) {
        conversationHistory.push(new HumanMessage(userMessage));
      }

      // Create the chain
      const chain = prompt.pipe(model);

      // If onToken callback is provided, use streaming
      if (onToken && typeof onToken === "function") {
        try {
          // Try to use actual streaming
          const stream = await chain.stream({
            input: userMessage,
          });

          let fullResponse = "";
          for await (const chunk of stream) {
            let content = "";
            if (typeof chunk === "string") {
              content = chunk;
            } else if (chunk && typeof chunk === "object") {
              content =
                chunk.content || chunk.text || chunk.message?.content || "";
            }

            if (content && typeof content === "string") {
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
            "Streaming failed, using invoke with mock streaming:",
            streamError
          );
          // Fall back to invoke and mock stream
          const response = await chain.invoke({
            input: userMessage,
          });

          const aiResponse = response.content || "";

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
        `Error with model ${GROQ_MODELS[currentModelIndex]}:`,
        error
      );

      // Extract error status and message - check multiple possible error structures
      const errorStatus =
        error.status ||
        error.statusCode ||
        error.response?.status ||
        error.response?.statusCode ||
        error.error?.status ||
        error.error?.statusCode;

      const errorMessage =
        error.message || error.toString() || error.error?.message || "";

      const errorCode = error.code || error.error?.code || "";

      // Check error message string for status codes
      const errorString = JSON.stringify(error).toLowerCase();
      const has429 =
        errorString.includes("429") ||
        errorString.includes("too many requests");
      const has404 =
        errorString.includes("404") || errorString.includes("not found");

      // Check if it's a quota exceeded error (429 with quota message)
      const isQuotaExceededError =
        (errorStatus === 429 || has429) &&
        (errorString.includes("quota") ||
          errorString.includes("exceeded") ||
          errorMessage.includes("quota") ||
          errorMessage.includes("exceeded"));

      // Check if it's a rate limit error (429) - switch immediately
      const isRateLimitError =
        (errorStatus === 429 ||
          has429 ||
          errorMessage.includes("429") ||
          errorMessage.includes("Too Many Requests") ||
          errorMessage.includes("too many requests") ||
          errorCode === "429") &&
        !isQuotaExceededError; // Don't treat quota errors as rate limit

      // Check if it's a model-specific error (404, model not found, etc.)
      const isModelError =
        errorStatus === 404 ||
        has404 ||
        errorMessage.includes("404") ||
        errorMessage.includes("not found") ||
        errorMessage.includes("not supported") ||
        errorMessage.includes("models/") ||
        errorMessage.includes("generateContent") ||
        errorCode === "404";

      // For quota exceeded errors, mark model and wait for retry time
      if (isQuotaExceededError) {
        const failedModel = GROQ_MODELS[currentModelIndex];

        // Try to extract retry delay from error message
        const retryMatch =
          errorMessage.match(/retry in ([\d.]+)s/i) ||
          errorString.match(/retrydelay["\s:]+(\d+)s/i);
        const retryDelaySeconds = retryMatch ? parseFloat(retryMatch[1]) : 60; // Default 60 seconds for Groq
        const retryAfter = Date.now() + retryDelaySeconds * 1000;

        quotaExceededModels.set(failedModel, { retryAfter });
        console.warn(
          `⚠️ Quota exceeded for ${failedModel}. Rate limit reached. Will retry after ${Math.ceil(
            retryDelaySeconds
          )}s.`
        );

        // Reset quota tracking periodically
        if (quotaExceededModels.size === 1) {
          resetQuotaExceededModels();
        }

        // Try next model immediately (don't wait, just switch)
        const nextModel = tryNextModel();
        if (nextModel) {
          // Skip if next model is also quota-exceeded
          const nextQuotaInfo = quotaExceededModels.get(nextModel);
          if (nextQuotaInfo && Date.now() < nextQuotaInfo.retryAfter) {
            console.log(`Skipping quota-exceeded model: ${nextModel}`);
            const nextNextModel = tryNextModel();
            if (nextNextModel) {
              attempts++;
              console.log(`🔄 Switching to model: ${nextNextModel}`);
              continue;
            }
          } else {
            attempts++;
            console.log(`🔄 Switching to model: ${nextModel}`);
            continue;
          }
        }

        // If all models are quota-exceeded, return helpful message
        if (quotaExceededModels.size >= GROQ_MODELS.length) {
          const errorMsg =
            "I've reached the rate limit for all available models. Please try again in a moment, or check your Groq API key configuration.";
          if (onToken) {
            await streamMockResponse(errorMsg, onToken);
          }
          return errorMsg;
        }
      }

      // For rate limit errors, mark model as rate-limited and switch immediately
      if (isRateLimitError) {
        const failedModel = GROQ_MODELS[currentModelIndex];
        rateLimitedModels.add(failedModel);
        console.warn(
          `⚠️ Rate limit (429) detected for ${failedModel}. Marking as rate-limited and switching immediately.`
        );

        // Reset rate-limited models periodically
        if (rateLimitedModels.size === 1) {
          resetRateLimitedModels();
        }

        // Add a small delay before trying next model to avoid immediate rate limiting
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Immediately try next model
        const nextModel = tryNextModel();
        if (nextModel) {
          // Skip if next model is also rate-limited
          if (rateLimitedModels.has(nextModel)) {
            console.log(`Skipping rate-limited model: ${nextModel}`);
            const nextNextModel = tryNextModel();
            if (nextNextModel) {
              attempts++;
              console.log(`🔄 Switching to model: ${nextNextModel}`);
              continue;
            }
          } else {
            attempts++;
            console.log(`🔄 Switching to model: ${nextModel}`);
            continue; // Switch immediately to next model
          }
        }

        // If no more models, clear rate limits and start over
        console.warn(
          "⚠️ All models exhausted. Clearing rate limits and retrying..."
        );
        rateLimitedModels.clear();
        currentModelIndex = 0;
        attempts = 0;
        // Add a longer delay before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }

      // For other model errors (404, etc.), try next model
      if (isModelError && attempts < maxAttempts - 1) {
        const nextModel = tryNextModel();
        if (nextModel) {
          attempts++;
          console.log(
            `Model ${GROQ_MODELS[currentModelIndex - 1]} failed (${
              errorStatus || errorMessage
            }). Retrying with model: ${nextModel}`
          );
          continue; // Retry with next model
        }
      }

      // If all models failed or it's not a model error, return error message
      if (attempts >= maxAttempts - 1 || !isModelError) {
        // Fallback error message
        if (
          (error.message && error.message.includes("API_KEY")) ||
          error.message?.includes("api key")
        ) {
          const errorMsg =
            "I'm having trouble connecting to my AI service. Please make sure the Groq API key (REACT_APP_GROQ_API_KEY) is configured in the .env file.";
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
