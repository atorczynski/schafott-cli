export const buttonExampleComponent = `//This is a simple Button Component. Use this as a starting point for your own components.

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label }: ButtonProps) => {
  return <button>{label}</button>;
};
`;
