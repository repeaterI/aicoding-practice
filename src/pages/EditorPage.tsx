import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ProblemArea from '../components/ProblemArea';
import CodeEditor from '../components/CodeEditor';
import AiChat from '../components/AiChat';

function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen p-4">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={30} minSize={20}>
            <div className="h-full pr-2">
              <ProblemArea />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-2 hover:bg-blue-500 hover:w-1 mx-1 transition-all">
            <div className="h-full w-1 bg-gray-200 rounded mx-auto" />
          </PanelResizeHandle>
          
          <Panel defaultSize={40} minSize={30}>
            <div className="h-full pl-2">
              <CodeEditor />
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 hover:bg-blue-500 hover:w-1 mx-1 transition-all">
            <div className="h-full w-1 bg-gray-200 rounded mx-auto" />
          </PanelResizeHandle>

          <Panel defaultSize={30} minSize={20}>
            <div className="h-full pl-2">
              <AiChat />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default EditorPage;