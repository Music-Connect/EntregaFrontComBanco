import React from "react";

export default function ProposalCard({ item, isArtist, onAcceptDecline }) {
  // Função auxiliar para formatar moeda
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função auxiliar para formatar data
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "-";
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl hover:border-zinc-700 transition-all group relative overflow-hidden flex flex-col justify-between h-full">
      {/* Badge Status */}
      <div
        className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold rounded-bl-xl ${
          item.status === "Pendente"
            ? "bg-yellow-500/20 text-yellow-400"
            : item.status === "Aceito"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {item.status}
      </div>

      <div>
        <div className="mb-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 mb-3 flex items-center justify-center text-xl overflow-hidden">
            {item.imagem_perfil_url ? (
              <img
                src={item.imagem_perfil_url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : isArtist ? (
              "🏢"
            ) : (
              "🎵"
            )}
          </div>

          <h3
            className="font-bold text-white text-lg mb-1 truncate"
            title={item.local_evento}
          >
            {item.local_evento}
          </h3>

          <p className="text-sm text-zinc-400 flex items-center gap-1 truncate">
            {isArtist ? "De: " : "Para: "} {item.nome_outro}
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Data</span>
            <span className="text-zinc-300">
              {formatDate(item.data_evento)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Valor</span>
            <span className="text-green-400 font-bold">
              {formatCurrency(item.valor_servico)}
            </span>
          </div>
          {item.mensagem && (
            <div className="text-xs text-zinc-500 mt-2 bg-black/20 p-2 rounded italic line-clamp-2">
              "{item.mensagem}"
            </div>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-2 mt-auto">
        {isArtist && item.status === "Pendente" ? (
          <>
            <button
              onClick={() => onAcceptDecline(item.id_contrato, "Aceito")}
              className="flex-1 bg-white/5 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/50 border border-zinc-700 text-zinc-300 py-2 rounded-lg text-xs font-bold transition-all"
            >
              {" "}
              Aceitar
            </button>
            <button
              onClick={() => onAcceptDecline(item.id_contrato, "Recusado")}
              className="flex-1 bg-white/5 hover:bg-zinc-800 hover:text-white border border-zinc-700 text-zinc-400 py-2 rounded-lg text-xs font-bold transition-all"
            >
              Recusar
            </button>
          </>
        ) : (
          <div className="w-full text-center py-2 text-xs font-bold text-zinc-500 border border-zinc-800 rounded-lg">
            {item.status === "Pendente"
              ? "Aguardando resposta"
              : `Finalizado (${item.status})`}
          </div>
        )}
      </div>
    </div>
  );
}
