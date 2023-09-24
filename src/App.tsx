import { IconPlus } from "@tabler/icons-react";
import AddTask from "./Components/AddTask";
import { useHistory, useTasks, useView } from "./store";
import { TaskItem } from "./Components/TaskItem";
import moment from "moment";
import ChangeDate from "./Components/ChangeDate";

function App() {
	const { tasks, addTask } = useTasks();
	const { history, updateHistory } = useHistory();
	const { currentDate, setCurrentDate } = useView();

	return (
		<>
			<header className="mb-5 text-white flex justify-between border-b-2 pb-4">
				<h1 className="text-4xl self-end -translate-y-2">
					{tasks.length -
						(history[moment(currentDate).format("YYYY-MM-DD")]?.filter((t) => t.completed).length || 0)}
					<span className="text-xl font-normal">&nbsp;tasks to go</span>
				</h1>
				<ChangeDate>
					<button className="text-xl rounded-2xl border-2 px-3 py-2">
						<span className="text-4xl font-bold">{moment(currentDate).format("DD")}</span>
						&nbsp;{moment(currentDate).format("MMM")}
					</button>
				</ChangeDate>
			</header>
			<div className="gap-4 flex flex-col">
				<div className="flex flex-col gap-3">
					{tasks
						.sort((a, b) => {
							return Number(a.reminder.slice(0, 2)) > Number(b.reminder.slice(0, 2)) ? 1 : -1;
						})
						.map((task) => {
							return <TaskItem key={task.id} task={task} />;
						})}
					<AddTask onSave={addTask}>
						<button className="p-4 mx-3 bg-white bg-opacity-70 rounded-2xl hover:bg-opacity-100">
							<div className="flex flex-row gap-3">
								<IconPlus /> <div>Add a new task</div>
							</div>
						</button>
					</AddTask>
				</div>
			</div>
		</>
	);
}

export default App;
