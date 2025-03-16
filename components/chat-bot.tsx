import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getChatbotResponse } from '@/lib/chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from 'next-themes';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, isStudent } = useAuth();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { content: userMessage, isUser: true, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      const response = await getChatbotResponse(userMessage);
      setMessages(prev => [...prev, { 
        content: response || 'Sorry, I could not process your request.', 
        isUser: false, 
        timestamp: new Date() 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        content: 'Sorry, something went wrong. Please try again.', 
        isUser: false, 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[500px] border rounded-lg bg-card text-card-foreground">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Sign in Required</h3>
          <p className="text-sm text-muted-foreground">Please sign in to use the chat assistant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-card">
      <div className="p-4 border-b bg-primary/5 dark:bg-primary/10">
        <h2 className="text-lg font-semibold">Travel Assistant</h2>
        <p className="text-sm text-muted-foreground">
          {isStudent ? '🎓 Student assistance enabled' : '👋 General assistance'}
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted dark:bg-muted/50'
                }`}
              >
                <div className="break-words">{message.content}</div>
                <div className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted dark:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} size="icon">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
} 