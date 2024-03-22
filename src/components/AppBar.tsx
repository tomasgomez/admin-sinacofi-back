'use client'
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AppBar as AppBarMui, Box, Container, Stack, Typography } from "@mui/material";
import SinacofiBrand from "../../assets/sinacofi-icon.svg";
import { ArrowDropDown, HelpOutline, Logout, SettingsOutlined } from "@mui/icons-material";
import Menu from "./Menu";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  // const currentTime = new Date();
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(new Date());
      console.log({ updateTime: new Date() });
    }, 1000);
    console.log("TIMER:", { timer,  });

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return <Typography variant="caption">{currentTime.toLocaleString().replace(",", "")}</Typography>;
}

const MenuOptions = () => {
  const options = useMemo(() => {
    return [
      {
        label: "Configuration",
        icon: <SettingsOutlined sx={{ color: "#898989" }} />
      },
      {
        label: "Ayuda",
        icon: <HelpOutline sx={{ color: "#898989" }} />
      },
      {
        label: "Salir",
        icon: <Logout sx={{ color: "#898989" }} />
      },
    ]
  }, []);

  return (
    <Menu options={options}>
      <Typography color="#565656" fontWeight={500} variant="body1">5077001</Typography>
      <div style={{ display: "flex", alignItems: "center" }} /* onClick={handleClick} */>
        <Typography variant="caption" fontWeight={600} color="#151515">09 - Administrador Global</Typography>
        <ArrowDropDown sx={{ color: "#898989" }} />
      </div>
    </Menu>
  );
};

const AppBar = () => {
  const date = useMemo(() => new Date(), []);
  return (
    <AppBarMui
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        fontFamily: "Roboto",
        boxShadow: "none",
        flexDirection: "row",
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{
        width: "100vw !important", zIndex: 2,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)"
      }}>
        <Container sx={{
          padding: "8px 24px",
          zIndex: 2,
          width: "auto",
          margin: 0,
        }} >
          <Image
            height={27}
            src={SinacofiBrand} alt={"Sinacofi"}
          />
          <Box sx={{
            color: "#000000",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: 400
          }}>
            <Time />
          </Box>
        </Container>
        <Container
          sx={{
            flexDirection: "column",
            margin: 0,
            width: "auto",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <MenuOptions />
        </Container>
      </Stack>
    </AppBarMui>
  );
};

export default AppBar;
