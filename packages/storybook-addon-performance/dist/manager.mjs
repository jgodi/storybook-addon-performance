import {
  Panel
} from "./chunk-ZQ4JU3B6.mjs";
import "./chunk-5VCB72FY.mjs";
import "./chunk-RVE3ZDU2.mjs";
import "./chunk-TPOUPAAB.mjs";
import "./chunk-GZXLCQ5G.mjs";
import "./chunk-MB2HSXAO.mjs";
import "./chunk-B3JDL7E6.mjs";
import "./chunk-OWEV3OVD.mjs";
import "./chunk-7WAVKKDP.mjs";
import "./chunk-ZRT6AJLB.mjs";
import "./chunk-NFRQK5NY.mjs";
import "./chunk-W6UH7UZ4.mjs";
import "./chunk-3B5URMMI.mjs";
import "./chunk-2M3HHHG7.mjs";
import {
  AddonPanel
} from "./chunk-LJMZBB6P.mjs";
import "./chunk-57RRHC2M.mjs";
import "./chunk-MNBCDX5S.mjs";
import "./chunk-DAYW6YD3.mjs";
import "./chunk-ECBLCABK.mjs";
import "./chunk-HE5ANRZV.mjs";
import "./chunk-CDM3JJQQ.mjs";
import "./chunk-DAHN6GF6.mjs";
import "./chunk-2TOYQF42.mjs";
import "./chunk-7MKKXQK2.mjs";
import "./chunk-VQZJGAKV.mjs";
import {
  allow_all_groups_default
} from "./chunk-GVYWDKN7.mjs";
import "./chunk-GJXIKFVV.mjs";
import "./chunk-WANCIFZ2.mjs";
import "./chunk-MCCJVA2C.mjs";
import "./chunk-2YZJDOAC.mjs";
import "./chunk-VPNLT3OG.mjs";
import "./chunk-O7GHK66D.mjs";
import "./chunk-BUURX2RZ.mjs";
import "./chunk-AXGAUA2B.mjs";
import "./chunk-J4LQTMV4.mjs";
import "./chunk-L47UYYE5.mjs";
import "./chunk-2VA53ZMH.mjs";
import "./chunk-JLU3L6VB.mjs";
import {
  addonKey,
  panelKey,
  panelTitle,
  paramKey
} from "./chunk-4NFBTX2N.mjs";
import "./chunk-FLQHF53G.mjs";
import "./chunk-22M6QDW2.mjs";

// src/manager.tsx
import { useParameter, addons, types } from "@storybook/manager-api";
import React from "react";
function Env({ children }) {
  const parameters = useParameter(paramKey, {
    interactions: [],
    allowedGroups: allow_all_groups_default
  });
  const interactions = parameters.interactions || [];
  const allowedGroups = parameters.allowedGroups || allow_all_groups_default;
  const channel = addons.getChannel();
  return children({ channel, interactions, allowedGroups });
}
addons.register(addonKey, () => {
  addons.add(panelKey, {
    type: types.PANEL,
    title: panelTitle,
    render: ({ active, key }) => /* @__PURE__ */ React.createElement(AddonPanel, { active: active != null ? active : true, key }, /* @__PURE__ */ React.createElement(Env, null, ({ interactions, channel, allowedGroups }) => /* @__PURE__ */ React.createElement(Panel, { channel, interactions, allowedGroups }))),
    paramKey
  });
});
