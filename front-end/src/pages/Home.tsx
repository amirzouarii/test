

import { Button } from "../components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"

import '../App.css'
import { useNavigate } from "react-router-dom";

function Home() {
  
 const navigate = useNavigate();
  return (
   <div>
       <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
     <header className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
        <img src="/src/assets/bot.png" alt="" />
      </div>
      <span className="font-semibold text-lg text-foreground hidden sm:inline">ChatBot</span>
    </div>
    
    <div className="flex items-center gap-3">
      <Button 
        variant="ghost" 
        className="text-foreground hover:bg-primary/10 bg-cyan-300"  
        onClick={() => navigate("/login")}
      >
        Sign In
      </Button> 
      
      <Button
        variant="ghost"
        className="text-foreground hover:bg-primary/10 bg-cyan-300"
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
    </div>
  </div>
</header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight text-foreground text-cyan-500 mb-10 ">
                Chat with Intelligence
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-md leading-relaxed">
                Experience the future of conversations with our AI-powered chatbot. Fast, smart, and always here to
                help.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="bg-cyan-300 ml-32 hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                Start Chatting
                <ArrowRight className="w-5 h-5" />
              </Button>
              
            </div>
          </div>

          {/* Right Visual - Chat Preview */}
          <div className="relative h-96 sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-card via-card to-primary/10 rounded-2xl border border-border/40 backdrop-blur shadow-2xl overflow-hidden">
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 flex flex-col gap-4 py-6 overflow-y-auto scrollbar-hide">
                <div className="flex gap-2 max-w-xs">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                  
                  <div className="bg-slate-200 text-card-foreground px-4 py-2 rounded-lg text-sm">
                    <p>Hello! How can I assist you today?</p>
                  </div>
                </div>

                <div className="flex gap-2 max-w-xs ml-auto">
                  <div className="bg-slate-400 text-primary-foreground px-4 py-2 rounded-lg text-sm">
                    <p>I need help with my project</p>
                  </div>
                </div>

                <div className="flex gap-2 max-w-xs">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                  <div className="bg-slate-200 text-card-foreground px-4 py-2 rounded-lg text-sm">
                    <p>I'd be happy to help! Tell me more...</p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex gap-2 pt-4 border-t border-border/40">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                />
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-lg transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Removed Features Section */}
      {/* Removed CTA Section */}
      {/* Removed Footer */}
    </main>


    {/* Features Section */}
      <section className="py-16 sm:py-20 bg-card/50 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance text-cyan-500">Why Choose Our ChatBot</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to enhance your productivity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl bg-background border border-cyan-400 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Instant Responses</h3>
              <p className="text-muted-foreground">Get answers in seconds with our lightning-fast AI processing</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl bg-background border border-cyan-400 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">Your conversations are encrypted and kept completely private</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl bg-background border border-cyan-400 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Learning</h3>
              <p className="text-muted-foreground">Our AI learns from interactions to provide better responses</p>
            </div>
          </div>
        </div>
      </section>


      <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 ChatBot. All rights reserved.</p>
          
          </div>

   </div>
  )
}

export default Home
