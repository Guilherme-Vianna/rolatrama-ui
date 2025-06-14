import TopBar from "@/app/components/TopBar";
import GameComponent from "@/app/components/games/GameComponent";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    return (
        <main className="container mx-auto py-8">
            <TopBar/>
            <GameComponent id={id}/>
        </main>
    );
}