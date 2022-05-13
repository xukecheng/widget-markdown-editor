import React from "react";
import { FullScreen, NotFullScreen } from "./MilkdownEditor/index";

import {
  initializeWidget,
  useViewport,
  useActiveCell,
  useRecord,
} from "@vikadata/widget-sdk";
import { Box } from "@vikadata/components";

import { UserProvider } from "./state";
import { Headings } from "./heading";

export const HelloWorld = () => {
  const activeCell = useActiveCell();
  const activeRecord = useRecord(activeCell?.recordId);

  const { isFullscreen, toggleFullscreen } = useViewport();

  return (
    <UserProvider>
      <div style={{ height: "100%" }}>
        <link
          rel="stylesheet"
          href="https://fonts.loli.net/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.loli.net/icon?family=Material+Icons+Outlined"
        />

        {isFullscreen ? (
          <Box display="flex" flexDirection="row" height="100%">
            <Box
              width="20%"
              textAlign="left"
              paddingTop="6rem"
              paddingLeft="2rem"
              height="100%"
              // paddingRight="1rem"
            >
              <Headings />
            </Box>
            <Box width="80%" height="100%">
              <FullScreen />
            </Box>
          </Box>
        ) : (
          <NotFullScreen
            toggleFullscreen={toggleFullscreen}
            activeCell={activeCell}
            activeRecord={activeRecord}
          />
        )}
      </div>
    </UserProvider>
  );
};

initializeWidget(HelloWorld, process.env.WIDGET_PACKAGE_ID);
