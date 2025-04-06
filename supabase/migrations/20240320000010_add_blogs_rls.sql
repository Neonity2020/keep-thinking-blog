-- 启用 RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- 删除现有的 RLS 策略
DROP POLICY IF EXISTS "Users can view own blogs" ON blogs;
DROP POLICY IF EXISTS "Users can create own blogs" ON blogs;
DROP POLICY IF EXISTS "Users can update own blogs" ON blogs;
DROP POLICY IF EXISTS "Users can delete own blogs" ON blogs;
DROP POLICY IF EXISTS "Anyone can view published blogs" ON blogs;
DROP POLICY IF EXISTS "Service role has full access" ON blogs;

-- 创建 RLS 策略
CREATE POLICY "Users can view own blogs"
ON blogs FOR SELECT
USING (auth.uid() = author_id);

CREATE POLICY "Users can create own blogs"
ON blogs FOR INSERT
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own blogs"
ON blogs FOR UPDATE
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own blogs"
ON blogs FOR DELETE
USING (auth.uid() = author_id);

-- 允许任何人查看已发布的博客
CREATE POLICY "Anyone can view published blogs"
ON blogs FOR SELECT
USING (status = 'published');

-- 创建服务角色策略
CREATE POLICY "Service role has full access"
ON blogs
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role'); 