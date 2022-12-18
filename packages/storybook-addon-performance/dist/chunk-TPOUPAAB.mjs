import {
  hiddenFileAnchorId
} from "./chunk-7MKKXQK2.mjs";

// src/panel/file-system.ts
function saveFile(storyName, current) {
  const anchor = document.getElementById(hiddenFileAnchorId);
  if (anchor) {
    anchor.setAttribute(
      "href",
      "data:text/json," + encodeURIComponent(JSON.stringify(current, null, 2))
    );
    anchor.setAttribute("download", `${storyName}.json`);
    anchor.click();
  }
}
function readFile(e, callback) {
  const reader = new FileReader();
  const { files } = e.currentTarget;
  if (files && files.length) {
    reader.readAsText(files[0]);
    reader.onload = ({ target }) => {
      var _a, _b;
      if (target) {
        const context = JSON.parse((_b = (_a = target.result) == null ? void 0 : _a.toString()) != null ? _b : "");
        const [storyName] = files[0].name.split(".json");
        callback(context, storyName);
      }
    };
  }
}

export {
  saveFile,
  readFile
};
