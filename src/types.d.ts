
interface IQuote {
  id: number;
  quote: string;
  author: string;
  background: string;
  color: string;
  isFav: boolean;
}
declare namespace Store {
  interface IDayDiary {
    id: number;
    state?: number;
    title?: string;
    type?: string[];
    notes?: string[];
    voices?: string[];
    images?: string[];
  }

  interface IDiaryMood {
    state: number;
    title: string;
    type: string[];
  }

  interface IMoodForm {
    title: string;
    state: number;
    type: string[];
    audio?: string;
  }

  interface INoteForm {
    notes: string;
  }

  interface IImageForm {
    image: string;
  }

  interface IVoiceForm {
    voice: string;
  }

  interface ISearchForm {
    type: string[];
  }
}

interface IDiary {
  _id: string;
  date: Date;
  title?: string;
  user: string;
  tags?: string[];
  mood?: number;
  audios?: string[];
  images?: string[];
  notes?: string[];
}
