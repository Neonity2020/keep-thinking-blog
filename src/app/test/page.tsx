"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface TestResult {
  api: {
    success: boolean;
    error?: string;
    supabaseUrl?: string;
    keyLength?: number;
  };
  direct: {
    success?: boolean;
    error?: string;
  };
}

export default function TestPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      // 测试API路由
      const apiResponse = await fetch('/api/test-connection');
      const apiData = await apiResponse.json();
      
      // 测试直接连接
      const { error } = await supabase.auth.getSession();
      
      setResult({
        api: apiData,
        direct: error ? { error: error.message } : { success: true }
      });
    } catch (err) {
      console.error('测试异常:', err);
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Supabase连接测试</CardTitle>
          <CardDescription>
            测试与Supabase的连接是否正常
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={testConnection} disabled={loading}>
              {loading ? "测试中..." : "测试连接"}
            </Button>
            
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
                <p className="font-medium">测试出错</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {result && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <h3 className="font-medium mb-2">API测试结果</h3>
                  <pre className="text-xs overflow-auto p-2 bg-gray-100 dark:bg-gray-900 rounded">
                    {JSON.stringify(result.api, null, 2)}
                  </pre>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <h3 className="font-medium mb-2">直接连接测试结果</h3>
                  <pre className="text-xs overflow-auto p-2 bg-gray-100 dark:bg-gray-900 rounded">
                    {JSON.stringify(result.direct, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
          </div>
          <div className="text-xs text-muted-foreground">
            Key长度: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 