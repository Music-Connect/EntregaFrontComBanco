import React from "react";

export default function ProfileAbout({ user }) {
  return (
    <div className="space-y-8">
      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl">
        <h3 className="font-bold text-white mb-4">Sobre</h3>
        <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
          {user.descricao || "Sem descrição."}
        </p>
      </div>

      <div className="space-y-3">
        <InfoItem icon="📧" label="Email" value={user.email} />
        <InfoItem icon="📱" label="Telefone" value={user.telefone || "-"} />
        {user.organizacao && (
          <InfoItem icon="🏢" label="Empresa" value={user.organizacao} />
        )}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-2 hover:bg-zinc-800/50 rounded-lg transition overflow-hidden">
      <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
          {label}
        </p>
        <p className="text-sm text-zinc-300 truncate">{value}</p>
      </div>
    </div>
  );
}
