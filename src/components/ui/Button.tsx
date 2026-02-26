import React from "react";
import type { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: IconType;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  onClick,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg hover:scale-105 hover:from-primary-700 hover:to-secondary-700",
    secondary:
      "bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 hover:shadow-lg",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:scale-105",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {Icon && iconPosition === "left" && <Icon className="mr-2" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="ml-2" />}
    </motion.button>
  );
};

export default Button;
