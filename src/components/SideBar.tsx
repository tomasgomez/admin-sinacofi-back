'use client'
import { AccountBalance, AccountBalanceOutlined, ArrowDropDownOutlined, AssignmentIndOutlined, BarChart, CloudDownloadOutlined, ConnectWithoutContact, EditOutlined, EmailOutlined, ForwardToInbox, ForwardToInboxOutlined, GroupOutlined, Inbox, NotificationsNone, NotificationsNoneOutlined, SettingsApplicationsOutlined, StackedBarChart, WorkspacesOutlined } from "@mui/icons-material";
import { Button, Collapse, Container, List, } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavegationItem from "./List";

const Badge = ({ children }: { children: any }) => {
  return (
    <div style={{
      display: "flex",
      width: "16px",
      height: "16px",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#00B2E2",
      borderRadius: 50,
      color: "#ffffff",
      fontSize: 10,
      textAlign: "center",
      fontWeight: 600
    }}>{children}</div>
  )
}

const navList = [
  {
    key: "monitoring",
    label: "Monitoreo",
    icon: <BarChart />,
    url: "/"
  },
  {
    key: "intitutions",
    label: "Instituciones",
    icon: <AccountBalanceOutlined />,
    url: "/intitutions"
  },
  {
    key: "areas",
    label: "Áreas",
    icon: <WorkspacesOutlined />,
    url: "/areas"
  },
  {
    key: "users",
    label: "Usuarios",
    icon: <GroupOutlined />,
    url: "/users"
  },
  {
    key: "roles",
    label: "Roles",
    icon: <AssignmentIndOutlined />,
    url: "/roles"
  },
  {
    key: "connections",
    label: "Conexiones",
    icon: <ConnectWithoutContact />,
    url: "/connections"
  },
  {
    key: "system",
    label: "Sistema",
    icon: <SettingsApplicationsOutlined />,
    childrenKeys: ["typesOfMessages", "holidays", "typesOfOperations", "flows"],
    children: [
      {
        key: "typesOfMessages",
        label: "Tipos de mensajes",
        url: "/system/typesOfMessages",
      },
      {
        key: "holidays",
        label: "Feriados",
        url: "/system/holidays",
      },
      {
        key: "typesOfOperations",
        label: "Tipos de Operaciones",
        url: "/system/typesOfOperations",
      },
      {
        key: "flows",
        label: "Flujos",
        url: "/system/flows",
      },
    ],
  },
  {
    key: "notifications",
    label: "Notificaciones",
    icon: <Inbox />,
    url: "/notifications",
    children: [],
  },
];


const SideBar = () => {
  const [open, setOpen] = useState("");
  const pathname = usePathname();
  console.log({ pathname });
  const handleClick = (section: string) => {
    setOpen(section === open ? "" : section);
  };

  console.log({ open });
  useEffect(() => {
    const path = pathname?.split("/");
    if (path) {
      setOpen(path[path.length - 1]);
    }
  }, [pathname]);

  return (
    <Container
      sx={{
        backgroundColor: "#ffffff",
        maxWidth: "270px !important",
        color: "#000000",
        margin: 0,
        zIndex: 1,
        padding: "0 !important",
        height: "calc(100vh - 64px)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)"
      }}
    >
      <Button
        variant="contained"
        size="large"
        sx={{ color: "#ffffff", width: "calc(100% - 40px)", margin: "20px", marginBottom: "12px", textTransform: "capitalize" }}
        startIcon={<EditOutlined />}
        endIcon={<ArrowDropDownOutlined />}
      >
        Nuevo Mensaje
      </Button>
      <List
        component="nav"
      >
        {navList.map((nav) => (
          nav.url ? (
            <Link href={nav.url} key={nav.key}>
              <NavegationItem nav={nav} open={open === nav.key} handleClick={handleClick} />
            </Link>
          ) : (
            <>
              <NavegationItem
              nav={nav}
              open={open === nav.key || (!!nav.children?.length && nav.childrenKeys?.includes(open))}
              handleClick={handleClick}
              childSelected={!!nav.children?.length && nav.childrenKeys?.includes(open)}
            />
              {!!nav.children?.length && nav.children.length > 0 && (
                <Collapse in={open === nav.key || (!!nav.children?.length && nav.childrenKeys?.includes(open))} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {nav.children.map((subNav) => (
                      <Link href={subNav.url} key={nav.key}>
                        <NavegationItem nav={subNav} open={open === subNav.key} isChild handleClick={handleClick} />
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}
            </>
          )
        ))}
        {/* <Link href="/">
          <ListItemButton onClick={() => handleClick("monitoring")}>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Monitoreo" />
          </ListItemButton>
        </Link>
        <Link href="/users">
          <ListItemButton onClick={() => handleClick("users")}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </Link>
        <Link href="/roles">
          <ListItemButton onClick={() => handleClick("roles")}>
            <ListItemIcon>
              <AssignmentIndOutlined />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={() => handleClick("conexions")}>
          <ListItemIcon>
            <ConnectWithoutContact />
          </ListItemIcon>
          <ListItemText primary="Conexiones" />
        </ListItemButton>
        <ListItemButton onClick={() => handleClick("system")}>
          <ListItemIcon>
            <SettingsApplicationsOutlined />
          </ListItemIcon>
          <ListItemText primary="Sistema" />
          {open === "system" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === "system"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Tipos de mensajes" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Feriados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Tipos de Operaciones" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Flujos" />
              <Badge>2</Badge>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleClick("notifications")}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Notificationes" />
          <Badge>2</Badge>
        </ListItemButton> */}
      </List>
        {/* <ListItemButton onClick={() => handleClick("msg")}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Messages" />
          {open === "msg" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === "msg"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Bandeja de Entrada" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Enviados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Rechazados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Procesos Hipotecarios" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Recuperados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Preparados" />
              <Badge>2</Badge>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleClick("preparations")}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Preparativos" />
          {open === "preparations" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === "preparations"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Bandeja de Entrada" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Enviados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Rechazados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Procesos Hipotecarios" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Recuperados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Preparados" />
              <Badge>2</Badge>
            </ListItemButton>
          </List>
        </Collapse>
      </List> */}
    </Container>
  );
};

export default SideBar;
