import React, { ReactNode } from "react";
import LibraryProvider from "./provider";

const LibraryLayout = ({ children }: { children: ReactNode }) => {
  return <LibraryProvider>{children}</LibraryProvider>;
};

export default LibraryLayout;
