import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export function AuthUserDashboard() {
  const {
    currentAction,
    setCurrentAction,
    currentLink,
    setCurrentLink,
    postOptions,
    setPostOptions,
    setOpenSubNavLinks,
    openSubNavLinks,
    setOpenUserActions,
    openUserActions,
    setOpenSignUpActions,
    openSignUpActions,
    setOpenMenuLinks,
    openMenuLinks,
  } = useOutletContext();
  return (
    <Outlet
      context={{
        currentAction,
        setCurrentAction,
        currentLink,
        setCurrentLink,
        postOptions,
        setPostOptions,
        setOpenSubNavLinks,
        openSubNavLinks,
        setOpenUserActions,
        openUserActions,
        setOpenSignUpActions,
        openSignUpActions,
        setOpenMenuLinks,
        openMenuLinks,
      }}
    />
  );
}
