"use client";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export function FilePreview({
  documents,
}: {
  documents: { uri: string }[];
}): React.ReactElement {
  return (
    <DocViewer
      documents={documents}
      initialActiveDocument={documents[0]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
