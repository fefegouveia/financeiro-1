// Stub implementation for convex-analytics-client
import React from 'react';
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

export interface AnalyticsDataRow {
  engenheiro: string;
  ano: number;
  mes: number;
  registros: number;
  servicos: number;
  pecas: number;
  valorTotal: number;
  valorPecas: number;
  valorServicos: number;
  valorOrcamentos: number;
  projetos: number;
  quantidade: number;
  cliente?: string;
}

// Stub hooks - replace with actual Convex hooks
export function useSaveAnalyticsData() {
  return async (_params: {
    data: AnalyticsDataRow[];
    rawData: RawDataRow[];
    fileName: string;
    uploadedBy: string;
  }) => ({ success: true });
}

export function useAnalyticsData() {
  return React.useMemo(() => null, []);
}

export function useUploadHistory() {
  return React.useMemo(() => [], []);
}

export function useClearAnalyticsData() {
  return async () => ({ success: true });
}

export function useInitializeAnalyticsUpload() {
  return async (_params: {
    fileName: string;
    uploadedBy: string;
    totalRecords: number;
  }) => ({ success: true, uploadId: "stub" });
}

export function useSaveAnalyticsDataBatch() {
  return async (_params: { data: AnalyticsDataRow[]; uploadId: string }) => ({
    success: true,
  });
}

export function useSaveAnalyticsRawDataBatch() {
  return async (_params: { rawData: RawDataRow[]; uploadId: string }) => ({
    success: true,
  });
}

export function useFinalizeAnalyticsUpload() {
  return async (_params: { uploadId: string }) => ({ success: true });
}
