import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import React, { ReactNode, useState } from "react";
import { Task, useTasks } from "../store";

const AddTask = ({ children, onSave }: { children: ReactNode; onSave: (task: Omit<Task, "id">) => void }) => {
	const [formData, setFormData] = useState<Omit<Task, "id">>({
		title: "Untitled Task",
		description: "",
		reminder: "08:00",
		created: new Date(),
	});

	const updateField = (e: React.ChangeEvent<HTMLFormElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSave(formData);
	};

	console.log(formData);

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black bg-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow border-2 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">Add Task</Dialog.Title>
					<Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
						Add task details here. Click save when you're done.
					</Dialog.Description>
					<form
						onChange={(ev: React.ChangeEvent<HTMLFormElement>) => {
							updateField(ev);
						}}
						onSubmit={handleSave}
					>
						<fieldset className="mb-[15px] flex items-center gap-5">
							<label className="text-teal-800 w-[90px] text-right text-[15px]" htmlFor="title">
								Title
							</label>
							<input
								className="text-teal-800 border-teal-600 focus:border-b-[2px] inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none border-b-[1px] outline-none focus:border-b-teal-500"
								name="title"
								defaultValue="Untitled Task"
							/>
						</fieldset>
						<fieldset className="mb-[15px] flex items-center gap-5">
							<label className="text-teal-800 w-[90px] text-right text-[15px]" htmlFor="reminder">
								Reminder
							</label>
							<input
								type="time"
								className="text-teal-800 border-teal-600 focus:border-b-[2px] inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none border-b-[1px] outline-none focus:border-b-teal-500"
								name="reminder"
								defaultValue="08:00"
							/>
						</fieldset>
						<div className="mb-[15px] w-full inline-flex items-end">
							<span className="text-teal-800 text-[15px] ml-auto">{"TODO: time until next"}</span>
						</div>
						<fieldset className="mb-[15px] flex items-center gap-5">
							<label className="text-teal-800 w-[90px] text-right text-[15px]" htmlFor="description">
								Description
							</label>
							<textarea
								className="text-teal-800 shadow-teal-600 focus:shadow-teal-500 h-[96px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] p-2"
								name="description"
								defaultValue=""
								placeholder="Task description"
							/>
						</fieldset>
						<div className="mt-[25px] flex justify-end">
							<button
								type="submit"
								className="bg-cyan-200 text-teal-700 hover:bg-cyan-300 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
							>
								Save changes
							</button>
						</div>
					</form>
					<Dialog.Close asChild>
						<button
							className="text-teal-800 hover:bg-teal-200 focus:shadow-teal-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
							aria-label="Close"
						>
							<IconX stroke={1} size={16} rotate={"45deg"} />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default AddTask;
