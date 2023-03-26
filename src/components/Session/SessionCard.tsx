// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { Session } from "../../utils/session";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// --------
interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <StyledProductImg alt={"main image preview"} src={session.image} />
      </Box>

      <Stack spacing={1} sx={{ p: 1 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="body2" noWrap>
            {session.date.format("LT")}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              {session.bicycle}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
