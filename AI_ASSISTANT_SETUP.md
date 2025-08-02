# AI Assistant Setup Instructions

## ✅ What's Implemented

I've successfully added an AI assistant (مساعد ذكي) to your homepage using Vercel AI SDK v5. Here's what's been implemented:

### 1. **AI Assistant Component** (`components/ai-assistant.tsx`)

- Floating chat button in the bottom-right corner
- Modal chat interface with Arabic UI
- Real-time message streaming
- Loading states and proper error handling
- Responsive design that works on mobile and desktop

### 2. **API Route** (`app/api/chat/route.ts`)

- Uses OpenAI's GPT-3.5-turbo model
- Includes comprehensive tourism data about Asir region
- Streams responses in real-time
- Handles Arabic text properly

### 3. **Tourism Data** (`lib/asir-tourism-data.md`)

- Comprehensive information about Asir region
- Tourist destinations, activities, food, accommodations
- Climate information and travel tips
- Traditional culture and festivals

## 🔧 Setup Required

### 1. **Get OpenAI API Key**

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key

### 2. **Add API Key to Environment**

Open `.env.local` file and replace `your_openai_api_key_here` with your actual OpenAI API key:

```bash
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

### 3. **Start Development Server**

```bash
npm run dev
```

## 🎯 Features

### **User Experience**

- Click the floating message icon (💬) on any page
- Chat opens in a modal window
- Type questions in Arabic or English
- AI responds with tourism information about Asir region
- Supports RTL (right-to-left) text input

### **AI Capabilities**

- Answers questions about Asir tourism
- Provides destination recommendations
- Suggests activities and experiences
- Offers travel tips and practical information
- Explains local culture and traditions
- Recommends accommodations and restaurants

### **Example Questions Users Can Ask**

- "ما هي أجمل الأماكن في أبها؟"
- "ما هو أفضل وقت لزيارة منطقة عسير؟"
- "أريد التخطيط لرحلة عائلية لمدة 3 أيام"
- "ما هي الأنشطة المتاحة في السودة؟"
- "أين يمكنني تناول الطعام التقليدي؟"

## 🔄 Customization Options

### **Change AI Model**

In `app/api/chat/route.ts`, you can change the model:

```typescript
model: openai("gpt-4"), // Instead of gpt-3.5-turbo
```

### **Update Tourism Data**

Edit `lib/asir-tourism-data.md` to add more information or modify existing content.

### **Styling**

The component uses your existing design system (shadcn/ui) and should match your website's theme automatically.

### **Button Position**

To change the button position, modify the className in `components/ai-assistant.tsx`:

```typescript
className = "fixed bottom-6 left-6 h-14 w-14..."; // For left side
```

## 🚀 Next Steps

1. Add your OpenAI API key to `.env.local`
2. Start the development server
3. Test the AI assistant by clicking the chat button
4. Customize the tourism data as needed
5. Deploy to production

The AI assistant is now ready to help users with tourism information about Asir region!
