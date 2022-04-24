import { ILSPluginUser } from "@logseq/libs/dist/LSPlugin";
import { debug, getNumber, getSettings, resetNumber } from "@/common/funcs";

export default (logseq: ILSPluginUser) => {
  const settings = getSettings();

  const bindings = Array.isArray(settings.keyBindings.decrease)
    ? settings.keyBindings.decrease
    : [settings.keyBindings.decrease];

  bindings.forEach((binding, index) => {
    logseq.App.registerCommandPalette(
      {
        key: "vim-shortcut-decrease-" + index,
        label: "Decrease",
        keybinding: {
          mode: "non-editing",
          binding,
        },
      },
      async () => {
        debug("decrease");

        const number = getNumber();
        resetNumber();

        const selected = await logseq.Editor.getSelectedBlocks();
        if (selected.length > 1) {
          for (let block of selected) {
            const content = block.content.replace(/-?[0-9]+/, (match, p1) => {
              return `${parseInt(match) - number}`;
            });

            await logseq.Editor.updateBlock(block.uuid, content);
          }
        } else {
          const block = await logseq.Editor.getCurrentBlock();
          if (block) {
            const content = block.content.replace(/-?[0-9]+/, (match, p1) => {
              return `${parseInt(match) - number}`;
            });

            await logseq.Editor.updateBlock(block.uuid, content);
          }
        }
      }
    );
  });
};
