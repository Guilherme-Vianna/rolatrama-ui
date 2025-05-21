"use client";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiCreator from "../MultiCreator";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { RPGSheet3DTModel } from "@/app/services/types";
import { api } from "@/app/services/api";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RPGSheet3DT(params: any) {
  const [syncStatus, setSyncStatus] = useState("syncing");
  const [sheet, setSheet] = useState<RPGSheet3DTModel>({
    forca: "",
    habilidade: "",
    resistencia: "",
    armadura: "",
    poder_de_fogo: "",
    pontos_de_vida: "",
    pontos_de_vida_atual: "",
    pontos_de_magia: "",
    pontos_de_magia_atual: "",
    pontos_de_experiencia: "",
    tipos_de_dano: [],
    magias: [],
    dinheiro_e_itens: [],
    historia: "",
    vantagens: [],
  });

  const handleChange =
    (field: keyof RPGSheet3DTModel) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSheet((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleArrayChange = (
    field: keyof RPGSheet3DTModel,
    value: string[]
  ) => {
    setSheet((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const loadFromDatabase = async () => {
      const result = await api.getSheet(params.id);
      console.log("SHEET" + result);
      setSheet(result);
    };
    loadFromDatabase();
  }, []);

  useEffect(() => {
    const saveToDatabase = async () => {
      try {
        setSyncStatus("syncing");
        await api.updateSheet(sheet, params.id);
        setSyncStatus("success");
      } catch {
        setSyncStatus("failed");
      }
    };
    const timeout = setTimeout(saveToDatabase, 500);
    return () => clearTimeout(timeout);
  }, [sheet, params.id]);

  const getSyncStatus = () => {
    switch (syncStatus) {
      case "syncing":
        return (
          <div className="flex items-center justify-center  gap-2 text-blue-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-2xl">Sincronizando...</span>
          </div>
        );
      case "success":
        return (
          <div className="flex items-center justify-center  gap-2 text-green-500">
            <CheckCircle className="h-4 w-4" />
            <span className="text-2xl">Salvo</span>
          </div>
        );
      case "error":
        return (
          <Alert variant="destructive" className="p-2">
            <div className="flex items-center justify-center  gap-2">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="text-2xl">
                Erro ao salvar
              </AlertDescription>
            </div>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-[794] h-[1123] font-rpg">
      <div className="flex justify-center text-4xl">
        <CardTitle>Ficha de Personagem</CardTitle>
      </div>
      {getSyncStatus()}
      <CardContent className="flex gap-5">
        <Label>Nome</Label>
        <Input className="w-11/12"></Input>
        <Input className="w-1/12"></Input>
        <Label>Pontos</Label>
      </CardContent>
      <div className="flex">
        <CardContent className="flex flex-col w-1/2 gap-5">
          <CardTitle className="text-3xl">Caracteristicas</CardTitle>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Forca</Label>
              <Input
                value={sheet.forca}
                className="w-2/12 text-center"
                onChange={handleChange("forca")}
              ></Input>
            </div>
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Habilidade</Label>
              <Input
                className="w-2/12 text-center"
                value={sheet.habilidade}
                onChange={handleChange("habilidade")}
              ></Input>
            </div>
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Resistencia</Label>
              <Input
                className="w-2/12 text-center"
                value={sheet.resistencia}
                onChange={handleChange("resistencia")}
              ></Input>
            </div>
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Armadura</Label>
              <Input
                className="w-2/12 text-center"
                value={sheet.armadura}
                onChange={handleChange("armadura")}
              ></Input>
            </div>
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Poder de Fogo</Label>
              <Input
                className="w-2/12 text-center"
                value={sheet.poder_de_fogo}
                onChange={handleChange("poder_de_fogo")}
              ></Input>
            </div>
          </div>
          <div className="flex gap-5 justify-between border rounded-xl p-2">
            <Label className="w-8/12 text-xl">Pontos de Vida</Label>
            <div className="flex w-4/12">
              <Input
                value={sheet.pontos_de_vida_atual}
                onChange={handleChange("pontos_de_vida_atual")}
              ></Input>
              <Input
                value={sheet.pontos_de_vida}
                onChange={handleChange("pontos_de_vida")}
              ></Input>
            </div>
          </div>
          <div className="flex gap-5 justify-between border rounded-xl p-2">
            <Label className="w-8/12 text-xl">Pontos de Magia</Label>
            <div className="flex w-4/12">
              <Input
                value={sheet.pontos_de_magia_atual}
                onChange={handleChange("pontos_de_magia_atual")}
              ></Input>
              <Input
                value={sheet.pontos_de_magia}
                onChange={handleChange("pontos_de_magia")}
              ></Input>
            </div>
          </div>
          <div className="flex gap-5 justify-between border rounded-xl p-2">
            <Label className="w-10/12 text-xl">Pontos de Experiencia</Label>
            <div className="flex w-2/12 text-center">
              <Input
                value={sheet.pontos_de_experiencia}
                onChange={handleChange("pontos_de_experiencia")}
              ></Input>
            </div>
          </div>
          <MultiCreator title="Vantagens"></MultiCreator>
        </CardContent>
        <CardContent className="flex flex-col w-1/2 gap-5">
          <MultiCreator title="Tipos de Dano"></MultiCreator>
          <MultiCreator title="Magias"></MultiCreator>
          <MultiCreator title="Dinheiro e Itens"></MultiCreator>
          <CardTitle className="text-3xl">História</CardTitle>
          <Textarea
            value={sheet.historia}
            onChange={handleChange("historia")}
          ></Textarea>
        </CardContent>
      </div>
    </Card>
  );
}
