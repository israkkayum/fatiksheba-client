import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import React from "react";

const HomeSkeleton = () => {
  return (
    <div>
      <Card sx={{ width: "100%" }} className="mb-3">
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />

        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

        <CardContent>
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeSkeleton;
