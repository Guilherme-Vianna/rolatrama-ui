export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export type MultiCreatorProps = {
  title: string;
};

export type RPGSheet3DTModel = {
  forca: string;
  habilidade: string;
  resistencia: string;
  armadura: string;
  poder_de_fogo: string;
  pontos_de_vida: string;
  pontos_de_vida_atual: string;
  pontos_de_magia: string;
  pontos_de_magia_atual: string;
  pontos_de_experiencia: string;
  tipos_de_dano: string[];
  magias: string[];
  dinheiro_e_itens: string[];
  historia: string;
  vantagens: string[];
};


export type Spell = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Npc = {
  id: number;
  townId: number;
  town: Town;
  name: string;
  race: string;
  age: string;
  description: string;
  ocupation: string;
  history: string;
  interest: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Town = {
  id: number;
  name: string;
  size: string;
  whether: string;
  history: string;
  locationDescription: string;
  economy: string;
  criminality: string;
  createdAt: string;
  updatedAt: string;
  locations: Location[];
  npcs: Npc[];
};

export type Location = {
  id: number;
  name: string;
  description: string;
};

