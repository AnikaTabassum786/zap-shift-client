import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "../routes/PrivateRoute"
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import PendingDelivery from "../pages/Dashboard/PendingDelivery/PendingDelivery";
import RiderRoute from "../routes/RiderRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path:'/sendParcel',
        element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path:'/beARider',
        element:<PrivateRoute><BeARider></BeARider></PrivateRoute>,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path:'/forbidden',
        Component:Forbidden
      }
      
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path:'/dashboard',
    element:
    <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,

    children:[
      {
        path:'myParcels',
        Component:MyParcels
      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path:'track',
        Component:TrackParcel
      },
      {
        path:'pending-delivery',
        element:<RiderRoute><PendingDelivery></PendingDelivery></RiderRoute>
      },

      {
        path:'pending-riders',
        element:<AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path:'active-riders',
        element:<AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
      },
      {
        path:'makeAdmin',
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      },
      {
        path:'assign-riders',
        element:<AdminRoute><AssignRiders></AssignRiders></AdminRoute>
      }
    ]
  }
]);