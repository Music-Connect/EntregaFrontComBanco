import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileAgenda({ userId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/users/${userId}/agenda`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Erro ao carregar agenda", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchAgenda();
  }, [userId]);

  // Função auxiliar para formatar data (Dia e Mês)
  const getDateParts = (dateString) => {
    const date = new Date(dateString);
    // Ajuste de fuso horário simples para exibir corretamente
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

    return {
      day: adjustedDate.getDate(),
      month: adjustedDate
        .toLocaleString("pt-BR", { month: "short" })
        .toUpperCase(),
      year: adjustedDate.getFullYear(),
      full: adjustedDate.toLocaleDateString("pt-BR"),
    };
  };

  if (loading)
    return (
      <div className="text-zinc-500 text-center py-10">
        Carregando agenda...
      </div>
    );

  if (events.length === 0) {
    return (
      <div className="text-center py-16 bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed">
        <p className="text-zinc-400 font-medium">
          Nenhum evento confirmado na agenda.
        </p>
        <p className="text-zinc-600 text-sm mt-1">
          Os eventos aceitos aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="font-bold text-white mb-4 text-xl">Próximos Shows</h3>

      {events.map((event) => {
        const { day, month, full } = getDateParts(event.data_evento);

        return (
          <div
            key={event.id_contrato}
            className="flex items-center gap-6 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:border-pink-500/50 transition group"
          >
            {/* Bloco da Data */}
            <div className="flex flex-col items-center justify-center bg-black border border-zinc-700 w-16 h-16 rounded-lg group-hover:border-pink-500 transition">
              <span className="text-xs font-bold text-zinc-500 uppercase">
                {month}
              </span>
              <span className="text-2xl font-black text-white">{day}</span>
            </div>

            {/* Detalhes do Evento */}
            <div className="flex-1">
              <h4 className="font-bold text-lg text-white group-hover:text-pink-400 transition">
                {event.local_evento}
              </h4>
              <p className="text-zinc-400 text-sm flex items-center gap-2">
                📅 {full}
                <span className="w-1 h-1 rounded-full bg-zinc-600"></span>✅
                Confirmado
              </p>
            </div>

            {/* Botão (Opcional, ex: Comprar Ingresso) */}
            <div className="hidden sm:block">
              <button className="text-xs font-bold border border-zinc-700 text-zinc-300 px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
                Detalhes
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
