export const scenes = {
  intro: {
    look: `The Bronx, NY - 1990s

You find yourself in your childhood bedroom, surrounded by comics, books, and the soft glow of an old computer monitor. The streets outside are busy with the usual sounds of the city, but in here, you've created your own sanctuary.

Options:
1) Explore the computer
2) Read some comics
3) Look out the window`,
    
    options: {
      computer: {
        triggers: ['1', 'explore computer', 'computer'],
        nextScene: 'computer',
        statIncrease: { coding: 1 },
        response: `You sit down at the old computer...`
      },
      // ... other options ...
    }
  },
  // ... other scenes ...
}; 