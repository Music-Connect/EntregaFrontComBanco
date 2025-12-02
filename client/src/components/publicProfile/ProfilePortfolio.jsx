import React from "react";

// Mock de dados (poderia vir via props também)
const mockPosts = [1, 2, 3, 4];

export default function ProfilePortfolio() {
  return (
    <div>
      <h3 className="font-bold text-white mb-6 border-b border-zinc-800 pb-2">
        Portfólio / Destaques
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockPosts.map((i) => (
          <div
            key={i}
            className="aspect-video bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-600"
          >
            Mídia do Usuário
          </div>
        ))}
      </div>
    </div>
  );
}
