export default interface ProductDto {
  id: number;
  name: string;
  unitId: number;
  categoryId: number;
}

export interface ProductViewDto extends ProductDto {
  unit: string;
  category: string;
}

export interface UnitDto {
  id: number;
  name: string;
}

export interface CategoryDto {
  id: number;
  name: string;
}
