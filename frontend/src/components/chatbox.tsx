import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/api";
import MessageBubble from "./messagebubble";
import type { Message } from "../types/chat";

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState("light");
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    }
    
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
        }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
        }, [theme]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSend() {
        if (!input.trim() || loading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
        const data = await sendMessage("user123", input);

        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.response },
        ]);
        } finally {
        setLoading(false);
        }
    }

    function handleNewChat() {
        setMessages([]);
    }

    return (
    <div className="min-h-screen w-full flex flex-col bg-linear-to-br bg-primary dark:bg-primary-dark  transition-colors duration-300">
        {/* Header */}
        <div className="relative flex items-center justify-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur bg-white/70 dark:bg-zinc-950/80">
            {/* New Chat */}
            <button
                onClick={handleNewChat}
                className="absolute left-6 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] cursor-pointer text-zinc-900 dark:text-white text-xl transition"
            >
                +
            </button>

            {/* Title */}
            <div className="flex items-center gap-3">
            <img src="/chatbot_logo.png" className="w-9 h-9 rounded-xl" />
            <div className="text-center">
                <h1 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
                    AI Chat Assistant
                </h1>
                <p className="text-xs text-zinc-400">
                    Powered by FastAPI + Groq
                </p>
            </div>
            </div>

            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="absolute p-2 shadow-md cursor-pointer right-6 w-10 h-10 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-white dark:shadow-amber-400 hover:scale-105 transition"
                title="Toggle theme"
            >
                {theme === "dark" ? "☀️" : "🌙"}
            </button>

        </div>

        {/* MAIN AREA */}
        {messages.length === 0 ? (

            /* 🟢 ChatGPT Home Screen */
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-white mb-6">
                    Hi 👋 How can I help you today
                </h1>
                <div className="w-full max-w-xl flex items-center gap-3 bg-white dark:bg-zinc-900 px-4 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-lg">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask anything..."
                        className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none text-sm"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-zinc-900 dark:text-white transition"
                    >
                        ➤
                    </button>
                </div>
            </div>
        ) : (
            /* 🔵 Chat Screen */
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto px-4 sm:px-10 lg:px-32 py-8 space-y-4">
                    {messages.map((m, i) => (
                    <MessageBubble key={i} {...m} />
                    ))}
                    {loading && (
                    <div className="flex items-center gap-2 text-zinc-400 text-sm animate-pulse">
                        <img src="/chatbot_logo.png" className="w-7 h-7 rounded-full" />
                        Assistant is typing...
                    </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Bottom Input */}
                <div className="p-4 border-t border-zinc-800 bg-zinc-950">
                    <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-lg">

                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask anything..."
                        className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none text-sm"
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center cursor-pointer text-zinc-900 border-zinc-900 dark:text-white transition"
                    >
                        ➤
                    </button>

                    </div>
                </div>
            </div>
        )}
        </div>
    );
}