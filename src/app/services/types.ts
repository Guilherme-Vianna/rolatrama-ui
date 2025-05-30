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


export type RPGSheetGURPSPericia = {
    name: string;
    pontos: string;
    nh: string;
    nh_relativo: string;
};

export type RPGSheetCulture = {
    name: string;
    pontos: string;
};

export type RPGSheetGURPSLanguages = {
    name: string;
    falada: string;
    escrita: string;
    pontos: string;
};

export type IMiniInputProps = {
    title: string,
    size : number,
    quantity: number,
    mainValue : any,
    miniValues? : any,
    onValueChange : any,
    fieldName : any,
}

export default interface IListProps {
    onValueChange: any;
    value: any;
    fieldName: string;
}

export type RPGSheetGURPSModelList = {
    id: string;
    data: RPGSheetGURPSModel;
    updatedAt: Date;
    createdAt: Date;
}

export type RPGSheetGURPSModel = {
    nome: string;
    jogador: string;
    total_de_pontos: string;
    altura: string;
    peso: string;
    mod_tamanho: string;
    idade: string;
    pontos_para_gastar: string;
    aparencia: string;
    st: string;
    st_mod: string;
    dx: string;
    dx_mod: string;
    iq: string;
    iq_mod: string;
    ht: string;
    ht_mod: string;
    pv_1: string;
    pv_2: string;
    pv_mod: string;
    vont: string;
    vont_mod: string;
    per: string;
    per_mod: string;
    pf_1: string;
    pf_2: string;
    pf_mod: string;
    base_de_carga: string;
    velocidade_basica: string;
    velocidade_basica_1: string;
    dano_gdp: string;
    geb: string;
    deslocamento_basico: string;
    deslocamento_basico_1: string;
    base_de_carga_nenhuma: string;
    base_de_carga_leve: string;
    base_de_carga_media: string;
    base_de_carga_pesada: string;
    base_de_carga_muito_pesada: string;
    db_x_1: string;
    db_x_0_8: string;
    db_x_0_6: string;
    db_x_0_4: string;
    db_x_0_2: string;
    esquiva: string;
    esquiva_minus_1: string;
    esquiva_minus_2: string;
    esquiva_minus_3: string;
    esquiva_minus_4: string;
    vantagens_e_qualidades: RPGSheetGURPSVantagemQualidade[]
    desvantagens_e_peculiaridades: RPGSheetGURPSVantagemQualidade[]
    cabeca: string;
    tronco: string;
    bracos: string;
    maos: string;
    pernas: string;
    pes: string;
    bloqueio: string;
    bloqueio_mod: string;
    aparar: string;
    aparar_mod: string;
    status: string;
    reputacao: string;
    outros: string;
    weapons: RPGSheetGURPSWeapon[];
    ranged_weapons: RPGSheetGURPSRangedWeapon[];
    armor: RPGSheetGURPSArmor[];
    languages: RPGSheetGURPSLanguages[];
    pericias: RPGSheetGURPSPericia[];
    culturas: RPGSheetCulture[];
};


export type RPGSheetGURPSVantagemQualidade = {
    name: string;
    pontos: string;
}

export type RPGSheetGURPSWeapon = {
    arma: string;
    dano: string;
    alcance: string;
    aparar: string;
    notas: string;
    custo: string;
    peso: string;
}

export type RPGSheetGURPSRangedWeapon = {
    arma: string;
    dano: string;
    prec: string;
    distancia: string;
    cdT: string;
    tiros: string;
    st: string;
    magnitude: string;
    rco: string;
    cl: string;
    notas: string;
    custo: string;
    peso: string;
}

export type RPGSheetGURPSArmor = {
    item: string;
    posicao: string;
    custo: string;
    peso: string;
}

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

