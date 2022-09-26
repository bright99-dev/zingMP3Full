import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {publicRoutes.map((publicRoute, index) => {
                        const Page = publicRoute.component;
                        return (
                            <Route
                                key={index}
                                path={publicRoute.path}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
