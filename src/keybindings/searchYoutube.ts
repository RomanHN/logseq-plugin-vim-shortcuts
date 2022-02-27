import { ILSPluginUser } from "@logseq/libs/dist/LSPlugin";
import { debug, getCurrentBlockUUID, getSettings } from "@/common/funcs";

export default (logseq: ILSPluginUser) => {
  const settings = getSettings();

  const bindings = Array.isArray(settings.searchYoutube)
    ? settings.searchYoutube
    : [settings.searchYoutube];

  bindings.forEach((binding, index) => {
    logseq.App.registerCommandPalette(
      {
        key: "vim-shortcut-search-youtube-" + index,
        label: "Search in Youtube",
        keybinding: {
          mode: "non-editing",
          binding,
        },
      },
      async () => {
        debug("Search in Youtube");
        let blockUUID = await getCurrentBlockUUID();
        if (blockUUID) {
          let block = await logseq.Editor.getBlock(blockUUID);
          if (block?.content) {
            await logseq.App.openExternalLink(
              `https://www.youtube.com/results?search_query=${block.content}`
            );
          }
        }
      }
    );
  });
};
