export interface Departamento {
  id: string;
  nome: string;
}

export interface Responsavel {
  id: string;
  nome: string;
  departamentoId: string;
}

// Definição dos departamentos
export const DEPARTAMENTOS: Departamento[] = [
  { id: "comercial", nome: "Comercial" },
  { id: "engenharia", nome: "Engenharia" },
  { id: "marketing", nome: "Marketing" },
  { id: "suporte", nome: "Suporte" },
];

// Definição dos responsáveis
export const RESPONSAVEIS: Responsavel[] = [
  { id: "joao", nome: "João", departamentoId: "comercial" },
  { id: "maria", nome: "Maria", departamentoId: "engenharia" },
  { id: "pedro", nome: "Pedro", departamentoId: "marketing" },
  { id: "ana", nome: "Ana", departamentoId: "suporte" },
];

// Função para obter departamento pelo responsável
export function getDepartamentoByResponsavel(responsavel: string): Departamento | undefined {
  const responsavelObj = RESPONSAVEIS.find(r => 
    r.nome.toLowerCase() === responsavel.toLowerCase() || 
    r.id.toLowerCase() === responsavel.toLowerCase()
  );
  
  if (!responsavelObj) return undefined;
  
  return DEPARTAMENTOS.find(d => d.id === responsavelObj.departamentoId);
}