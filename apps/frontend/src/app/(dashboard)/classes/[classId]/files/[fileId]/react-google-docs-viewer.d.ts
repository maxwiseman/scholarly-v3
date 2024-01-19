declare module "react-google-docs-viewer" {
  interface GoogleDocsViewerProps {
    fileUrl: string;
    width?: string;
    height?: string;
  }
  const GoogleDocsViewer: React.FC<GoogleDocsViewerProps>;
  export default GoogleDocsViewer;
}
