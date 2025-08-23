import { useUser } from "@clerk/nextjs";
import React from "react";

const CreateUser = () => {
  const { user } = useUser();
  const CreateUser = async () => {};

  return <div>CreateUser</div>;
};

export default CreateUser;
