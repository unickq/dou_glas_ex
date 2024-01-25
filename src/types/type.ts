export type ParfumFilterType = "NEU" | "SALE";
export type ProductFilterType = "Marke" | "Produktart" | "Geschenk fur" | "Für Wen";
export interface ProductFilter {
  filterType: ProductFilterType;
  filterValue: string[] | number[];
}

export interface ITest {
  name?: string;
  parfumFilter: ParfumFilterType;
  productFilters: ProductFilter[];
  resultsCount?: number;
  error?: string;
}
