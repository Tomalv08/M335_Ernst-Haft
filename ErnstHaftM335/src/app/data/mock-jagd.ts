export interface Jagd {
  id: number;
  name: string;
  time: string;
  date: string;
  tasks_done: number;
  tasks_long: number;
}

export const JAGDS: Jagd[] = [
  {
    id: 1,
    name: "City Adventure",
    time: "02:30",
    date: "2023-12-15",
    tasks_done: 3,
    tasks_long: 5,
  },
  {
    id: 2,
    name: "Treasure Hunt in the Park",
    time: "01:45",
    date: "2024-01-10",
    tasks_done: 5,
    tasks_long: 7,
  },
  {
    id: 3,
    name: "Historic Landmarks Challenge",
    time: "03:15",
    date: "2024-02-05",
    tasks_done: 7,
    tasks_long: 10,
  },
  {
    id: 4,
    name: "Team Challenge Downtown",
    time: "01:20",
    date: "2024-03-12",
    tasks_done: 2,
    tasks_long: 3,
  },
  {
    id: 5,
    name: "Mystery Night Walk",
    time: "02:00",
    date: "2024-04-22",
    tasks_done: 4,
    tasks_long: 4,
  },
];
