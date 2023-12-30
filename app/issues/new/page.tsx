"use client";
import React from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Issue Title" />
      </TextField.Root>
      <TextArea size={"3"} placeholder="Issue Description"></TextArea>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default newIssuePage;
