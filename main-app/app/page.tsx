"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Descope } from "@descope/nextjs-sdk";
import { useSession } from "@descope/nextjs-sdk/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCog, Key, BarChart } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [isFlowReady, setIsFlowReady] = useState(false);
  const { isAuthenticated, refreshSession } = useSession();

  const onReady = () => {
    setIsFlowReady(true);
  };

  const onSuccess = async (e: unknown) => {
    console.log("Logged in:", e);
    if (refreshSession) {
      await refreshSession();
    }
    setShowLogin(false);
  };

  const onError = (e: unknown) => {
    console.error("Login error:", e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-teal-400 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          SBT (AWS) + Descope Integration
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Sample app showcasing the SBT built-in functions for JWT session user
          management.
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        {!isAuthenticated && (
          <Button
            size="lg"
            onClick={() => setShowLogin(true)}
            className="bg-white text-blue-700 hover:bg-blue-100"
          >
            Login with Descope
          </Button>
        )}
        {isAuthenticated && (
          <Button
            size="lg"
            onClick={() => router.push("/dashboard")}
            className="bg-white text-blue-700 hover:bg-blue-100"
          >
            Go To Dashboard
          </Button>
        )}
      </motion.div>

      {/* Descope Flow Component, Always Rendered */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
          showLogin ? "visible" : "hidden"
        }`}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: showLogin ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg p-4 max-w-md w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {!isFlowReady && (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          )}
          <div className={`${isFlowReady ? "block" : "hidden"}`}>
            <Descope
              flowId={
                process.env.NEXT_PUBLIC_DESCOPE_FLOW_ID || "sign-up-or-in"
              }
              onReady={onReady}
              onSuccess={onSuccess}
              onError={onError}
              redirectOnSuccess={false} // Handle redirection manually
            />
          </div>
        </motion.div>
      </div>

      {/* Static Placement of Descope Flow */}
      <div className="hidden">
        <Descope
          flowId={process.env.NEXT_PUBLIC_DESCOPE_FLOW_ID || "sign-up-or-in"}
          onReady={onReady}
          onSuccess={onSuccess}
          onError={onError}
          redirectOnSuccess={false} // Handle redirection manually
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
      >
        <FeatureCard
          title="User Management"
          description="This application includes basic user management functions that should be available in your API Gateway after running the hello-cdk StackFormation process."
          icon={UserCog}
        />
        <FeatureCard
          title="Descope Authentication"
          description="Enjoy a seamless authentication experience using Descope Flows with this Next.js application."
          icon={Key}
        />
        <FeatureCard
          title="Scalable"
          description="AWS SaaS Builder Toolkit (SBT) is designed to create a scalable backend leveraging Descope authentication."
          icon={BarChart}
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white"
    >
      <Icon className="w-12 h-12 mb-4 text-blue-100" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-blue-100">{description}</p>
    </motion.div>
  );
}
