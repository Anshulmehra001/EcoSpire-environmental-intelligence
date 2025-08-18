import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = false,
  padding = 'md',
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'terra-card';
  const variantClasses = `terra-card--${variant}`;
  const paddingClasses = `terra-card--padding-${padding}`;
  const interactiveClasses = [
    hover && 'terra-card--hover',
    onClick && 'terra-card--clickable'
  ].filter(Boolean).join(' ');

  const cardClasses = [
    baseClasses,
    variantClasses,
    paddingClasses,
    interactiveClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`terra-card__header ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`terra-card__body ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`terra-card__footer ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`terra-card__title ${className}`} {...props}>
    {children}
  </h3>
);

const CardSubtitle = ({ children, className = '', ...props }) => (
  <p className={`terra-card__subtitle ${className}`} {...props}>
    {children}
  </p>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;

export default Card;