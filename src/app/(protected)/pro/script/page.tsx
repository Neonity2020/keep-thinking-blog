import React from 'react';
import ScriptViewer from '@/components/script/ScriptViewer';

export default function ScriptPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">骑驴找马</h1>
      <ScriptViewer />
    </div>
  );
} 