"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour < 12) {
        return "Good Morning";
      } else if (hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    setGreeting(getGreeting());
  }, []);

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        {greeting}{isLoaded ? ", " : " "}
        {user?.firstName} 👋
      </h2>
      <p className="text-sm lg:text-base text-[#89B6FD]">
        This is your Financial Overview Report
      </p>
    </div>
  );
};
