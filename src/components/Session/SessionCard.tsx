// @mui
import { Box, Card, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
// utils
import { Session } from "../../utils/session";

// ----------------------------------------------------------------------

const StyledImg = styled("img")({
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
    <Link color="inherit" to={`/dashboard/session/${session.id}`}>
      <Card>
        <Box sx={{ pt: "100%", position: "relative" }}>
          <StyledImg alt={"main image preview"} src={session.image} />
        </Box>

        <Stack spacing={1} sx={{ p: 1 }}>
          <Typography variant="body2" noWrap>
            {session.date.format("LT")}
          </Typography>

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
    </Link>
  );
}
