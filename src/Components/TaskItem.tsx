import moment from "moment";
import { Task, useHistory, useView } from "../store";
import { TickAnimated } from "./TickAnimated";

export const TaskItem = (props: { task: Task }) => {
	const { task } = props;
	const { history, updateHistory } = useHistory();
	const { currentDate } = useView();

	const isTaskCompleted = history[moment(currentDate).format("YYYY-MM-DD")]?.find(
		(t) => t.taskId === task.id
	)?.completed;

	const setCompleted = (completed: boolean) => {
		updateHistory(moment(currentDate).format("YYYY-MM-DD"), task.id, completed);
	};

	return (
		<div
			data-completed={isTaskCompleted}
			style={{
				transition: "background-color 0.5s ease-in-out",
			}}
			className="bg-white relative rounded-2xl flex overflow-clip data-[completed='true']:bg-green-100"
		>
			<div className="flex flex-row p-4 grow gap-4">
				<div className="text-md font-bold self-center">{task.reminder}</div>
				<div className="flex flex-col self-center">
					<div className="text-xl font-bold">{task.title}</div>
					<div className="text-lg text-gray-600">{task.description || ""}</div>
				</div>
			</div>
			<div className="min-h-full">
				<button
					data-completed={isTaskCompleted}
					className="w-20 h-full rounded-2xl bg-teal-100 self-center cursor-pointer grid items-center border-l-4 border-cyan-500 transition-all translate-x-[50%] data-[completed='true']:translate-x-[0%]"
					onClick={() => setCompleted(!isTaskCompleted)}
				>
					{isTaskCompleted && <TickAnimated className="text-cyan-500" width={68} height={40} />}
				</button>
			</div>
		</div>
	);
};
