import React from "react";

export default function DashboardBanner({ isArtist, navigate }) {
  const bannerTitle = isArtist ? (
    <>
      Complete seu perfil para receber mais{" "}
      <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-pink-500 to-purple-500">
        Propostas
      </span>
    </>
  ) : (
    <>
      Encontre o talento ideal para o seu{" "}
      <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-pink-500 to-purple-500">
        Próximo Evento
      </span>
    </>
  );

  const bannerDesc = isArtist
    ? "Contratantes costumam fechar 3x mais negócios com artistas que possuem fotos de alta qualidade e repertório atualizado."
    : "Explore nossa base com mais de 5.000 artistas verificados e garanta a trilha sonora perfeita com segurança.";

  const bannerBtn = isArtist ? "Editar Perfil Agora" : "Buscar Artistas";
  const badgeText = isArtist ? "Dica do dia" : "Novidade";

  return (
    <div className="w-full relative h-72 rounded-3xl overflow-hidden group border border-zinc-800 mb-10">
      <div className="absolute inset-0 bg-linear-to-r from-zinc-900 to-black"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 h-full flex flex-col justify-center p-10">
        <span className="text-yellow-300 font-bold tracking-wider text-xs mb-3 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></span>
          {badgeText}
        </span>
        <h1 className="text-4xl font-black text-white mb-4 leading-tight max-w-lg">
          {bannerTitle}
        </h1>
        <p className="text-zinc-400 text-sm max-w-md mb-8">{bannerDesc}</p>
        <div>
          <button
            onClick={() =>
              isArtist ? navigate("/profile") : navigate("/explore")
            }
            className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors"
          >
            {bannerBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
