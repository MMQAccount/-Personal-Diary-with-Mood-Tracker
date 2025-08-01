import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DiaryContext } from "../../providers/diary-provider";
import ReactMarkdown from "react-markdown";
import { DeleteOutlined } from "@ant-design/icons";
import './EditPages.css';
import { useTranslation } from "react-i18next";

type IParams = { day: string; noteId: string };

const EditNote = () => {
    const { t } = useTranslation("diary");
    const { diary, updateDiary } = useContext(DiaryContext);
    const { day, noteId } = useParams<IParams>();
    const navigate = useNavigate();

    const INITIAL_FORM: Store.INoteForm = {
        notes: "",
    };

    const [form, setForm] = useState<Store.INoteForm>(INITIAL_FORM);
    const [diaryEx, setDiaryEx] = useState<Store.IDayDiary>();

    useEffect(() => {
        const d = diary.find((entry) => entry.id === Number(day));
        if (d) {
            setDiaryEx(d);
            const noteContent = d.notes?.[Number(noteId)] || "";
            setForm({
                notes: noteContent,
            });
        }
    }, [day, noteId, diary]);

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!diaryEx) return;

        const updatedNotes = [...(diaryEx.notes || [])];
        updatedNotes[Number(noteId)] = form.notes;

        updateDiary(diaryEx._id, {
            ...diaryEx,
            notes: updatedNotes,
        });

        navigate("/diaryPage");
    };

    const handleDelete = () => {
        if (!diaryEx) return;
        const updatedNotes = diaryEx.notes?.filter((_, idx) => idx !== Number(noteId)) || [];
        updateDiary(diaryEx._id, {
            ...diaryEx,
            notes: updatedNotes,
        });
        navigate("/diaryPage");
    };

    if (!diaryEx) return <h2>{t("loadingDiary") || "Loading diary entry..."}</h2>;

    return (
        <div className="editForm">
            <form onSubmit={handleSubmit}>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleFormChange}
                    rows={10}
                    cols={50}
                    placeholder={t("add_notes_placeholder")}
                />
                <div className="btns">
                    <button type="submit">{t("save_button") || "Save"}</button>
                    <DeleteOutlined className="del_icon" onClick={handleDelete} />
                </div>
            </form>
        </div>
    );
};

export default EditNote;
