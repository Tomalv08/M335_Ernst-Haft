
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
    max_time: 50 // max time in seconds
  },
  {
    id: 2,
    name: "Geolocation",
    description: "Lauf 10 meter",
    distance: 200,
    pic: "picture",
    max_time: 20 // max time in seconds
  },
  {
    id: 3,
    name: "QR Code scannen",
    description: "Scanne den QR Code",
    distance: 50,
    pic: "picture",
    max_time: 25 // max time in seconds
  },
  {
    id: 4,
    name: "Gerät anschliessen",
    description: "Verbinde das Gerät mit dem Strom",
    distance: 0,
    pic: "picture",
    max_time: 15 // max time in seconds
  },
];

