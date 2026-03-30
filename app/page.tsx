import { HomePage } from "@/components/weather/home";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center  font-sans ">
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-center  py-32 px-1.5 md:px-6   sm:items-start">
        <HomePage />
      </main>
    </div>
  );
}
