import {
  FileSpreadsheet,
  History,
  MoreVertical,
  Printer,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import type { AnalyticsUpload } from "../lib/convex-analytics-client";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { AnalyticsFilters } from "./analytics-filters";

interface UploadedDataItem {
  engenheiro?: string;
  ano?: number | string;
  mes?: number | string;
}

interface DepartmentInfo {
  gerente: string;
  colaboradores: string[];
}

interface DepartmentMap {
  vendas: DepartmentInfo;
  servicos: DepartmentInfo;
  engenhariaeassistencia: DepartmentInfo;
  externos: DepartmentInfo;
}

type DepartmentKey = keyof DepartmentMap;

interface AnalyticsUploadSectionProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  fileName: string;
  saveStatus: "idle" | "saving" | "saved" | "error";
  uploadedData: UploadedDataItem[];
  uploadHistory: AnalyticsUpload[];
  isLoading: boolean;
  onUploadClick: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveData: () => void;
  onPrint: () => void;
  onClearData: () => void;
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  selectedEngineer: string;
  setSelectedEngineer: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
  topEngineersFilter: string;
  setTopEngineersFilter: (value: string) => void;
}

export function AnalyticsUploadSection({
  fileInputRef,
  fileName,
  saveStatus,
  uploadedData,
  uploadHistory,
  isLoading,
  onUploadClick,
  onFileUpload,
  onSaveData,
  onPrint,
  onClearData,
  selectedDepartment,
  setSelectedDepartment,
  selectedEngineer,
  setSelectedEngineer,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  topEngineersFilter,
  setTopEngineersFilter,
}: AnalyticsUploadSectionProps) {
  const historyRef = useRef<HTMLDivElement>(null);
  const [historyDropdownOpen, setHistoryDropdownOpen] = useState(false);

  const handleHistoryClick = () => {
    setHistoryDropdownOpen(!historyDropdownOpen);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        historyRef.current &&
        !historyRef.current.contains(event.target as Node)
      ) {
        setHistoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Função para normalizar nomes (igual do filtro)
  function normalizeName(name: string | undefined): string {
    return name?.toLowerCase().replace(/\s+/g, "").trim() || "";
  }

  // Mapeamento dos departamentos e colaboradores (igual do filtro)
  const departmentMap: DepartmentMap = {
    vendas: {
      gerente: "Sobrinho",
      colaboradores: [
        "Sobrinho",
        "Mamede",
        "Giovana",
        "LENILTON",
      ],
    },
    servicos: {
      gerente: "Giovanni",
      colaboradores: [
        "Giovanni",
        "Paloma",
        "Lucas",
        "Marcelo M",
        "Raquel",
        "Rafael Massa",
      ],
    },
    engenhariaeassistencia: {
      gerente: "Carlinhos",
      colaboradores: ["Carlinhos", "Claudio", "Anderson"],
    },
    externos: {
      gerente: "Carvalho",
      colaboradores: ["RONAN NONATO", "Jefferson", "Edison", "Sandro"],
    },
  };

  // Filtragem dos dados conforme os filtros selecionados para os filtros (sem agregação)
  let filteredDataForFilters = uploadedData;
  if (selectedDepartment !== "todos") {
    if (
      selectedDepartment === "vendas" ||
      selectedDepartment === "servicos" ||
      selectedDepartment === "engenhariaeassistencia" ||
      selectedDepartment === "externos"
    ) {
      const departmentKey = selectedDepartment as DepartmentKey;
      const colabs = departmentMap[departmentKey].colaboradores.map(normalizeName);
      filteredDataForFilters = filteredDataForFilters.filter((row: UploadedDataItem) =>
        colabs.includes(normalizeName(row.engenheiro)),
      );
    } else if (selectedDepartment === "outros") {
      const allColabs = [
        ...departmentMap.vendas.colaboradores,
        ...departmentMap.servicos.colaboradores,
        ...departmentMap.engenhariaeassistencia.colaboradores,
        ...departmentMap.externos.colaboradores,
      ].map(normalizeName);
      filteredDataForFilters = filteredDataForFilters.filter(
        (row: UploadedDataItem) => !allColabs.includes(normalizeName(row.engenheiro)),
      );
    }
  }
  if (selectedEngineer !== "todos") {
    filteredDataForFilters = filteredDataForFilters.filter(
      (row: UploadedDataItem) => normalizeName(row.engenheiro) === selectedEngineer,
    );
  }
  if (selectedYear !== "todos") {
    filteredDataForFilters = filteredDataForFilters.filter(
      (row: UploadedDataItem) => row.ano?.toString() === selectedYear,
    );
  }
  if (selectedMonth !== "todos") {
    filteredDataForFilters = filteredDataForFilters.filter(
      (row: UploadedDataItem) => row.mes?.toString().padStart(2, "0") === selectedMonth,
    );
  }

  const isMobile = useIsMobile();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4 flex-wrap gap-2 print:hidden">
      {!isMobile && (
        <AnalyticsFilters
          uploadedData={filteredDataForFilters}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedEngineer={selectedEngineer}
          setSelectedEngineer={setSelectedEngineer}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          topEngineersFilter={topEngineersFilter}
          setTopEngineersFilter={setTopEngineersFilter}
        />
      )}

      <div className="flex items-center space-x-2">
        {/* Botão Upload */}
        <Button
          onClick={onUploadClick}
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 h-10 w-10"
          title="Upload Excel"
        >
          <Upload className="h-5 w-5" />
        </Button>

        {/* Botão Imprimir */}
        <Button
          onClick={onPrint}
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 h-10 w-10"
          title="Imprimir"
        >
          <Printer className="h-5 w-5" />
        </Button>

        {/* Botão Excluir */}
        <Button
          onClick={onClearData}
          disabled={isLoading || uploadedData.length === 0}
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 h-10 w-10 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Limpar Dados"
        >
          <Trash2 className="h-5 w-5" />
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={onFileUpload}
          className="hidden"
        />
        {fileName && (
          <div className="flex items-center space-x-1 text-white text-sm">
            <FileSpreadsheet className="h-4 w-4" />
            <span>{fileName}</span>
          </div>
        )}
      </div>

      {/* Mobile Filters Sheet */}
      {isMobile && (
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetContent>
            <div className="bg-white h-full">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <AnalyticsFilters
                  uploadedData={filteredDataForFilters}
                  selectedDepartment={selectedDepartment}
                  setSelectedDepartment={setSelectedDepartment}
                  selectedEngineer={selectedEngineer}
                  setSelectedEngineer={setSelectedEngineer}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  topEngineersFilter={topEngineersFilter}
                  setTopEngineersFilter={setTopEngineersFilter}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
