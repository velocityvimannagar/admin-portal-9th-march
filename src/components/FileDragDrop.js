import React from "react";
import { useDropzone } from "react-dropzone";
import "react-dropzone/examples/theme.css";

export function FileDragDrop({onFileDrop}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) =>{
        onFileDrop(files[0])
    }
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drop or select Image</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
