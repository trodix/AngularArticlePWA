export default class Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: Date;
  description: string;
  reviews: Array<object>;
}
