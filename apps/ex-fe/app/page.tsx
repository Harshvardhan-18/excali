import {
  Pencil,
  Share2,
  Users2,
  Sparkles,
  Github,
  Download,
  ArrowRight,
  Play,
} from "lucide-react";
import Link from "next/link";

function App() {
  const features = [
    {
      icon: Share2,
      title: "Real-time Collaboration",
      description:
        "Work together with your team in real-time. Share your drawings instantly with a simple link.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users2,
      title: "Multiplayer Editing",
      description:
        "Multiple users can edit the same canvas simultaneously. See who's drawing what in real-time.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Sparkles,
      title: "Smart Drawing",
      description:
        "Intelligent shape recognition and drawing assistance helps you create perfect diagrams.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse [animation-delay:4s]"></div>
      </div>

      {/* Hero Section */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Now with AI-powered features
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                Collaborative
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Whiteboarding
              </span>
              <br />
              <span className="text-white text-4xl sm:text-5xl">
                Made Simple
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300 leading-relaxed">
              Create, collaborate, and share beautiful diagrams and sketches
              with our intuitive drawing tool. Experience the future of visual
              collaboration.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <Pencil className="w-5 h-5 mr-2" />
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <Link href={"/signup"}>
              <button
                className="px-8 py-4 bg-white/10 cursor-pointer backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                Sign Up
              </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                collaborate
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful features designed to make visual collaboration effortless
              and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 p-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600"></div>
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl p-12 sm:p-20">
              <div className="text-center">
                <h2 className="text-4xl sm:text-6xl font-bold text-white mb-8">
                  Ready to start
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {" "}
                    creating?
                  </span>
                </h2>

                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                  Join thousands of creators, designers, and teams who are
                  already building amazing things together.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 text-lg">
                    <div className="flex items-center">
                      <Pencil className="w-6 h-6 mr-3" />
                      Open Canvas
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 text-lg">
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-slate-400">
              © 2024 Excalidraw Clone. Crafted with ❤️ for creators.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com"
                className="text-slate-400 hover:text-cyan-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Download className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
