import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';
import Scanner from './pages/Scaner';


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book,
        Scanner
    })
);

export default Routes;