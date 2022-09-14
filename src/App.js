import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import store from './redux/store';
import { Provider } from 'react-redux';
function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((publicRoute, index) => {
                            const Layout = publicRoute.layout || DefaultLayout;
                            const Page = publicRoute.component;
                            return (
                                <Route
                                    key={index}
                                    path={publicRoute.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
