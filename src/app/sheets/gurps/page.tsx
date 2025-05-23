import GURPSSheet from "@/app/components/sheets/GURPSheet";
import TopBar from "@/app/components/TopBar";

export default function Page() {
  return (
    <main className="container mx-auto py-8 ">
      <TopBar></TopBar>
      <div className="flex justify-center">
        <GURPSSheet id={841} />
      </div>
    </main>
  );
}
