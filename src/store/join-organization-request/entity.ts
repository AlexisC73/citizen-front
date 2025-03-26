import { createEntityAdapter } from "@reduxjs/toolkit";
import { JoinOrganizationRequest } from "./model";

export const joinOrganizationRequestEntity =
  createEntityAdapter<JoinOrganizationRequest>();
