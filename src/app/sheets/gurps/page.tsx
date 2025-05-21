import RPGSheet3DT from "@/app/components/sheets/RPGSheet3DT";
import TopBar from "@/app/components/TopBar";

export default function Page() {
  return (
    <main className="container mx-auto py-8 ">
      <TopBar></TopBar>
      <div className="flex justify-center">
        <RPGSheet3DT id={841} />
      </div>
    </main>
  );
}
