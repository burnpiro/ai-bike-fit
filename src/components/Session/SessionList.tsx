// @mui
import { Grid, GridProps, Typography } from "@mui/material";
import { Session } from "../../utils/session";
import SessionCard from "./SessionCard";
import { Fragment } from "react";

interface SessionListProps extends GridProps {
  sessions: Session[];
}

const DATE_FORMAT = "DD MMM";

export default function SessionList({ sessions, ...other }: SessionListProps) {
  const dates = sessions.reduce<string[]>((acc, session) => {
    if (!acc.includes(session.date.format(DATE_FORMAT))) {
      acc.push(session.date.format(DATE_FORMAT));
    }
    return acc;
  }, []);
  return (
    <Fragment>
      {dates.map((date) => (
        <Fragment key={date}>
          <Typography variant="h4" component="h3" sx={{ p: 2 }}>
            {date}
          </Typography>

          <Grid container spacing={1} {...other}>
            {sessions
              .filter((session) => session.date.format(DATE_FORMAT) === date)
              .map((session) => (
                <Grid key={session.id} item xs={6} sm={4}>
                  <SessionCard session={session} />
                </Grid>
              ))}
          </Grid>
        </Fragment>
      ))}
    </Fragment>
  );
}
