import {
  FaDumbbell,
  FaSink,
  FaSquareParking,
  FaUmbrellaBeach,
  FaWifi,
} from "react-icons/fa6";
import { MdPool } from "react-icons/md";

export const facilitiesData = [
  {
    id: 1,
    name: "Beach Access",
    icon: FaUmbrellaBeach,
    registerName: "beachAccess",
  },
  {
    id: 2,
    name: "Private Pool",
    icon: MdPool,
    registerName: "privatePool",
  },
  {
    id: 3,
    name: "Free Wifi",
    icon: FaWifi,
    registerName: "freeWifi",
  },
  {
    id: 4,
    name: "Kitchen",
    icon: FaSink,
    registerName: "kitchen",
  },
  {
    id: 5,
    name: "Free Parking",
    icon: FaSquareParking,
    registerName: "freeParking",
  },
  {
    id: 6,
    name: "Fitness Center",
    icon: FaDumbbell,
    registerName: "fitnessCenter",
  },
];
