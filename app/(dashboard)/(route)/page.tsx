import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Contenu principal</h1>
      <p>Cliquez sur l'icône de menu pour ouvrir/fermer la barre latérale.</p>
      <p className="text-2xl font-bold text-sky-500">
        This is a protected page
      </p>
    </div>
  );
}
