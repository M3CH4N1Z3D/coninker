export interface CategoryDto {
  id: string;
  title: string;
  image: string;
  description: string;
  parent?: CategoryDto;
  children?: CategoryDto[];
  parentId?: string;
}
