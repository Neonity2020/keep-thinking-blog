-- 删除现有的 RLS 策略
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can create own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;
DROP POLICY IF EXISTS "Service role has full access" ON profiles;

-- 重新创建 RLS 策略
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can create own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
ON profiles FOR DELETE
USING (auth.uid() = id);

-- 创建服务角色策略
CREATE POLICY "Service role has full access"
ON profiles
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 确保 RLS 已启用
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY; 