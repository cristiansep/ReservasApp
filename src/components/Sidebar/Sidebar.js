import React, { useState, useEffect, useContext } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  // FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  DateRange as DateRangeIcon 
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { AuthContext } from "../../context/auth/AuthContext";




const adminLinks = [

  { id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Reservas",
    link: "/reservas",
    icon: <DateRangeIcon />,
  },
  { id: 2, label: "Tables", link: "/reservas", icon: <TableIcon /> },
  {
    id: 3,
    label: "Notifications",
    link: "/notifications",
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: "UI Elements",
    link: "/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Icons", link: "/ui/icons" },
      { label: "Charts", link: "/ui/charts" },
      { label: "Maps", link: "/ui/maps" },
    ],
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  { id: 10, type: "divider" },
];


const doctorlinks = [
  { id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> },
  {id: 1, label: "Reservas", link: "/reservas", icon: <DateRangeIcon />,},
]

const usuarioLinks = [
  { id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> },
  {id: 1, label: "Reservas", link: "/reservas", icon: <DateRangeIcon />,},
]

function Sidebar({ location }) {
  const classes = useStyles();
  const theme = useTheme();

  const {user:{rol}} = useContext(AuthContext);

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>

      <List className={classes.sidebarList}>
        {rol === "USER_ROLE" &&
          usuarioLinks.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}

        {rol === "ADMIN_ROLE" &&
          adminLinks.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}

        {rol === "DOCTOR_ROLE" &&
          doctorlinks.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
