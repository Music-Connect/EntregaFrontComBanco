import React from "react";

export default function ProposalModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  onChange,
  themeColor,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Nova Proposta</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 uppercase font-bold block mb-1">
              Nome do Evento
            </label>
            <input
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-white transition"
              required
              value={form.evento}
              onChange={(e) => onChange({ ...form, evento: e.target.value })}
              placeholder="Ex: Festival de Verão"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase font-bold block mb-1">
                Data
              </label>
              <input
                type="date"
                className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-white transition"
                required
                value={form.data_evento}
                onChange={(e) =>
                  onChange({ ...form, data_evento: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase font-bold block mb-1">
                Valor (R$)
              </label>
              <input
                type="number"
                className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-white transition"
                required
                value={form.valor}
                onChange={(e) => onChange({ ...form, valor: e.target.value })}
                placeholder="0,00"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase font-bold block mb-1">
              Local
            </label>
            <input
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-white transition"
              required
              value={form.local}
              onChange={(e) => onChange({ ...form, local: e.target.value })}
              placeholder="Cidade, Endereço..."
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase font-bold block mb-1">
              Mensagem
            </label>
            <textarea
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-white transition resize-none h-24"
              value={form.mensagem}
              onChange={(e) => onChange({ ...form, mensagem: e.target.value })}
              placeholder="Detalhes adicionais sobre o evento..."
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-zinc-700 text-zinc-300 font-bold hover:bg-zinc-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl text-black font-bold hover:opacity-90 transition shadow-lg"
              style={{ backgroundColor: themeColor }}
            >
              Enviar Proposta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
