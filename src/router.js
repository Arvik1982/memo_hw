import { createBrowserRouter } from "react-router-dom"
import { GamePage } from "./pages/GamePage/GamePage"
import { SelectLevelPage } from "./pages/SelectLevelPage/SelectLevelPage"
import { LeadersPage } from "./pages/Leaders/Leaderboard"

export const router = createBrowserRouter(
 
  [
    {
      path: "/",
      element: <SelectLevelPage />,
    },
    {
      path: "/game/:pairsCount",
      element: <GamePage />,
    },
    {
      path: "/game/leaderboard",
      element: <LeadersPage />,
    },
  ],
  /**
   * basename нужен для корректной работы в gh pages
   * он же указан в homepage package.json и в index.html
   */
  { basename: "/react-memo" },
)
