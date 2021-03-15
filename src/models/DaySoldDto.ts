export interface SoldItemDto {
  id: number;
  name: string;
  quantity: number;
  productId: number;
}

export default interface DaySoldDto {
  items: SoldItemDto[];
}
