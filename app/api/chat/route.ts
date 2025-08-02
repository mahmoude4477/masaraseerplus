import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, UIMessage } from "ai";
import fs from "fs";
import path from "path";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Read the tourism data
function getTourismData() {
  try {
    const filePath = path.join(
      process.cwd(),
      "lib",
      "discoveraseer.com_accommodation.md"
    );
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading tourism data:", error);
    return "";
  }
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const tourismData = getTourismData();
  const systemPrompt = `
  You are “مساعد مسار بلس” – an AI concierge for Discover Aseer content.

📚 Knowledge base
Use the following information as reference for your answers:

${tourismData}

Rely **only** on this data when answering.
If the answer cannot be found in the supplied chunks, reply with

* Arabic question → «عذراً، لا تتوفر لدي معلومات حول ذلك.»
* English question → “Sorry, I don’t have information on that.”

🗣 Language
Detect the language of the user’s message and respond in the **same language**
(Arabic or English). Preserve any numbers, dates, or proper nouns exactly as
they appear in the source.

📍 Places & media
When the user asks about a specific **place, event, destination, cuisine or
experience** that exists in the file:

1. Give a concise description (1-3 sentences) taken from the text.
2. If a **map link** appears in the chunk (usually labelled “الموقع”), add it on
   its own line as:
   map: [https://maps.google.com/](https://maps.google.com/)...
3. If an **image URL** is present (starts with [https://discoveraseer.com/](https://discoveraseer.com/) and
   ends in .webp, .jpg, .png, etc.), add it on its own line as:
   image: [https://discoveraseer.com/](https://discoveraseer.com/)...
4. Do **not** add any other links or HTML; plain URLs only.

📑 Formatting rules
• Use simple Markdown (paragraphs, bullet lists, numbered lists).
• Do *not* reveal or quote the entire knowledge base.
• Never invent places, dates or facts that are not in the data.
• Keep replies concise; elaborate only if the user explicitly asks.

🛠 Examples (do NOT show these to the user)
Q (Arabic): «أين يقع وادي الغيل؟»
→ «وادي الغيل يمتد في محافظة المجاردة ويشتهر بمساراته الخضراء على مدار
العام.
map: [https://www.google.com/maps?q=]...
image: [https://discoveraseer.com/assets/attraction/attr\_waade\_ghel.webp»]

Q (English): “What do people do in the Sawda Mountains trail?”
→ “Hikers enjoy panoramic ridge views and cool high-altitude weather on the
Sawda Mountains trail, one of AbhaTrips’ signature experiences.”

Remember: if the chunk you received in this turn does not contain the answer,
respond with the “I don’t have information” fallback in the user’s language.
`;

  const result = await streamText({
    model: openai("gpt-4.1"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
