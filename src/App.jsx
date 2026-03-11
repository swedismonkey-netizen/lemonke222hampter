import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, Play, Info, X, Filter, TrendingUp, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-morphism border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
            <div className="p-2 bg-neon-green rounded-lg">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-display font-bold tracking-tighter">
              UNBLOCKED<span className="text-neon-green">HUB</span>
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-neon-green/50 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-neon-green transition-colors">Trending</a>
            <a href="#" className="hover:text-neon-green transition-colors">New</a>
            <a href="#" className="hover:text-neon-green transition-colors">Popular</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {!searchQuery && selectedCategory === 'All' && (
        <header className="relative py-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.05)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight"
            >
              PLAY WITHOUT <span className="text-neon-green italic">LIMITS</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg max-w-2xl mx-auto mb-10"
            >
              The ultimate collection of unblocked games for school, work, or home. 
              No downloads, no blocks, just pure fun.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {gamesData.length > 0 && (
                <button 
                  onClick={() => setSelectedGame(gamesData[0])}
                  className="bg-neon-green text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Play className="w-5 h-5 fill-current" /> Play Featured
                </button>
              )}
              <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                Browse All
              </button>
            </motion.div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        {/* Category Filters */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          <Filter className="w-5 h-5 text-neon-green shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                ? 'bg-neon-green text-black' 
                : 'bg-white/5 border border-white/10 hover:border-neon-green/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 game-card-hover cursor-pointer"
              onClick={() => setSelectedGame(game)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-neon-green rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-black fill-current" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-widest text-neon-green border border-neon-green/30">
                  {game.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-neon-green transition-colors">{game.title}</h3>
                <p className="text-white/40 text-sm line-clamp-2">{game.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white/40">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs">4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">Fast</span>
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-neon-green opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white/5 rounded-full mb-6">
              <Search className="w-12 h-12 text-white/20" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-2">No games found</h3>
            <p className="text-white/40">Try searching for something else or browse categories.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-neon-green rounded">
                <Gamepad2 className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-xl font-display font-bold tracking-tighter">
                UNBLOCKED<span className="text-neon-green">HUB</span>
              </h1>
            </div>
            <p className="text-white/40 max-w-sm mb-6">
              The premier destination for unblocked web games. Built for speed, 
              simplicity, and endless entertainment.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-green hover:text-black transition-all cursor-pointer">
                <Info className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-neon-green uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Games</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-neon-green uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Report Bug</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Request Game</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-white/5 text-center text-xs text-white/20">
          © {new Date().getFullYear()} Unblocked Games Hub. All rights reserved.
        </div>
      </footer>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                    <img src={selectedGame.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold">{selectedGame.title}</h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest">{selectedGame.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Game Viewport */}
              <div className="flex-grow bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-neon-green transition-colors">
                    <Star className="w-4 h-4" /> Favorite
                  </button>
                  <button className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-neon-green transition-colors">
                    <Info className="w-4 h-4" /> Game Info
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/20">Playing on Unblocked Hub</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
