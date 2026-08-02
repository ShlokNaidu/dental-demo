"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles, User, RefreshCw } from "lucide-react";
import { CLINIC_NAME, DOCTOR_NAME } from "@/lib/utils/constants";
import { StepState, ConversationContext } from "@/types";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export const FloatingChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: `Hello! 👋 Welcome to ${CLINIC_NAME} (Vijay Nagar, Indore). I am your AI Dental Assistant powered by Groq. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<StepState>("IDLE");
  const [context, setContext] = useState<ConversationContext>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text || !text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          currentStep,
          context,
        }),
      });

      const data = await response.json();

      const botReply: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: data.reply || "Thank you for reaching out to Smile Care Dental Clinic!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      if (data.nextStep) setCurrentStep(data.nextStep);
      if (data.updatedContext) setContext(data.updatedContext);

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Error communicating with AI bot:", err);
      const fallbackReply: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        sender: "bot",
        text: `Thank you! For urgent queries, call ${DOCTOR_NAME}'s team directly or reply 'Book' for an appointment.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    { label: "🗓️ Book Appointment", text: "Book appointment" },
    { label: "💰 Treatment Prices", text: "What are your service prices?" },
    { label: "📍 Clinic Hours", text: "What are your clinic opening hours?" },
    { label: "⚠️ Severe Toothache", text: "Doctor I have severe pain and swelling!" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-4 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-gradient-to-r from-teal-700 to-accent text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-1.5">
                    <span>Smile Care AI Assistant</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h4>
                  <p className="text-[11px] text-teal-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Groq Llama-3.1 Live Bot</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                      msg.sender === "user"
                        ? "bg-stone-800 text-white"
                        : "bg-accent text-white"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[78%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-stone-800 text-white rounded-tr-none"
                        : "bg-white text-charcoal border border-stone-200 shadow-sm rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        msg.sender === "user" ? "text-stone-300" : "text-stone-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
                    <span>AI is typing response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 bg-stone-100/70 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSendMessage(p.text)}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-medium text-stone-700 hover:bg-accent hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about treatments, timing, or type 'Book'..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 rounded-full bg-accent text-white shadow-2xl hover:bg-accent-hover hover:scale-105 transition-all flex items-center gap-2 ring-4 ring-white"
          aria-label="Open AI Dental Chatbot"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pr-1">
            Chat with AI Bot
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}
    </div>
  );
};
