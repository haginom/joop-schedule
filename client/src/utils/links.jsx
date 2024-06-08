import React from "react";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrSchedule } from "react-icons/gr";
import { FaCircleInfo } from "react-icons/fa6";

const links = [
  {
    text: "Schedule",
    path: ".",
    icon: <GrSchedule />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "information",
    path: "information",
    icon: <FaCircleInfo />,
    children: [
      {
        text: "new parents",
        path: "new parents",
      },
      {
        text: "tasks",
        path: "tasks",
      },
    ],
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
