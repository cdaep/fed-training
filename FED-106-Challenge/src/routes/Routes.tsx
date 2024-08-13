import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Countries from "../pages/Countries";
import Detail from "../pages/CountryDetail";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "countries", element: <Countries />},
            { path: "country/:cca3", element: <Detail />},
        ],
    }

])