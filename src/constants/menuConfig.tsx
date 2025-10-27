import InventoryIcon from "@mui/icons-material/Inventory";
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
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
    icon: <StorefrontIcon sx={layoutPrivateStyle.sideSubMenuIcon} />,
    link: "/master-data",
    key: "Master Data",
    collapseList: [
      {
        name: "Data Toko",
        icon: <InventoryIcon sx={layoutPrivateStyle.sideMenuIcon}/>,
        link: "/master-data/data-store",
        key: "Data Toko",
      },
      {
        name: "Data User",
        icon: <PeopleOutlinedIcon sx={layoutPrivateStyle.sideMenuIcon} />,
        link: "/master-data/data-user",
        key: "Data User",
      },
    ],
    
  },
  {
    name: "Service Item",
    icon: <FormatListBulletedOutlinedIcon sx={layoutPrivateStyle.sideMenuIcon} />,
    link: "/service-item",
    key: "Service Item",
    // collapseList: [],
  },
];