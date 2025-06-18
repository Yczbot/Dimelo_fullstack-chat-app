import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-base-100/50 backdrop-blur-sm">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center 
            animate-bounce shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-base-content">Welcome to Dimelo 👋</h2>
        <p className="text-base text-base-content/70 leading-relaxed">
          Select a chat from the sidebar or start a new conversation to begin messaging.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
