import React, { useState } from 'react';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  Share2, 
  Bookmark, 
  X,
  ChevronRight,
  ChevronLeft,
  ShoppingBag
} from 'lucide-react';
import { INSTAGRAM_POSTS, INSTAGRAM_STORIES, SHOP_INFO, InstagramStory } from '../data/stationeryData';

interface InstagramSectionProps {
  onSelectCategory?: (cat: any) => void;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ onSelectCategory }) => {
  const [likesState, setLikesState] = useState<Record<string, { count: number; isLiked: boolean }>>(() => {
    const initial: Record<string, { count: number; isLiked: boolean }> = {};
    INSTAGRAM_POSTS.forEach((p) => {
      initial[p.id] = { count: p.likes, isLiked: false };
    });
    return initial;
  });

  const [activeStory, setActiveStory] = useState<InstagramStory | null>(null);

  const toggleLike = (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikesState((prev) => {
      const current = prev[postId] || { count: 100, isLiked: false };
      return {
        ...prev,
        [postId]: {
          count: current.isLiked ? current.count - 1 : current.count + 1,
          isLiked: !current.isLiked,
        },
      };
    });
  };

  const handleStoryClick = (story: InstagramStory) => {
    setActiveStory(story);
  };

  const handleNextStory = () => {
    if (!activeStory) return;
    const currentIndex = INSTAGRAM_STORIES.findIndex((s) => s.id === activeStory.id);
    if (currentIndex < INSTAGRAM_STORIES.length - 1) {
      setActiveStory(INSTAGRAM_STORIES[currentIndex + 1]);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrevStory = () => {
    if (!activeStory) return;
    const currentIndex = INSTAGRAM_STORIES.findIndex((s) => s.id === activeStory.id);
    if (currentIndex > 0) {
      setActiveStory(INSTAGRAM_STORIES[currentIndex - 1]);
    }
  };

  return (
    <section id="instagram" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#E07A5F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Instagram Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            
            {/* Left: Avatar + Bio */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Instagram Ring Avatar */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-0.5 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=300&q=80"
                    alt={SHOP_INFO.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute bottom-0 right-0 bg-[#E07A5F] text-white p-1 rounded-full shadow-xs border-2 border-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bio & Details */}
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-display text-2xl font-black text-[#2E282A]">
                    {SHOP_INFO.name}
                  </h3>
                  <div className="inline-flex items-center gap-1 text-[#0095F6] text-xs font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-[#0095F6] text-white" />
                    <span>Oficial</span>
                  </div>
                </div>

                <a
                  href={SHOP_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-[#E07A5F] hover:underline block"
                >
                  {SHOP_INFO.handle}
                </a>

                <p className="text-xs text-[#2E282A]/80 leading-relaxed">
                  ✨ <strong>Papelería Creativa & Recuerdos Únicos en Paraguay 🇵🇾</strong><br />
                  🤰 Biblioratos Prenatales A4 • 🍼 Agendas Pediátricas MSPBS<br />
                  🎨 Libritos para Pintar Souvenir • 📖 Planners & Recetarios<br />
                  📦 Envíos a todo el país vía AEX / NSA • Delivery Asunción y Gran Asunción
                </p>

                {/* Follower Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-6 pt-2 text-xs text-[#2E282A]">
                  <div>
                    <strong className="font-bold text-[#2E282A] text-sm block">{SHOP_INFO.stats.posts}</strong>
                    <span className="text-[#2E282A]/60 text-[11px]">publicaciones</span>
                  </div>
                  <div className="h-6 w-px bg-[#E8E2D9]" />
                  <div>
                    <strong className="font-bold text-[#2E282A] text-sm block">{SHOP_INFO.stats.followers}</strong>
                    <span className="text-[#2E282A]/60 text-[11px]">seguidores</span>
                  </div>
                  <div className="h-6 w-px bg-[#E8E2D9]" />
                  <div>
                    <strong className="font-bold text-[#2E282A] text-sm block">{SHOP_INFO.stats.happyClients}</strong>
                    <span className="text-[#2E282A]/60 text-[11px]">pedidos felices</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
              <a
                href={SHOP_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#E07A5F] via-[#D46A4E] to-[#C8593D] hover:opacity-95 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir en Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent("¡Hola Sus Creaciones! Vi sus trabajos en Instagram y quiero hacer un pedido 🇵🇾✨")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-[#E8E2D9] text-[#2E282A] border border-[#E8E2D9] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>Consultar al WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Stories Highlights Carousel */}
          <div className="mt-8 pt-6 border-t border-[#E8E2D9]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#2E282A]/60 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#E07A5F]" />
              <span>Historias Destacadas (Tocá para ver):</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
              {INSTAGRAM_STORIES.map((story) => (
                <button
                  key={story.id}
                  onClick={() => handleStoryClick(story)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
                >
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-0.5 overflow-hidden relative">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover rounded-full group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-lg">
                        {story.icon}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#2E282A] group-hover:text-[#E07A5F] max-w-[70px] truncate text-center">
                    {story.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Section Heading for the Feed */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E2D9] text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.25em] mb-2 shadow-2xs">
              <Instagram className="w-3.5 h-3.5" />
              <span>Feed & Novedades Diarias</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#2E282A]">
              Últimas Creaciones en el Taller
            </h2>
            <p className="text-xs sm:text-sm text-[#2E282A]/70 mt-1">
              Directo desde nuestro feed de Instagram @suscreaciones_py. Hacé clic para pedir este mismo modelo por WhatsApp.
            </p>
          </div>

          <a
            href={SHOP_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#E07A5F] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Ver todas las publicaciones</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Instagram 8 Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post) => {
            const likeInfo = likesState[post.id] || { count: post.likes, isLiked: false };

            return (
              <div
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8E2D9] hover:border-[#E07A5F]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Post Top Bar: User header */}
                <div className="p-3 flex items-center justify-between border-b border-[#FAF8F5]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#E07A5F]/20 p-0.5 flex items-center justify-center font-bold text-xs text-[#E07A5F]">
                      ✨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#2E282A] block leading-tight">
                        suscreaciones_py
                      </span>
                      <span className="text-[10px] text-[#2E282A]/60 block leading-tight">
                        Asunción, Paraguay
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#E07A5F] bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#E8E2D9]">
                    {post.tag}
                  </span>
                </div>

                {/* Post Image */}
                <div className="relative aspect-square overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Quick Order Badge on hover */}
                  <a
                    href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent(`¡Hola Sus Creaciones! Me encantó esta publicación de Instagram (${post.tag}): "${post.caption}". ¿Podrían pasarme presupuesto y disponibilidad? ✨`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 bg-[#2E282A]/90 hover:bg-[#E07A5F] backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transition-all opacity-90 group-hover:opacity-100"
                  >
                    <Send className="w-3 h-3 text-emerald-400" />
                    <span>Pedir este modelo</span>
                  </a>
                </div>

                {/* Post Actions Bar */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Interactive Heart Like Button */}
                      <button
                        onClick={(e) => toggleLike(e, post.id)}
                        className="flex items-center gap-1 text-xs font-bold transition-transform active:scale-125 cursor-pointer"
                        title="Me gusta"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            likeInfo.isLiked
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-[#2E282A] hover:text-rose-500'
                          }`}
                        />
                        <span className={likeInfo.isLiked ? 'text-rose-500 font-bold' : 'text-[#2E282A]/80'}>
                          {likeInfo.count}
                        </span>
                      </button>

                      {/* Comments */}
                      <a
                        href={SHOP_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-[#2E282A]/80 hover:text-[#E07A5F]"
                        title="Comentarios"
                      >
                        <MessageCircle className="w-5 h-5 text-[#2E282A]" />
                        <span>{post.comments}</span>
                      </a>

                      {/* Share link to Instagram */}
                      <a
                        href={SHOP_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2E282A]/80 hover:text-[#E07A5F]"
                        title="Ver en Instagram"
                      >
                        <Share2 className="w-4 h-4" />
                      </a>
                    </div>

                    <Bookmark className="w-4 h-4 text-[#2E282A]/40 hover:text-[#2E282A] cursor-pointer" />
                  </div>

                  {/* Caption */}
                  <p className="text-xs text-[#2E282A]/80 leading-relaxed line-clamp-3">
                    <strong className="text-[#2E282A] mr-1 font-bold">suscreaciones_py</strong>
                    {post.caption}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px]">
                    <span className="text-[#2E282A]/50 uppercase tracking-wider font-semibold">
                      Hecho a mano 🇵🇾
                    </span>
                    <a
                      href={SHOP_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E07A5F] font-bold hover:underline"
                    >
                      Ver en Instagram →
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-2xl border border-white/20 text-white animate-scale-up">
            
            {/* Top Progress Line */}
            <div className="p-3 pb-0">
              <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-full animate-progress" />
              </div>
            </div>

            {/* Story Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-rose-500">
                  <img
                    src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=200&q=80"
                    alt={SHOP_INFO.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold block leading-tight">suscreaciones_py</span>
                  <span className="text-[10px] text-white/60 block">{activeStory.title}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveStory(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Content Image */}
            <div className="relative aspect-4/5 bg-black overflow-hidden">
              <img
                src={activeStory.imageUrl}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation arrows */}
              <button
                onClick={handlePrevStory}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextStory}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Story Description Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-8 text-center space-y-3">
                <div className="text-2xl">{activeStory.icon}</div>
                <h4 className="font-display text-lg font-bold">{activeStory.title}</h4>
                <p className="text-xs text-white/85 leading-relaxed">{activeStory.description}</p>

                <div className="flex gap-2 pt-1 justify-center">
                  <a
                    href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent(`¡Hola Sus Creaciones! Vi su historia destacada de "${activeStory.title}" y quiero hacer una consulta ✨`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#E07A5F] hover:bg-[#D46A4E] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Pedir por WhatsApp</span>
                  </a>

                  {activeStory.ctaCategory && onSelectCategory && (
                    <button
                      onClick={() => {
                        onSelectCategory(activeStory.ctaCategory);
                        setActiveStory(null);
                        const el = document.getElementById('catalogo');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Ver en Catálogo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
