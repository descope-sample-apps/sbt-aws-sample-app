"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Descope } from "@descope/nextjs-sdk";

const LoginPage: React.FC = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <Descope
        flowId={process.env.NEXT_PUBLIC_DESCOPE_FLOW_ID || "sign-up-or-in"}
        redirectOnSuccess="/dashboard"
        onError={(e: any) => console.error("Login error:", e)}
      />
    </div>
  );
};

export default LoginPage;
