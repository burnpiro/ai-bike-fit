import React, { Fragment, useEffect, useState } from "react";

import { Container, Stack, Typography } from "@mui/material";
import { getRecordings } from "../../utils/storage";
import { Session } from "../../utils/session";
import { SessionList } from "../../components/Session";

function SessionsListPage() {
  const [recordings, setRecordings] = useState<Session[]>([]);

  useEffect(() => {
    getRecordings().then((recordings) => {
      setRecordings(recordings.sort((a, b) => b.timestamp - a.timestamp));
    });
  }, []);
  return (
    <Fragment>
      <Container>
        <Typography
          variant="h3"
          sx={{ m: 2, textAlign: "center", fontWeight: "normal" }}
        >
          My Sessions
        </Typography>
        <SessionList sessions={recordings} />
      </Container>
    </Fragment>
  );
}

export default SessionsListPage;
