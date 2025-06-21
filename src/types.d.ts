declare namespace Store {
    interface IDiaryItem {
        id: number;
        title: string;
        type: string
        notes: string;
        state: number;
        image?: string
    }
    interface IForm {
        title: string;
        notes: string;
        image: string;
        state: number;
        type: string;
    }
}