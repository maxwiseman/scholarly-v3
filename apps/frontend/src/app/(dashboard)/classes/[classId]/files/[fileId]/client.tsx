"use client";
import GoogleDocsViewer from "react-google-docs-viewer";

export function FilePreview({ url }: { url: string }): React.ReactElement {
  return (
    <div className="overflow-hidden rounded-md">
      <GoogleDocsViewer fileUrl={url} height="780px" width="100%" />
    </div>
  );
}
