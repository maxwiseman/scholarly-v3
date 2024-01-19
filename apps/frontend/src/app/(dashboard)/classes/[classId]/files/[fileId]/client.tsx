"use client";
import GoogleDocsViewer from "react-google-docs-viewer";

export function FilePreview({ url }: { url: string }): React.ReactElement {
  return <GoogleDocsViewer fileUrl={url} height="780px" width="100%" />;
}
