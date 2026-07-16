export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  category: keyof CategoryScores;
  categoryName: string;
  helperText?: string;
  options: Option[];
}

export interface CategoryScores {
  atendimentoComunicacao: number;
  presencaDigital: number;
  marketingAnuncios: number;
  processoVendas: number;
  gestaoOperacoes: number;
}

export interface DiagnosisResult {
  scores: CategoryScores;
  answers: Record<string, number>;
  aiReport?: string;
  overallAverage: number;
}
