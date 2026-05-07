"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function SuccessMessage({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mb-4 p-4 bg-green-100 border border-green-400 rounded-xl text-green-700 flex items-center gap-2"
    >
      <CheckCircle size={18} />
      Report submitted successfully!
    </motion.div>
  );
}
