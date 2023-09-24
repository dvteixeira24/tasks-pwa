import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import secureLocalStorage from "react-secure-storage";
import moment from "moment";
import { produce } from "immer";

export const startDate = localStorage.getItem("tasks_inception") || new Date().toLocaleString("en-US");

if (!localStorage.getItem("tasks_inception")) {
	localStorage.setItem("tasks_inception", startDate);
}

type Day = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export interface Task {
	id: number;
	title: string;
	description: string;
	reminder: string;
	created: Date;
}

interface TasksStore {
	tasks: Task[];
	addTask: (task: Omit<Task, "id">) => void;
	updateTask: (id: number, task: Partial<Task>) => void;
}

export const useTasks = create(
	persist<TasksStore>(
		(set, get) => ({
			tasks: [],
			addTask: (task) =>
				set({
					tasks: [
						...get().tasks,
						{ ...task, id: get().tasks.reduce((maxId, t) => Math.max(t.id, maxId), -1) + 1 },
					],
				}),

			updateTask: (id, task) => set({ tasks: get().tasks.map((t) => (t.id === id ? { ...t, ...task } : t)) }),
		}),
		{
			name: "tasks", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage as StateStorage), // (optional) by default, 'localStorage' is used
		}
	)
);

export interface History {
	taskId: Task["id"];
	completed: boolean;
}

interface HistoryStore {
	history: {
		[date: string]: History[];
	};
	getCompletedTasks: (dateKey: string) => History[];
	updateHistory: (dateKey: string, taskId: Task["id"], completed: boolean) => void;
}

export const useHistory = create(
	persist<HistoryStore>(
		(set, get) => ({
			history: {},
			getCompletedTasks: (date) => get().history[moment(date).format("YYYY-MM-DD")],
			updateHistory: (date, taskId, completed) =>
				set(
					produce((draft) => {
						if (!draft.history[moment(date).format("YYYY-MM-DD")]) {
							draft.history[moment(date).format("YYYY-MM-DD")] = [];
						}
						if (
							draft.history[moment(date).format("YYYY-MM-DD")].find((h: History) => h.taskId === taskId)
						) {
							draft.history[moment(date).format("YYYY-MM-DD")] = draft.history[
								moment(date).format("YYYY-MM-DD")
							].map((h: History) => (h.taskId === taskId ? { ...h, completed } : h));
						} else {
							draft.history[moment(date).format("YYYY-MM-DD")].push({ taskId, completed });
						}
					})
				),
		}),
		{
			name: "history", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage as StateStorage), // (optional) by default, 'localStorage' is used
		}
	)
);

interface ViewStore {
	currentDate: Date;
	setCurrentDate: (date: Date) => void;
}

export const useView = create<ViewStore>((set) => ({
	currentDate: new Date(),
	setCurrentDate: (date) => set({ currentDate: date }),
}));
