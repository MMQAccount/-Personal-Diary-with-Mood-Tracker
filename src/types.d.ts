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
