import React from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Container } from './container';

interface HeroProps {
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title: string;
  subtitle?: string;
  description: string;
  primaryAction: {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  visual?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  badge,
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  visual
}) => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <Container>
        <div className="text-center">
          {badge && (
            <div className="mb-8">
              <Badge variant="primary" className="inline-flex items-center">
                {badge.icon}
                {badge.text}
              </Badge>
            </div>
          )}
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
            {subtitle && (
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block lg:inline lg:ml-4">
                {subtitle}
              </span>
            )}
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" onClick={primaryAction.onClick}>
              {primaryAction.text}
              {primaryAction.icon}
            </Button>
            {secondaryAction && (
              <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.icon}
                {secondaryAction.text}
              </Button>
            )}
          </div>
          
          {visual && (
            <div className="relative">
              {visual}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};