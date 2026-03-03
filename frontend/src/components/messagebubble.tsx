import type { Message } from "../types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ role, content }: Message) {
    const isUser = role === "user";

    return (
        <div
            className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
        >
            {!isUser && (
                <img
                src="/chatbot_logo.png"
                className="w-9 h-9 rounded-full border border-zinc-700"
                />
            )}

            <div
                className={`
                max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow
                ${isUser
                    ? "bg-indigo-600 text-white rounded-br-md"
                    : "bg-zinc-800 text-white rounded-bl-md"
                }
                `}
            >
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: ({ children }) => (
                            <table className="border border-zinc-600 border-collapse my-2 w-full">
                                {children}
                            </table>
                        ),
                        th: ({ children }) => (
                        <th className="border border-zinc-600 px-2 py-1 bg-zinc-700 text-left">
                            {children}
                        </th>
                        ),
                        td: ({ children }) => (
                        <td className="border border-zinc-600 px-2 py-1">
                            {children}
                        </td>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {isUser && (
                <img
                    src="/user.png"
                    className="w-9 h-9 rounded-full border border-zinc-700"
                />
            )}
        </div>
    );
}