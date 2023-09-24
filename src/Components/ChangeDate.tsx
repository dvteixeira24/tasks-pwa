import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { ChangeEvent, ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import { useView } from "../store";

const ChangeDate = ({ children }: { children: ReactNode }) => {
	const { currentDate, setCurrentDate } = useView();
	const [opened, setOpened] = useState(false);

	return (
		<Dialog.Root open={opened} onOpenChange={(open) => setOpened(open)}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black bg-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow border-2 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">Select date</Dialog.Title>

					<div>
						<DatePicker
							selected={currentDate}
							onChange={(d) => {
								d && setCurrentDate(d);
								setOpened(false);
							}}
							// startDate={startDate}
							// endDate={endDate}
							// excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
							// selectsRange
							// selectsDisabledDaysInRange
							inline
						/>
					</div>

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

export default ChangeDate;
