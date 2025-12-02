import React from "react";

export default function ProfileHeader({ user, isContractor, onOpenProposal }) {
  const themeColor = user.cor_tema || "#ec4899";
  const bannerColor = user.cor_banner || "#18181b";
  const isArtistProfile = user.tipo_usuario === "artista";

  return (
    <div className="relative">
      {/* Banner */}
      <div
        className="h-80 w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(to right, #000000, ${bannerColor})`,
        }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent"></div>
      </div>

      {/* Info Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative -mt-20 flex flex-col md:flex-row items-end gap-8 pb-8 border-b border-zinc-800">
        {/* Avatar */}
        <div
          className="w-40 h-40 rounded-full p-1 shadow-2xl relative z-10"
          style={{
            background: `linear-gradient(to top right, #333, ${themeColor})`,
          }}
        >
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-4xl font-bold text-white border-4 border-black">
            {user.usuario ? user.usuario.substring(0, 2).toUpperCase() : "??"}
          </div>
        </div>

        {/* Textos e Botões */}
        <div className="flex-1 mb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-white mb-1">
                {user.usuario}
              </h1>
              <p className="text-zinc-400 text-sm flex items-center gap-2">
                {isArtistProfile ? "🎵 Artista" : "🏢 Contratante"}
                <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                {user.local_atuacao || "Local não informado"}
              </p>
            </div>

            <div className="flex gap-3">
              {isContractor && isArtistProfile && (
                <button
                  onClick={onOpenProposal}
                  className="px-8 py-2.5 rounded-full text-black font-bold text-sm hover:opacity-90 transition shadow-lg"
                  style={{ backgroundColor: themeColor }}
                >
                  Enviar Proposta
                </button>
              )}
              <button className="px-4 py-2 rounded-full border border-zinc-700 hover:text-white transition text-zinc-300">
                Mensagem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
