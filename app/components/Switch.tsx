'use client';

import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Switch({ checked, onChange }: SwitchProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-muted'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </motion.button>
  );
}
