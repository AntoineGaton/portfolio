import { Chrome } from 'lucide-react';
import { Button } from './ui/button';

export function ChromeIcon() {
  return (
    <Button 
      variant="ghost" 
      className="flex flex-col items-center gap-1 hover:bg-transparent"
      onClick={() => window.open('/portfolio', '_blank')}
    >
      <Chrome className="h-12 w-12" />
      <span className="text-sm">Portfolio</span>
    </Button>
  );
} 