export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  colSpan?: number;
  rowSpan?: number;
}
