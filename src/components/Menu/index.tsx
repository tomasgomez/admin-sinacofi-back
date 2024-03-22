import { Container, MenuItem, Menu as MenuMui, Typography} from "@mui/material"
import { useState } from "react";

const Menu = ({ children, options }: { children?: any, options: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (callback: any) => () => {
    callback && callback();
    handleClose();
  };

  return (
    <>
      <Container onClick={handleClick} sx={{ padding: "0 !important" }}>{children}</Container>
      <MenuMui
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        {options.length && options.map((option: any) => (
          <MenuItem
            onClick={handleItemClick(option.onClick)}
            autoFocus={false}
            sx={{
              gap: "6px", minWidth: "222px", alignItems: "center", padding: "12px 16px",
              "&:hover": {
                bgcolor: "#DFF8FF",
              }}}
            disableRipple
          >
            {option.icon}
            <Typography variant="body2" color="#151515">
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </MenuMui>
    </>
  )
};

export default Menu;