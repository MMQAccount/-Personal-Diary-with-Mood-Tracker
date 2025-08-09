interface IQuote {
  id: number;
  quote: string;
  author: string;
  background?: string;
  color?: string;
  isFav?: boolean;
}
interface IQuoteBgImage {
  id: string;
  backgroundImage: string;
  theme: "green" | "purple";
}

interface IQuoteBgColor {
  id: string;
  backgroundColor: string;
  theme: "green" | "purple";
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

interface IUser {
  name: string;
  email: string;
  imageURL?: string;
  customMoodEmojis: {
    delighted: string;
    happy: string;
    neutral: string;
    sad: string;
    miserable: string;
  };
  diaries: IDiary[];
  tags: ITag[];
}

interface IDiaryTagContent {
  _id: string;
  name: string;
}

interface IDiary {
  _id: string;
  date: Date;
  title?: string;
  user: string;
  tags?: IDiaryTagContent[] | string[];
  mood?: number;
  audios?: string[];
  images?: string[];
  notes?: string[];
}

interface ITag {
  _id: string;
  name: string;
  emoji: string;
  type: "global" | "custom";
  user?: string;
}

interface IMood {
  _id: string;
  name: string;
  emoji: string;
  color: string;
  score: number;
}
