export type GenreAttributes = {
  name: string;
  parentId: string;
  parentName: string;
};
export type Genre = {
  id: string;
  type: 'genres';
  href: string;
  attributes: GenreAttributes;
};
