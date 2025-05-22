// assets
import { IconDashboard } from '@tabler/icons-react';
import { FaBox, FaDollarSign, FaDonate, FaGavel, FaHeart, FaHistory, FaNewspaper, FaShoppingCart, FaStore, FaStream, FaUsers, FaCamera, FaCopy, FaUserEdit,FaWallet,FaUser } from "react-icons/fa";

// constant
const icons = { IconDashboard,FaBox ,FaDollarSign,FaDonate,FaGavel,FaHeart,FaHistory, FaNewspaper, FaShoppingCart, FaStore };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {id: 'My_Wallet',
      title: 'My Wallet',
      type: 'item',
      url: '/profile/My_Wallet',
      icon: icons.FaDonate,
      breadcrumbs: false

    },
    
    {
      id: 'My_Bundles',
      title: 'My Bundles',
      type: 'item',
      url: '/profile/My_Bundles',
      icon: icons.FaBox,
      breadcrumbs: false
    },
    {
      id: 'My_Education',
      title: 'My Education',
      type: 'item',
      url: '/profile/My_Education',
      icon: icons.FaBox,
      breadcrumbs: false
    },
 
    {
      id: 'My_Marketplace',
      title: 'My Marketplace',
      type: 'item',
      url: '/profile/My_Marketplace',
      icon: icons.FaDollarSign,
      breadcrumbs: false
    },
     {
      id: 'My_Fundraise',
      title: 'My Fundraise',
      type: 'item',
      url: '/profile/My_Fundraise',
      icon: icons.FaBox,
      breadcrumbs: false
    },
   
    {
      id: 'My_purchases',
      title: 'My purchases',
      type: 'item',
      url: '/profile/My_purchases',
      icon: icons.FaDonate,
      breadcrumbs: false
    },
    {
      id: 'My_sales',
      title: 'My sales',
      type: 'item',
      url: '/profile/My_sales',
      icon: icons.FaGavel,
      breadcrumbs: false
    },
    {
      id: 'My_subscriptions',
      title: 'My subscriptions',
      type: 'item',
      url: '/profile/My_subscriptions',
      icon: icons.FaHeart,
      breadcrumbs: false
    },    {
      id: 'My_feed',
      title: 'My feed',
      type: 'item',
      url: '/profile/My_feed',
      icon: icons.FaHistory,
      breadcrumbs: false
    },
  //  {
    //  id: 'My_Auctions',
    //  title: 'My Auctions',
    //  type: 'item',
    //  url: '/profile/My_Auctions',
    //  icon: icons.FaNewspaper,
    //  breadcrumbs: false
    //},
    {
      id: 'My_Subscribers',
      title: 'My Subscribers',
      type: 'item',
      url: '/profile/My_Subscribers',
      icon: icons.FaShoppingCart,
      breadcrumbs: false
    },
    {
      id: 'Supporter_List',
      title: 'Supporter List',
      type: 'item',
      url: '/profile/Supporter_List',
      icon: icons.FaStore,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
