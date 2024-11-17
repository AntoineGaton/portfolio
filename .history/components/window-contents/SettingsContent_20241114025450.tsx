import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import {
  Monitor,
  Moon,
  Sun,
  Palette,
  MousePointer2,
  Image,
  RefreshCcw,
} from 'lucide-react';

export function SettingsContent() {
  const { theme, setTheme } = useTheme();
  const [selectedCursor, setSelectedCursor] = useState('default');
  const [customBackground, setCustomBackground] = useState('');

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

        {/* Recommended settings section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended settings</h2>
          <p className="text-sm text-muted-foreground">
            Recent and commonly used settings
          </p>

          {/* Theme Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer">
              <div className="flex items-center gap-4">
                <Palette className="h-5 w-5" />
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred color scheme
                  </p>
                </div>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-background border rounded-md px-2 py-1"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="matrix">Matrix</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
                <option value="halloween">Halloween</option>
                <option value="christmas">Christmas</option>
              </select>
            </div>

            {/* Cursor Selection */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer">
              <div className="flex items-center gap-4">
                <MousePointer2 className="h-5 w-5" />
                <div>
                  <p className="font-medium">Mouse Cursor</p>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred cursor style
                  </p>
                </div>
              </div>
              <select
                value={selectedCursor}
                onChange={(e) => {
                  setSelectedCursor(e.target.value);
                  document.body.style.cursor = e.target.value;
                }}
                className="bg-background border rounded-md px-2 py-1"
              >
                <option value="default">Default</option>
                <option value="pointer">Pointer</option>
                <option value="crosshair">Crosshair</option>
                <option value="text">Text</option>
                <option value="wait">Wait</option>
                <option value="move">Move</option>
              </select>
            </div>

            {/* Background Selection */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer">
              <div className="flex items-center gap-4">
                <Image className="h-5 w-5" />
                <div>
                  <p className="font-medium">Background</p>
                  <p className="text-sm text-muted-foreground">
                    Set a custom background image
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customBackground}
                  onChange={(e) => setCustomBackground(e.target.value)}
                  placeholder="Enter image URL"
                  className="bg-background border rounded-md px-2 py-1 w-48"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (customBackground) {
                      document.body.style.backgroundImage = `url(${customBackground})`;
                      document.body.style.backgroundSize = 'cover';
                      document.body.style.backgroundPosition = 'center';
                      document.body.style.backgroundRepeat = 'no-repeat';
                    } else {
                      document.body.style.backgroundImage = 'none';
                    }
                  }}
                >
                  Apply
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setCustomBackground('');
                    document.body.style.backgroundImage = 'none';
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
