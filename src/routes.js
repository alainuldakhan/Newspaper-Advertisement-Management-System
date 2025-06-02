import React from 'react';
import { IoDocument, IoRocketSharp } from 'react-icons/io5';
import { IoIosDocument }  from 'react-icons/io';
import { BsFillPersonFill, BsCreditCardFill } from 'react-icons/bs';
import { IoBuild, IoStatsChart, IoHome }      from 'react-icons/io5';

const Main = React.lazy(() => import('layouts/main'));
const Documentation = React.lazy(() => import('layouts/documentation'));
const DocIntro = React.lazy(() => import('layouts/documentation/component/pages/intro'));
const DocReact = React.lazy(() => import('layouts/documentation/component/pages/frontendDocs'));
const DocBackend = React.lazy(() => import('layouts/documentation/component/pages/backendDocs'));
const DocCleanArchitecture = React.lazy(() => import('layouts/documentation/component/pages/cleanArchDocs'));
const DocDatabase = React.lazy(() => import('layouts/documentation/component/pages/dbDocs'));
const DocInstallation = React.lazy(() => import('layouts/documentation/component/pages/installDocs'));

const Home = React.lazy(() => import('layouts/home'));
const Dashboard = React.lazy(() => import('layouts/dashboard'));

const ChoosePlan = React.lazy(() => import('layouts/user/advertiser/choosePlan'));
const ChooseCategory = React.lazy(() => import('layouts/user/advertiser/chooseCategory'));
const ChooseAdType = React.lazy(() => import('layouts/user/advertiser/chooseAdType'));
const CreateAdForm = React.lazy(() => import('layouts/user/advertiser/createAdForm'));
const MyAds = React.lazy(() => import('layouts/user/advertiser/myAds'));

const Tables = React.lazy(() => import('layouts/tables'));
const Billing = React.lazy(() => import('layouts/billing'));

const Profile = React.lazy(() => import('layouts/profile'));
const SignIn = React.lazy(() => import('layouts/authentication/sign-in'));
const SignUp = React.lazy(() => import('layouts/authentication/sign-up'));

const routes = [
  { type: "collapse", name: "Main", key: "main", route: "/", icon: <IoRocketSharp size="15px" />, component: Main },

  {
    type:   "collapse",
    name:   "Documentation",
    key:    "documentation",
    route:  "/documentation/*",           
    icon:   <IoDocument size="15px" />,
    component: Documentation,           
    children: [
      { index:true, element: <DocIntro /> },
      { path:"react", element: <DocReact /> },
      { path:"asp.net", element: <DocBackend /> },
      { path:"clean-architecture", element: <DocCleanArchitecture /> },
      { path:"database", element: <DocDatabase /> },
      { path:"installation", element: <DocInstallation /> },
    ],
  },

  { type: "collapse", name: "Home", key: "home", route: "/home", icon: <IoHome size="15px" />, component: Home },
  { type: "collapse", name: "Dashboard", key: "dashboard", route: "/dashboard", icon: <IoStatsChart size="15px" />, component: Dashboard },

  { type: "collapse", name: "Choose Plan", key: "choose-plan", route: "/ads/choose-plan", icon: <IoBuild size="15px" />, component: ChoosePlan },
  { type: "collapse", name: "Choose Category", key: "choose-category", route: "/ads/create/:plan", icon: <IoBuild size="15px" />, component: ChooseCategory },
  { type: "collapse", name: "Create Ad", key: "create-ad", route: "/ads/create/:plan/:category", icon: <IoBuild size="15px" />, component: ChooseAdType },
  { type: "collapse", name: "Ad Form", key: "ad-form", route: "/ads/create/:plan/:category/:adType", icon: <IoBuild size="15px" />, component: CreateAdForm },
  { type: "collapse", name: "My Ads", key: "my-ads", route: "/ads/mine", icon: <IoBuild size="15px" />, component: MyAds },

  { type: "collapse", name: "Tables", key: "tables", route: "/tables", icon: <IoBuild size="15px" />, component: Tables },
  { type: "collapse", name: "Billing", key: "billing", route: "/billing", icon: <BsCreditCardFill size="15px" />, component: Billing },

  { type: "title", title: "Account Pages", key: "account-pages" },
  { type: "collapse", name: "Profile", key: "profile", route: "/profile", icon: <BsFillPersonFill size="15px" />, component: Profile },
  { type: "collapse", name: "Sign In", key: "sign-in", route: "/authentication/sign-in", icon: <IoIosDocument size="15px" />, component: SignIn },
  { type: "collapse", name: "Sign Up", key: "sign-up", route: "/authentication/sign-up", icon: <IoRocketSharp size="15px" />, component: SignUp },
];

export default routes;
