import Homebtn from './../Homebtn';
import Earnbtn from './../Earnbtn';
import Invitebtn from './../Invitebtn';
import Statsbtn from './../Statsbtn';
import Gamebtn from './../Gamebtn';

export const navButtons = [
  { label: "Home", route: "/", component: Homebtn },
  { label: "Earn", route: "/earnbtn", component: Earnbtn },
  { label: "Invite", route: "/invitebtn", component: Invitebtn },
  { label: "Stats", route: "/statsbtn", component: Statsbtn },
  { label: "Game", route: "/gamebtn", component: Gamebtn },
];
