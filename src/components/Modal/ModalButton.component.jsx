import React, { useState, useCallback } from "react";
import Modal from "./Modal.component.jsx";

export const ModalButton = ({
	children,
	opened = false,
	handleOpen = () => {},
	handleClose = () => {},
	className
}) => {
	const [isOpen, setIsOpen] = useState(opened);

	const open = useCallback(() => {
		setIsOpen(true);
		handleOpen();
	}, [handleOpen]);

	const close = useCallback(() => {
		setIsOpen(false);
		handleClose();
	}, [handleClose]);

	const doOpen = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	return (
		<>
			<Modal isOpen={isOpen} handleOpen={open} handleClose={close} />
			<div onClick={doOpen} className={className}>
				{children}
			</div>
		</>
	);
};
