import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import HomeLayout from "./layouts/index";

export const routes = [

  {
    path: "/",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Home/Main/Main")),
  },

  {
    path: "/login",
    element: lazy(() =>
      import("src/views/pages/UserSignUp/login/login")
    ),
  },
  {
    path: "/Forget",
    element: lazy(() =>
      import("src/views/pages/UserSignUp/forgetPassword/forgetPassword")
    ),
  },
  {
    path: "/profile",
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Dashboard/layout/MainLayout")
    ),
    children: [
      {
        index: true, // This makes it the default route
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Wallet/Wallet")
        ),
      },
      {
       
        path: 'My_Bundles',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Bundles/Bundles")
        ),
      },

      {
       
        path: 'My_Education',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/MyEducation/MyEducation")
        ),
      },

      {
        path: 'My_Marketplace',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Marketplace/Marketplace")
        ),
      },

      {
        path: 'My_Wallet',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Wallet/Wallet")
        ),
      },
       {
        path: 'My_Fundraise',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Fundraise/Fundraise")
        ),
      },

      {
        path: 'My_purchases',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/purchases/purchases")
        ),
      },
      {
        path: 'My_sales',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/sales/sales")
        ),
      },

      {
        path: 'My_subscriptions',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/subscriptions/subscriptions")
        ),
      },
      {
        path: 'My_feed',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Feed/Feed")
        ),
      },

      {
        path: 'My_Auctions',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Auction/Auction")
        ),
      },
      {
        path: 'My_Subscribers',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Subscribers/Subscribers")
        ),
      },
      {
        path: 'Supporter_List',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/SupporterList/SupporterList")
        ),
      },
      {
        path: 'Donate_Transaction',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/DonateList/DonateList")
        ),
      },
      {
        path: 'Transaction_History',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/TransactionHistory/TransactionHistory")
        ),
      },
     
     
     
    ]
    
    
   
  },
  {
    path: "/userdashbord",
    // layout: HomeLayout,

    element: lazy(() =>
      import("src/views/pages/Dashboard/layout/MainLayout")
    ),
    children: [
      {
        path: 'My_Bundles',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Bundles/Bundles")
        ),
      },

      {
        path: 'My_Marketplace',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Marketplace/Marketplace")
        ),
      },
       {
        path: 'My_Fundraise',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Fundraise/Fundraise")
        ),
      },

      {
        path: 'My_purchases',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/purchases/purchases")
        ),
      },
      {
        path: 'My_sales',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/sales/sales")
        ),
      },

      {
        path: 'My_subscriptions',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/subscriptions/subscriptions")
        ),
      },
      {
        path: 'My_feed',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Feed/Feed")
        ),
      },

      {
        path: 'My_Auctions',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Auction/Auction")
        ),
      },
      {
        path: 'My_Subscribers',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/Subscribers/Subscribers")
        ),
      },
      {
        path: 'Supporter_List',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/SupporterList/SupporterList")
        ),
      },
      {
        path: 'Donate_Transaction',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/DonateList/DonateList")
        ),
      },
      {
        path: 'Transaction_History',
        element:lazy(() =>
          import("src/views/pages/Dashboard/pages/TransactionHistory/TransactionHistory")
        ),
      },
     
     
     
    ]
  },
  {
    path: "/create-account",
    element: lazy(() =>
      import("src/views/pages/UserSignUp/register/register")
    ),
  },

  {
    path: "/user-list",
    guard: true,

    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Users/UsersList")),
  },
  {
    path: "/creators",
    guard: true,

    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Users/Searchresult")),
  },

  {
    path: "/chat",
    layout: HomeLayout,
    element: () =><Navigate to="/chat/t" />,
  },

  {
    path: "/chat/:chatId",
    // layout: HomeLayout,
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Chat/index")),
  },

  {
    path: "/",
    // layout: HomeLayout,
    guard: true,
    // element: lazy(() => import("src/views/pages/Profile/index")),
    element: lazy(() => import("src/views/pages/Dashboard/layout/MainLayout")),
    

  },
  {
    path: "/profilesettings",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/ProfileSetting")),
  },
  {
    path: "/kyc",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/kyc")),
  },
  {
    path: "/buymas",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/buymas")),
  },
  {
    path: "/connectWallet",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/connectWallet")),
  },
  {
    path: "/WalletContext",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/WalletContext")),
  },
  {
    path: "/user-profile/:username",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Users/UserProfile")),
  },
  {
    path: "/bundles",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/AllBundles/AllBundles")),
  },
  {
  path: "/edu-home",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Education-Beta/Home")),
  },
  {
  path: "/edu-courses",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Education-Beta/Courses")),
  },
  {
  path: "/education",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Education")),
  },
  {
    path: "/plans",
      layout: HomeLayout,
      guard: true,
      element: lazy(() => import("src/views/pages/Education/Plans")),
    },
  {
    path: "/lesson/:id",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Lesson")),
  },
  {
    path: "/items",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Allitems/Allitems")),
  },
  {
    path: "/bundles-details",
    layout: HomeLayout,
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Profile/Bundles/BundleDetails")
    ),
  },

{
    path: "/items-details",
    layout: HomeLayout,
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Profile/Items/ItemDetails")
    ),
  },


  
{
    path: "/courses-details",
    layout: HomeLayout,
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Profile/Courses/CourseDetails")
    ),
  },

  
  {
    path: "/auctions",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Auctions")),
  },
  {
    path: "/share-audience",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/ShareAudience")),
  },


  {
    path: "/refferal",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/UserSignUp/Refferal")),
  },
  {
    path: "/favorite",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Home/Favorite")),
  },
  {
    path: "/corporate/:pageName",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/staticPage")),
  },
{
  path: "/corporate/company",
  
  element: lazy(() => import("src/views/pages/Landing")),
},
{
  path: "/About_us",
  layout: HomeLayout,
  element: lazy(() => import("src/views/pages/About/AboutUs")),
},
{
  path: "/Blogs",
  layout: HomeLayout,
  guard: true,
  element: lazy(() => import("src/views/pages/About/Blog")),
},
{
  path: "/Contact_Us",
  layout: HomeLayout,
  element: lazy(() => import("src/views/pages/About/ContactUs")),
},
{
  path: "/FAQ",
  layout: HomeLayout,
  element: lazy(() => import("src/views/pages/About/FAQ")),
},
{
  path: "/Fundraise",
  layout: HomeLayout,
  element: lazy(() => import("src/views/pages/Fundraise/Fundraise")),
},
{
  path: "/FundDetails",
  layout: HomeLayout,
  element: lazy(() => import("src/views/pages/Fundraise/FundDetails")),
},
  {
    path: "/404",
    element: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    path: "*",
    element: () => <Navigate to="/404" />,
  },
];
