import GURPSSheet from "@/app/components/sheets/GURPSheet";
import TopBar from "@/app/components/TopBar";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="container mx-auto py-8 ">
            <TopBar />
            <div className="flex justify-center">
                <GURPSSheet id={id} />
            </div>
        </main>
    );
}