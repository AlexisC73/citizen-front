import { createEntityAdapter } from "@reduxjs/toolkit";
import { Organization } from "./model";

export const organizationEntity = createEntityAdapter<Organization>();
