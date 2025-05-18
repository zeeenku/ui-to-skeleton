"use client";
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Head from 'next/head';

const HtmlEditorPreview: React.FC = () => {
  const [code, setCode] = useState<string>('<h1>Hello, world!</h1>');
  const [isValid, setIsValid] = useState<boolean>(true);

  const validateHtml = (htmlString: string): boolean => {
    try {
      const doc = new DOMParser().parseFromString(htmlString, 'text/html');
      const errors = doc.querySelectorAll('parsererror');
      return errors.length === 0;
    } catch {
      return false;
    }
  }; 

  const handleEditorChange = (value: string | undefined) => {
    const html = value || '';
    setCode(html);
    setIsValid(validateHtml(html));
  };

  return (
    <>
    <Head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
    </Head>
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left: Monaco HTML Editor */}
      <div style={{ flex: 1, borderRight: '1px solid #ccc' }}>
        <Editor
          height="100%"
          defaultLanguage="html"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>

      {/* Right: Live Preview */}
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {isValid ? (
          <iframe
            title="preview"
            srcDoc={`
              <html>
                <head>
                  <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body>
                  ${code}
                </body>
              </html>
            `}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <p style={{ color: 'red' }}>Invalid HTML!</p>
        )}
      </div>
    </div>
    </>
  );
};

export default HtmlEditorPreview;
