"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected={theme === "light"}
      size="md"
      color="default"
      startContent={<Sun size={16} />}
      endContent={<Moon size={16} />}
      onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
    />
  );
}
