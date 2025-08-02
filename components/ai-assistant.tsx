"use client";

import { JSX, useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import Image from "next/image";
import { marked } from "marked";

const renderer = new marked.Renderer();
renderer.image = ({ href, text }) => {
  return `<img src="${href}" alt="${text || ""}" />`;
};
marked.setOptions({ breaks: true, renderer });

// 📌 التحقق من صحة الرابط
function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// 📌 تحويل النصوص مع الصور
function parseMessageContent(text: string) {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let currentTextLines: string[] = [];

  const flushTextLines = () => {
    if (currentTextLines.length > 0) {
      const textContent = currentTextLines.join("\n");

      // حوّل Markdown إلى HTML
      const htmlContent = marked(textContent);

      // استبدل <next-image> بمكون Image
      const temp = document.createElement("div");
      temp.innerHTML = typeof htmlContent === "string" ? htmlContent : "";

      const reactElements: JSX.Element[] = [];
      temp.childNodes.forEach((node, i) => {
        if (
          node.nodeType === 1 &&
          (node as HTMLElement).tagName.toLowerCase() === "next-image"
        ) {
          const el = node as HTMLElement;
          reactElements.push(
            <Image
              key={`img-${i}`}
              src={el.getAttribute("src")?.trim() || "/favicon.ico"}
              alt={el.getAttribute("alt") || ""}
              width={250}
              height={180}
              className="rounded-lg object-cover shadow-sm max-w-full h-auto"
              unoptimized
            />
          );
        } else {
          reactElements.push(
            <span
              key={`html-${i}`}
              dangerouslySetInnerHTML={{
                __html: (node as HTMLElement).outerHTML || "",
              }}
            />
          );
        }
      });

      elements.push(<div key={elements.length}>{reactElements}</div>);
      currentTextLines = [];
    }
  };

  lines.forEach((line) => {
    console.log("Processing line:", line);

    if (line.startsWith("image: ")) {
      flushTextLines();
      const imageUrl = line.replace("image: ", "").trim();
      if (imageUrl && isValidUrl(imageUrl)) {
        console.log("Valid image URL found:", imageUrl);

        elements.push(
          <div key={elements.length} className="my-3 w-full">
            <Image
              src={imageUrl}
              alt="صورة توضيحية"
              width={250}
              height={180}
              className="rounded-lg object-cover shadow-sm max-w-full h-auto"
              unoptimized
              onError={(e) => {
                console.error("Image failed to load:", imageUrl);
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        );
      } else if (imageUrl) {
        console.warn("Invalid image URL:", imageUrl);
        // إضافة رسالة للمستخدم عن الرابط غير الصحيح
        elements.push(
          <div
            key={elements.length}
            className="my-2 text-muted-foreground text-xs"
          >
            ⚠️ رابط الصورة غير صحيح: {imageUrl}
          </div>
        );
      }
    } else if (line.startsWith("map: ")) {
      flushTextLines();
      const mapUrl = line.replace("map: ", "").trim();
      if (mapUrl && isValidUrl(mapUrl)) {
        elements.push(
          <div key={elements.length} className="my-2">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
            >
              📍 عرض الموقع على الخريطة
            </a>
          </div>
        );
      } else if (mapUrl) {
        console.warn("Invalid map URL:", mapUrl);
        // إضافة رسالة للمستخدم عن الرابط غير الصحيح
        elements.push(
          <div
            key={elements.length}
            className="my-2 text-muted-foreground text-xs"
          >
            ⚠️ رابط الخريطة غير صحيح: {mapUrl}
          </div>
        );
      }
    } else {
      currentTextLines.push(line);
    }
  });

  flushTextLines();
  return elements.length > 0 ? elements : [<span key="fallback">{text}</span>];
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  // 📌 التمرير لأسفل عند وصول رسائل جديدة
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* زر المساعد */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">مساعد ذكي</span>
      </Button>

      {/* نافذة المحادثة */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end p-4">
          <Card className="w-full max-w-lg h-[90vh] max-h-[700px] flex flex-col">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-primary" />
                مساعد ذكي
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              {/* منطقة الرسائل */}
              <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden min-h-0">
                <div className="space-y-4 min-h-0">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <Bot className="h-12 w-12 mx-auto mb-3 text-primary" />
                      <p className="text-sm">مرحباً! أنا مساعدك الذكي</p>
                      <p className="text-xs">
                        اسألني عن أي شيء حول السياحة في عسير
                      </p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`${
                          message.role === "user"
                            ? "max-w-[80%]"
                            : "max-w-[90%]"
                        } rounded-lg px-3 py-2 text-sm break-words ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.role === "user" ? (
                          message.parts.map((part, index) =>
                            part.type === "text" ? (
                              <span key={index}>{part.text}</span>
                            ) : null
                          )
                        ) : (
                          <div className="space-y-1">
                            {message.parts.map((part, index) =>
                              part.type === "text" ? (
                                <div key={index}>
                                  {parseMessageContent(part.text)}
                                </div>
                              ) : null
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {(status === "submitted" || status === "streaming") && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* مرجع التمرير */}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* حقل الإدخال */}
              <div className="border-t p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                      sendMessage({ text: input });
                      setInput("");
                    }
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="اكتب سؤالك هنا..."
                    disabled={status !== "ready"}
                    className="flex-1"
                    dir="rtl"
                  />
                  <Button
                    type="submit"
                    disabled={status !== "ready"}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
