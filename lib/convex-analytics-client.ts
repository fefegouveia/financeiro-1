// Stub implementation for convex-analytics-client
export interface AnalyticsUpload {
  _id: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
  totalRecords: number;
}

export interface RawDataRow {
  responsavel: string;
  cliente: string;
  ano: number;
  mes: number;
  valor: number;
  descricao: string;
  orcamentoId?: string;
  isOrcamento: boolean;
  isVendaNormal: boolean;
  isVendaServicos: boolean;
}

// Stub hooks - replace with actual Convex hooks
export function useSaveAnalyticsData() {
  return async (params: any) => ({ success: true });
}

export function useAnalyticsData() {
  return null;
}

export function useUploadHistory() {
  return [];
}

export function useClearAnalyticsData() {
  return async () => ({ success: true });
}

export function useInitializeAnalyticsUpload() {
  return async (params: any) => ({ success: true, uploadId: "stub" });
}

export function useSaveAnalyticsDataBatch() {
  return async (params: any) => ({ success: true });
}

export function useSaveAnalyticsRawDataBatch() {
  return async (params: any) => ({ success: true });
}

export function useFinalizeAnalyticsUpload() {
  return async (params: any) => ({ success: true });
}
