import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSidebarStore } from "../../core/store/sidebarStore";

const drawerWidth = 240;
const miniWidth = 56;

const navLinks = [
  { name: "Dashboard", link: "/admin/dashboard", icon: <DashboardIcon /> },
  {
    name: "Ultility",
    icon: <LocalOfferIcon />,
    children: [
      { name: "Category", link: "/admin/categories" },
      { name: "Author", link: "/admin/authors" },
      { name: "Tag", link: "/admin/tags" },
      { name: "Publisher", link: "/admin/publishers" },
    ],
  },
  { name: "Orders", link: "/admin/orders", icon: <ShoppingCartIcon /> },
  { name: "Authorizaion",  
    icon: <PeopleIcon />, 
    children: [
      { name: "User", link: "/admin/users" },
      { name: "Role", link: "/admin/roles" },
    
    ], },
  { name: "Products", link: "/admin/books", icon: <BookIcon /> },
  { name: "Setting", link: "/admin/setting", icon: <SettingsIcon /> },
];

const AdminSidebar = () => {
  const { open } = useSidebarStore();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleToggle = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : miniWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : miniWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "#1e293b",
          color: "white",
        },
      }}
    >
      <Toolbar>{open ? "BookStore" : "BS"}</Toolbar>
      <Divider sx={{ bgcolor: "white" }} />

      <List>
        {navLinks.map((link) =>
          link.children ? (
            <div key={link.name}>
              <Tooltip title={!open ? link.name : ""} placement="right">
                <ListItemButton onClick={() => handleToggle(link.name)}>
                  <ListItemIcon sx={{ color: "white" }}>{link.icon}</ListItemIcon>
                  {open && <ListItemText primary={link.name} />}
                  {open && (openMenu === link.name ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </Tooltip>
              <Collapse in={open && openMenu === link.name} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {link.children.map((child) => (
                    <ListItemButton
                      key={child.link}
                      sx={{ pl: 4 }}
                      component={Link}
                      to={child.link}
                    >
                      <ListItemText primary={child.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ) : (
            <Tooltip key={link.name} title={!open ? link.name : ""} placement="right">
              <ListItemButton component={Link} to={link.link}>
                <ListItemIcon sx={{ color: "white" }}>{link.icon}</ListItemIcon>
                {open && <ListItemText primary={link.name} />}
              </ListItemButton>
            </Tooltip>
          )
        )}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
