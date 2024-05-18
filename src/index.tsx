import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import {store} from "./store/configureStore";
import { Provider } from 'react-redux';
import Privacy from "./components/common/Privacy"
import {ContactPage} from "./components/controls/ContactSupportTool";
import NumberViewer from "./components/viewers/NumberViewer";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { Example, type ExampleProps } from "@blueprintjs/docs-theme";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const Application = (
    <Provider store={store}>
        <Example options={false} >
        <BrowserRouter>
            <Switch>
                <Route path="/privacy" component={Privacy} />
                <Route path="/contacts" component={ContactPage} />
                <Route path={'/:id'} exact={true} component={NumberViewer} />
                <Route exact={true} path='/' component={App}/>
            </Switch>
        </BrowserRouter>
        </Example>
    </Provider>
)

root.render(Application);