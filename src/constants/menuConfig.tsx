import InventoryIcon from "@mui/icons-material/Inventory";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { JSX } from "react";
import { layoutPrivateStyle } from "../style/layout/private-route";

export interface ListItem {
  name: string;
  icon: JSX.Element;
  link: string;
  key: string;
  collapseList?: ListItem[];
}

export const sidebarMenu: ListItem[] = [
  {
    name: "Master Data",
    icon: <StorefrontIcon sx={layoutPrivateStyle.sideMenuIcon} />,
    link: "/master-data",
    key: "Master Data",
    collapseList: [
      {
        name: "Data Toko",
        icon: <InventoryIcon sx={layoutPrivateStyle.sideMenuIcon}/>,
        link: "/master-data/data-store",
        key: "Data Majelis",
      },
      // {
      //   name: "Data Peminjam",
      //   icon: <InventoryIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
      //   link: "/master-data/data-peminjam",
      //   key: "Data Peminjam",
      // },
    ],
  },
  // {
  //   name: "",
  //   icon: <MeetingRoomIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
  //   link: "/pinjam-ruangan",
  //   key: "Pinjam Ruangan",
  //   collapseList: [
  //     {
  //       name: "",
  //       icon: <FeedIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
  //       link: "/pinjam-ruangan/form-peminjaman",
  //       key: "Form Peminjaman",
  //     },
      
  //   ],
  // },
];