
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
    _id: string;
    id: number;
    state?: number;
    title?: string;
    type?: string[];
    notes?: string[];
    voices?: string[];
    images?: string[];
  }
  interface IDayDiaryBECreateUpdate {
    date: string;
    title?: string;
    notes?: string[];
    images?: string[];
    audios?: string[];
    mood?: number;
    tags?: string[];
  }
  import { Types } from "mongoose";

  export interface ITag {
    name: string;
    emoji: string;
    type: 'global' | 'custom';
    user?: Types.ObjectId;
  }

  interface IDayDiaryBE {
    _id: string;
    date?: string;
    title?: string;
    notes?: string[];
    images?: string[];
    audios?: string[];
    mood?: number;
    tags?: Types.ObjectId[];
    user?: Types.ObjectId;
  }
  interface IDayDiaryInput {
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
