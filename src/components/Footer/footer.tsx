import CopyrightIcon from "@mui/icons-material/Copyright";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { layoutPrivateStyle } from "../../style/layout/private-route";
import Divider from "@mui/material/Divider";

const newDate = new Date();

export function FooterPublicRoutes() {
  return (
    <>
      <Divider />
      <Stack component="footer" sx={layoutPrivateStyle.footer}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography fontSize={14}>UMKM Modern</Typography>
          <Typography fontSize={9}>
            Copyright © 2025-{newDate.getFullYear()} UMKM Modern
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
