import "babel-polyfill";
import Raven from "raven-js";
import base from "../skins/base-2.91.wsz";
import osx from "../skins/MacOSXAqua1-5.wsz";
import topaz from "../skins/TopazAmp1-2.wsz";
import visor from "../skins/Vizor1-01.wsz";
import xmms from "../skins/XMMS-Turquoise.wsz";
import zaxon from "../skins/ZaxonRemake1-0.wsz";
import green from "../skins/Green-Dimension-V2.wsz";
import llamaAudio from "../mp3/llama-2.91.mp3";
import Winamp from "./winamp";

import {
  hideAbout,
  skinUrl,
  audioUrl,
  initialState,
  sentryDsn
} from "./config";

Raven.config(sentryDsn).install();

Raven.context(() => {
  if (hideAbout) {
    document.getElementsByClassName("about")[0].style.visibility = "hidden";
  }
  if (!Winamp.browserIsSupported()) {
    document.getElementById("browser-compatibility").style.display = "block";
    document.getElementById("app").style.visibility = "hidden";
    return;
  }

  const audio =
    audioUrl === undefined
      ? {
          metaData: {
            artist: "DJ Mike Llama",
            title: "Llama Whippin' Intro"
          },
          url: llamaAudio
        }
      : { url: audioUrl };

  const winamp = new Winamp({
    initialSkin: {
      url: skinUrl
    },
    initialTracks: [audio],
    avaliableSkins: [
      { url: base, name: "<Base Skin>" },
      { url: green, name: "Green Dimension V2" },
      { url: osx, name: "Mac OSX v1.5 (Aqua)" },
      { url: topaz, name: "TopazAmp" },
      { url: visor, name: "Vizor" },
      { url: xmms, name: "XMMS Turquoise " },
      { url: zaxon, name: "Zaxon Remake" }
    ],
    enableHotkeys: true,
    __initialState: initialState
  });

  winamp.renderWhenReady(document.getElementById("app"));
});
