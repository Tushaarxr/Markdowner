import React, { useState } from 'react';
import * as marked from 'marked';
import './Markdown.css'; 

function MarkdownPreview({ markdownText }) {
  const renderMarkdown = () => {
    return { __html: marked.parse(markdownText) };
  };

  return (
    <div className="markdown-preview" dangerouslySetInnerHTML={renderMarkdown()}></div>
  );
}

export default function Markdown() {
  const [markdownText, setMarkdownText] = useState('');

  const handleInputChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const insertMarkdownText = (textToInsert) => {
    const textarea = document.getElementById('markdownInput');
    const cursorPosition = textarea.selectionStart;
    const newText = markdownText.substring(0, cursorPosition) + textToInsert + markdownText.substring(cursorPosition);
    setMarkdownText(newText);
    textarea.focus();
    textarea.setSelectionRange(cursorPosition + textToInsert.length, cursorPosition + textToInsert.length); 
  };

  const handleCopyPreview = () => {
    const preview = document.querySelector('.markdown-preview');
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = markdownText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
  };

  const handleClearText = () => {
    setMarkdownText('');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto my-3">
          <div className="form-group">
            <label htmlFor="markdownInput"><h1>Enter Markdown Here:</h1></label>
            <textarea
              className="form-control my-3"
              id="markdownInput"
              rows="5"
              value={markdownText}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="toolbars">
            <button className="btn btn-primary my-2 mx-2" onClick={() => insertMarkdownText('# ')}>Heading</button>
            <button className="btn btn-primary my-2 mx-2" onClick={() => insertMarkdownText('## ')}>SubHeading</button>
            <button className="btn btn-primary my-2 mx-2" onClick={() => insertMarkdownText('**')}>Bold</button>
            <button className="btn btn-primary my-2 mx-2" onClick={() => insertMarkdownText('_')}>Italic</button>
            <button className="btn btn-primary my-2 mx-2" onClick={() => insertMarkdownText('[]()')}>Link</button>
            <button className="btn btn-primary my-2 mx-2" onClick={() => insertMarkdownText('![]()')}>Image</button>
            <button className="btn btn-primary my-2 mx-2" onClick={() => insertMarkdownText('```<Your Code>```')}>&#x27A4; Code Block</button>
            <button className="btn btn-danger my-2 mx-2" onClick={handleClearText}>Clear</button>
          </div>

          <div className="container my-3">
            <h2>Markdown Preview</h2>
            <div className="markdown-preview my-3">
              <MarkdownPreview markdownText={markdownText} />
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2>Text Summary</h2>
            <p>{markdownText.split(/\s+/).filter(Boolean).length} words and {markdownText.length} characters!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
