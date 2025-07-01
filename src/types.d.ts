
  interface IQuote {
  id: number;
  quote: string;
  author: string;
  background: string;
  color: string;
  isFav: boolean;
}
declare namespace Store {
    interface IDiaryItem {
        id: number;
        title: string;
        type: string[];
        notes: string;
        state: number;
        image?: string;
        audio?: string;
    }
    interface IForm {
        title: string;
        notes: string;
        image?: string;
        state: number;
        type: string[];
        audio?: string;

    interface ISearchForm {
        type: string[];
    }
}

