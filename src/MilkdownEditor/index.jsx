import React from "react";
import { ReactEditor, useEditor } from "@milkdown/react";
import { editorViewCtx, serializerCtx, parserCtx } from "@milkdown/core";

import { Button } from "@vikadata/components";
import { useDatasheet, useField } from "@vikadata/widget-sdk";

import { UserContext } from "../state";
import { useMemo } from "react";
import { createEditor } from "./editor";

export const FullScreen = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const editorRef = React.useRef(null);
  const [editorReady, setEditorReady] = React.useState(false);
  var readOnly = false;

  if (state.fieldId) {
    readOnly = useField(state.fieldId).type != "Text";
  }

  React.useEffect(() => {
    const editor = editorRef.current.get();
    if (!editor) return;
    editor.action((ctx) => {
      const editorView = ctx.get(editorViewCtx);
      const serializer = ctx.get(serializerCtx);
      const parser = ctx.get(parserCtx);
      const doc = parser(serializer(editorView.state.doc));
      if (!doc) return;
      const headingList = new Array();
      doc.content
        .toJSON()
        .map(
          (content) => content.type === "heading" && headingList.push(content)
        );
      dispatch({ type: "setHeading", headingList: headingList });
    });
  }, [editorReady]);

  const markdownListener = React.useCallback((getMarkdown) => {
    var content = getMarkdown();
    dispatch({ type: "setContent", content: content });
  });

  const docListener = React.useCallback((node) => {
    const jsonOutput = node.toJSON();
    const headingList = new Array();
    jsonOutput.content.map(
      (content) => content.type === "heading" && headingList.push(content)
    );
    dispatch({ type: "setHeading", headingList: headingList });
  });

  var md = state.content;
  if (!md) {
    md = "";
  }
  const editor = useEditor(
    (root) => {
      return createEditor(
        root,
        md,
        markdownListener,
        docListener,
        setEditorReady,
        readOnly
      );
    },
    [md, readOnly]
  );

  return useMemo(
    () => <ReactEditor ref={editorRef} editor={editor} />,
    [state.recordId, state.fieldId]
  );
};

export const NotFullScreen = (props) => {
  const [state, dispatch] = React.useContext(UserContext);
  const { toggleFullscreen, activeCell, activeRecord } = props;

  if (activeCell) {
    dispatch({
      type: "setContent",
      content: activeRecord.getCellValueString(activeCell.fieldId),
    });

    dispatch({
      type: "setRecord",
      recordId: activeCell.recordId,
      fieldId: activeCell.fieldId,
    });
  }

  if (state.recordId && state.fieldId) {
    const valueMap = new Object();
    valueMap[state.fieldId] = state.content;

    const datasheet = useDatasheet();

    if (
      datasheet.checkPermissionsForSetRecord(state.recordId, valueMap)
        .acceptable
    ) {
      datasheet.setRecord(state.recordId, valueMap);
    }
  }

  return (
    <div style={{ height: "100%" }}>
      <div style={{ margin: "0 auto", display: "table", paddingTop: "25%" }}>
        <Button
          color="primary"
          onClick={() => {
            dispatch({ type: "setHeading", headingList: null });
            toggleFullscreen();
          }}
        >
          点击编辑
        </Button>
      </div>
    </div>
  );
};
