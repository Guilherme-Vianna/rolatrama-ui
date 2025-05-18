"use client";
import { Spell } from "@/app/services/types";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import MultiCreator from "../MultiCreator";
import { Textarea } from "@/components/ui/textarea";

export default function RPGSheet3DT() {
  return (
    <Card className="w-[794] h-[1123] font-rpg">
      <div className="flex justify-center text-4xl">
        <CardTitle>Ficha de Personagem</CardTitle>
      </div>
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
              <Input className="w-2/12"></Input>
            </div>
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Habilidade</Label>
              <Input className="w-2/12"></Input>
            </div>
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Resistencia</Label>
              <Input className="w-2/12"></Input>
            </div>
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Armadura</Label>
              <Input className="w-2/12"></Input>
            </div>
            <div className="flex gap-5 justify-between border rounded-xl p-2">
              <Label className="w-10/12 text-2xl">Poder de Fogo</Label>
              <Input className="w-2/12"></Input>
            </div>
          </div>
          <div className="flex gap-5 justify-between border rounded-xl p-2">
            <Label className="w-8/12 text-xl">Pontos de Vida</Label>
            <div className="flex w-4/12">
              <Input></Input>
              <Input></Input>
            </div>
          </div>
          <div className="flex gap-5 justify-between border rounded-xl p-2">
            <Label className="w-8/12 text-xl">Pontos de Magia</Label>
            <div className="flex w-4/12">
              <Input></Input>
              <Input></Input>
            </div>
          </div>
          <div className="flex gap-5 justify-between border rounded-xl p-2">
            <Label className="w-10/12 text-xl">Pontos de Experiencia</Label>
            <div className="flex w-2/12">
              <Input></Input>
            </div>
          </div>
          <MultiCreator title="Vantagens"></MultiCreator>
        </CardContent>
        <CardContent className="flex flex-col w-1/2 gap-5">
          <MultiCreator title="Tipos de Dano"></MultiCreator>
          <MultiCreator title="Magias"></MultiCreator>
          <MultiCreator title="Dinheiro e Itens"></MultiCreator>
          <CardTitle className="text-3xl">História</CardTitle>
          <Textarea></Textarea>
        </CardContent>
      </div>
    </Card>
  );
}
