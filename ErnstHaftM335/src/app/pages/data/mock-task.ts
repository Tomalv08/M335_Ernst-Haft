
export interface Task {
  id: number;
  name: string;
  description: string;
  distance?: number;
  pic?: any;
  max_time: number;
}

export const TASKS: Task[] = [
  {
    id: 1,
    name: "Ping Pong Tisch",
    description: "Laufe zum Ping Pong Tisch",
    distance: 100,
    pic: "picture",
    max_time: 20
  },
  {
    id: 2,
    name: "Ping Pong Tisch",
    description: "Laufe zum Ping Pong Tisch",
    distance: 100,
    pic: "picture",
    max_time: 20
  },
  {
    id: 3,
    name: "Ping Pong Tisch",
    description: "Laufe zum Ping Pong Tisch",
    distance: 100,
    pic: "picture",
    max_time: 20
  },
  {
    id: 4,
    name: "Ping Pong Tisch",
    description: "Laufe zum Ping Pong Tisch",
    distance: 100,
    pic: "picture",
    max_time: 20
  },

];
