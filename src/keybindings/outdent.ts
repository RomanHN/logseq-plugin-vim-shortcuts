import { ILSPluginUser } from '@logseq/libs/dist/LSPlugin';
import { debug, getSettings } from '@/common/funcs';

export default (logseq: ILSPluginUser) => {
  const settings = getSettings();

  const bindings = Array.isArray(settings.outdent) ? settings.outdent : [settings.outdent];

  bindings.forEach((binding, index) => {
    logseq.App.registerCommandPalette({
      key: 'vim-shortcut-outdent-' + index,
      label: 'outdent',
      keybinding: {
        mode: 'non-editing',
        binding
      }
    }, async () => {
      debug('Outdent');

      // @ts-ignore
      await logseq.App.invokeExternalCommand('logseq.editor/outdent');
    });
  });
};
