// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import {  FaStream, FaUsers, FaCamera, FaCopy, FaUserEdit } from "react-icons/fa";
// constant
const icons = {
  FaStream,
  FaUsers,
  FaCamera,
  FaCopy
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const Transaction = {
  id: 'Transaction',
  title: 'Transaction',
  type: 'group',
  children: [
    {
      id: 'Donate_Transaction',
      title: 'Donate Transaction',
      type: 'item',
      url: '/profile/Donate_Transaction',
      icon: icons.FaStream,
      breadcrumbs: false
    },
    {
      id: 'Transaction_History',
      title: 'Transaction History',
      type: 'item',
      url: '/profile/Transaction_History',
      icon: icons.FaUsers,
      breadcrumbs: false
    },
 
  ]
};

export default Transaction;
