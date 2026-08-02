export const storage = {
  getUser: () => localStorage.getItem('dxhood_user'),
  setUser: (name: string) => localStorage.setItem('dxhood_user', name),
  clearUser: () => localStorage.removeItem('dxhood_user'),

  getWalletAddress: () => localStorage.getItem('dxhood_wallet'),
  setWalletAddress: (address: string) => localStorage.setItem('dxhood_wallet', address),
  clearWalletAddress: () => localStorage.removeItem('dxhood_wallet'),
  
  getTapperScore: () => parseInt(localStorage.getItem('dxhood_tapper_hs') || '0'),
  setTapperScore: (s: number) => localStorage.setItem('dxhood_tapper_hs', s.toString()),
  
  getDashScore: () => parseInt(localStorage.getItem('dxhood_dash_hs') || '0'),
  setDashScore: (s: number) => localStorage.setItem('dxhood_dash_hs', s.toString()),
  
  getMoonScore: () => parseInt(localStorage.getItem('dxhood_moon_hs') || '0'),
  setMoonScore: (s: number) => localStorage.setItem('dxhood_moon_hs', s.toString()),
};
