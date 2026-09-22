"use client";

import { ImageIcon } from "lucide-react";

import { MediaBrowser } from "../components/editor/MediaBrowser";
import { Panel } from "../components/UI/Panel";

/** Browse, upload and delete images stored in public/uploads/blog. */
export default function MediaLibraryPanel() {
  return (
    <Panel
      title="Media Library"
      description="Images are stored in public/uploads/blog and can be reused across posts."
      icon={<ImageIcon size={18} className="text-cyan-600" />}
    >
      <MediaBrowser manage />
    </Panel>
  );
}
