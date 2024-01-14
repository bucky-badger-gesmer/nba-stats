const groupPlayersByLastName = (players: any[]) => {
  const grouped: Record<string, any[]> = {};

  players.forEach((player) => {
    const firstLetter = player.lastName.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(player);
  });
  return grouped;
};

export { groupPlayersByLastName };
