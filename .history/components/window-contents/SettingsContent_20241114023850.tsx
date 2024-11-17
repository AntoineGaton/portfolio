import { useState } from 'react';

const themes = {
  matrix: { primary: '#00ff00', background: '#000000', font: 'Courier New' },
  spring: { primary: '#ff9ecd', background: '#f5e6e8', font: 'Arial' },
  summer: { primary: '#ffd700', background: '#87ceeb', font: 'Verdana' },
  autumn: { primary: '#d2691e', background: '#deb887', font: 'Georgia' },
  winter: { primary: '#add8e6', background: '#f0f8ff', font: 'Helvetica' },
  halloween: { primary: '#ff6600', background: '#000000', font: 'Creepster' },
  christmas: { primary: '#ff0000', background: '#006400', font: 'Mountains of Christmas' }
};

const cursors = ['default', 'pointer', 'crosshair', 'text', 'wait', 'move'];

export function SettingsContent() {
  const [selectedTheme, setSelectedTheme] = useState('matrix');
  const [selectedFont, setSelectedFont] = useState('Courier New');
  const [selectedCursor, setSelectedCursor] = useState('default');
  const [customBackground, setCustomBackground] = useState('');

  const applySettings = () => {
    document.documentElement.style.setProperty('--primary-color', themes[selectedTheme].primary);
    document.documentElement.style.setProperty('--background-color', themes[selectedTheme].background);
    document.documentElement.style.setProperty('--font-family', selectedFont);
    document.body.style.cursor = selectedCursor;
    if (customBackground) {
      document.body.style.backgroundImage = `url(${customBackground})`;
    }
  };

  return (
    <div className="settings-content p-4">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Theme</label>
          <select 
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {Object.keys(themes).map(theme => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Font</label>
          <select 
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {Object.values(themes).map(theme => (
              <option key={theme.font} value={theme.font}>
                {theme.font}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Mouse Cursor</label>
          <select 
            value={selectedCursor}
            onChange={(e) => setSelectedCursor(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {cursors.map(cursor => (
              <option key={cursor} value={cursor}>
                {cursor.charAt(0).toUpperCase() + cursor.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Custom Background URL</label>
          <input 
            type="text"
            value={customBackground}
            onChange={(e) => setCustomBackground(e.target.value)}
            placeholder="Enter image URL"
            className="w-full p-2 border rounded"
          />
        </div>

        <button 
          onClick={applySettings}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Settings
        </button>
      </div>
    </div>
  );
}
