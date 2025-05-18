import { Button } from "@/components/ui/button";
import { CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { MultiCreatorProps } from "../services/types";

export default function MultiCreator(props: MultiCreatorProps) {
  const [damageType, setDamageType] = useState<string[]>([]);
  const [addingDamageType, setAddingDamageType] = useState(false);
  const [newDamageType, setNewDamageType] = useState("");

  function addDamageType(newSpell: any) {
    setDamageType([...damageType, newSpell]);
    setNewDamageType("");
    setAddingDamageType(false);
  }

  return (
    <>
      <CardTitle className="text-3xl">{props.title}</CardTitle>
      <ScrollArea className="h-[100px] w-full rounded-md border p-4 overflow-y-scroll overflow-x-hidden">
        {damageType.map((damageType: string, index: number) => (
          <div key={index} className="text-xl py-2">
            {damageType}
          </div>
        ))}
      </ScrollArea>
      {addingDamageType === true ? (
        <div className="flex flex-col gap-2">
          <Label>Nome</Label>
          <Input
            value={newDamageType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewDamageType(e.target.value)
            }
          />
          <Button
            className="bg-green-500 text-black font-bold"
            onClick={() => addDamageType(newDamageType)}
          >
            Adicionar
          </Button>
          <Button
            className="bg-red-500 text-black font-bold"
            onClick={() => {
              setAddingDamageType(false);
            }}
          >
            Cancelar
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <CardContent></CardContent>
          <Button
            className="font-bold"
            onClick={() => {
              setAddingDamageType(true);
            }}
          >
            Adicionar {props.title}
          </Button>
        </div>
      )}
    </>
  );
}
