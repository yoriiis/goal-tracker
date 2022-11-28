// Composant principal applicatif
// ==============================

import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import HistoryScreen from './history/HistoryScreen'
import HomeScreen from './main/HomeScreen'
import RehydrationWaiter from './RehydrationWaiter'
import RequireAuth from './shared/RequireAuth'
import SettingsScreen from './settings/SettingsScreen'
import store from './store'

export default function App() {
  return (
    // On enrobe le tout par le
    // [`Provider`](https://react-redux.js.org/api/provider) de Redux, pour que
    // l’état central et sa méthode `dispatch` puissent être accessibles à travers
    // toute l’arborescence de rendu.
    //
    // Ensuite on décrit les routes (imbriquées) de l’application, avec leurs
    // composants associés.  L’implémentation d’historique fournie explicitement
    // permet d’utiliser un historique basé `pushState` plutôt que celui, par
    // défaut, basé hash (parties `#…` des URLs).  Cela suppose toutefois une
    // capacité du serveur à retourner notre appli client correctement configurée
    // pour toutes ces “URLs profondes”.
    <Provider store={store}>
      <Router>
        <RehydrationWaiter>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route
              path='/settings'
              element={
                <RequireAuth>
                  <SettingsScreen />
                </RequireAuth>
              }
            />
            <Route
              path='/history'
              element={
                <RequireAuth>
                  <HistoryScreen />
                </RequireAuth>
              }
            />
          </Routes>
        </RehydrationWaiter>
      </Router>
    </Provider>
  )
}
