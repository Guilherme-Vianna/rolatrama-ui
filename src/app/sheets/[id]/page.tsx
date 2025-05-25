import GURPSSheet from "@/app/components/sheets/GURPSheet";
import TopBar from "@/app/components/TopBar";

export default function Page({params}: { params: { id: string } }) {
    return (
        <main className="container mx-auto py-8 ">
            <TopBar></TopBar>
            <div className="flex justify-center">
                <GURPSSheet id={params.id}/>
            </div>
        </main>
    );
}
