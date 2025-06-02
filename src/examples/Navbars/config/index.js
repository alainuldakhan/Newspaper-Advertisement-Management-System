// src/config/navbarConfig.js
import { logout } from "../../../services/authService";

const logoutItem = {
  label: "Logout",
  onClick: logout
};

export const navbarConfig = {
  administrator: [
    { label: "Dashboard", to: "/dashboard" },
    {
      label: "Manage",
      to: "/manage",
      children: [
        { label: "Manage Users", to: "/users/manage" },
        //{ label: "Manage Roles", to: "/users/roles" },
        //{ label: "Manage Ads", to: "/users/ads" }
      ]
    },
    //{ label: "Reports", to: "/reports" },
    //{ label: "Analytics", to: "/analytics" },
    //{ label: "Transactions", to: "/transactions" },
    //{ label: "Table", to: "/tables" },
    /*{
      label: "Ad",
      to: "/ads",
      children: [
        { label: "Ad List", to: "/ads/mine" },
        { label: "Ads Plan", to: "/ads/plan" }
      ]
    },
    */
    { label: "Profile", to: "/profile" },
    //{ label: "Setting", to: "/settings" },
    logoutItem
  ],

  editor: [
    { label: "Dashboard", to: "/dashboard" },
    {
      label: "Ad",
      to: "/ads",
      children: [
        { label: "Ad List", to: "/ads/list" },
        { label: "Publish Ad", to: "/ads/publish" }
      ]
    },
    //{ label: "Analytics", to: "/analytics" },
    //{ label: "Tables", to: "/tables" },
    { label: "Profile", to: "/profile" },
    logoutItem
  ],

  advertiser: [
    { label: "Dashboard", to: "/dashboard" },
    //{ label: "Analytics", to: "/analytics" },
    /*{
      label: "Payment",
      to: "/payment",
      children: [
        { label: "Payment History", to: "/payment/history" },
        { label: "Top Up", to: "/payment/topup" }
      ]
    },
    */
    {
      label: "Ad",
      to: "/ads",
      children: [
        { label: "Create Ads", to: "/ads/choose-plan" },
        { label: "My Ads", to: "/ads/mine" }
      ]
    },
    { label: "Profile", to: "/profile" },
    logoutItem
  ]
};
