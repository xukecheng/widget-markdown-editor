import {
  defaultValueCtx,
  Editor,
  rootCtx,
  EditorViewReady,
  editorViewOptionsCtx
} from '@milkdown/core';
import { commonmarkNodes, commonmarkPlugins, paragraph, doc } from '@milkdown/preset-commonmark';
import { commonmark } from '@milkdown/preset-commonmark';

import { clipboard } from '@milkdown/plugin-clipboard';
import { cursor } from '@milkdown/plugin-cursor';
import { diagram } from '@milkdown/plugin-diagram';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';
import { indent } from '@milkdown/plugin-indent';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { math } from '@milkdown/plugin-math';
import { menu } from '@milkdown/plugin-menu';
import { prism } from '@milkdown/plugin-prism';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { upload } from '@milkdown/plugin-upload';
import { gfm } from '@milkdown/preset-gfm';
import { nord } from '@milkdown/theme-nord';

import style from "./editor.css";

const complete =
  (callback) =>
    () =>
      async (ctx) => {
        await ctx.wait(EditorViewReady);

        callback();
      };

export const createEditor = (
  root,
  defaultValue,
  markdownListener,
  docListener,
  setEditorReady,
  readOnly
) => {
  const editor = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, defaultValue);
      ctx.set(editorViewOptionsCtx, { editable: () => !readOnly })
      ctx.set(listenerCtx, { markdown: [markdownListener], doc: [docListener] });

    })
    .use(nord)
    .use(gfm)
    // .use(codeSandBox)
    .use(complete(() => setEditorReady(true)))
    .use(clipboard)
    .use(listener)
    .use(history)
    .use(cursor)
    .use(prism)
    .use(diagram)
    .use(tooltip)
    .use(math)
    .use(emoji)
    .use(indent)
    .use(upload)
    .use(slash)
    .use(commonmark)
    .use(commonmarkPlugins)
    .use(commonmarkNodes);

  if (!readOnly) {
    editor.use(menu());
  }

  return editor;
};