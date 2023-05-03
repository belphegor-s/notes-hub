import React, { useContext } from "react";
import styles from "./EditModal.module.css";
import { useState } from "react";
import { TwitterPicker } from "react-color";
import { IoMdColorPalette } from "react-icons/io";
import { BiFontColor } from "react-icons/bi";
import { updateSpecificNoteInDatabase } from "../../firebase/firebaseConfig";
import { useCallback, useEffect } from "react";
import { getNotesFromDatabase } from "../../firebase/firebaseConfig";
import NotesContext from "../../context/notes-context";
import { toast } from "react-hot-toast";

const EditModal = (props) => {
	const [bgColor, setBgColor] = useState("");
	const [fontColor, setFontColor] = useState("");
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
	const [displayFontColorPicker, setDisplayFontColorPicker] = useState(false);

	const uid = localStorage.getItem("id");
	const notesCtx = useContext(NotesContext);
	const [fetchedNotes, setFetchedNotes] = useState("");

	const fetchNotes = useCallback(() => {
		getNotesFromDatabase(uid)
			.then((result) => {
				notesCtx.setNotes(result.notes);
				setFetchedNotes(result.notes);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	},[]);

	useEffect(() => {
		fetchNotes();

		const clickedNote = props.notes.filter(
			(note) => note.noteID === props.noteID
		);

		setTitle(clickedNote[0]?.title)
		setNote(clickedNote[0]?.note)
		setBgColor(clickedNote[0]?.bgColor)
		setFontColor(clickedNote[0]?.fontColor)

	}, []);

	const saveNoteHandler = () => {
		props.onClose();

		const filteredNotes = props.notes.filter(
			(note) => note.noteID !== props.noteID
		);

		const updatedData = {
			notes: [
				...filteredNotes,
				{
					noteID: props.noteID,
					title: title,
					note: note,
					bgColor: bgColor,
					fontColor: fontColor,
				},
			],
		};

		updateSpecificNoteInDatabase(uid, updatedData)
			.then((result) => {
				toast.success("Note Updated");
				fetchNotes()
			})
			.catch((err) => toast.error(err.message));
	};

	return (
		<div className={styles["edit-modal"]}>
			<div
				className={styles["modal-content"]}
				style={{
					backgroundColor: bgColor,
					color: fontColor,
				}}
			>
				<input
					className={styles["input-expanded"]}
					type="text"
					placeholder="Title"
					value={title}
					style={{ color: fontColor }}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<br />
				<textarea
					className={styles["input-expanded"]}
					placeholder="Take a note..."
					style={{ color: fontColor }}
					value={note}
					onChange={(e) => setNote(e.target.value)}
				/>
				<div className={styles["bottom-options"]}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<div className={styles["picker"]}>
							<abbr title="Set Background Color">
								<IoMdColorPalette
									className={styles.icons}
									onClick={() => {
										setDisplayBgColorPicker(true);
									}}
								/>
							</abbr>
							{displayBgColorPicker ? (
								<div className={styles.popover}>
									<div
										className={styles.cover}
										onClick={() => {
											setDisplayBgColorPicker(false);
										}}
									/>
									<div className={styles.popover}>
										<TwitterPicker
											triangle="hide"
											onChangeComplete={(color) => {
												setBgColor(color.hex);
											}}
										/>
									</div>
								</div>
							) : null}
						</div>
						<div className={styles["picker"]}>
							<abbr title="Set Font Color">
								<BiFontColor
									className={styles.icons}
									onClick={() => {
										setDisplayFontColorPicker(true);
									}}
								/>
							</abbr>
							{displayFontColorPicker ? (
								<div className={styles.popover}>
									<div
										className={styles.cover}
										onClick={() => {
											setDisplayFontColorPicker(false);
										}}
									/>
									<div className={styles.popover}>
										<TwitterPicker
											triangle="hide"
											onChangeComplete={(color) => {
												setFontColor(color.hex);
											}}
										/>
									</div>
								</div>
							) : null}
						</div>
					</div>
					<div>
						<button
							onClick={saveNoteHandler}
							className={styles["button"]}
							style={{ marginRight: "1rem" }}
						>
							Save
						</button>
						<button
							onClick={() => {
								setBgColor("");
								setFontColor("");
								props.onClose();
							}}
							className={styles["button"]}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
