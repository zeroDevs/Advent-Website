import { useState } from "react";

export default function useDrawer() {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	const handleOpen = () => setIsOpen(true);

	const toggle = () => setIsOpen(!isOpen);

	return { isOpen, handleOpen, handleClose, toggle };
}
