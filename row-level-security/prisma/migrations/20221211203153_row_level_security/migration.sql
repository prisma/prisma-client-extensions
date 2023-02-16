-- Enable Row Level Security
ALTER TABLE "Company" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Task" ENABLE ROW LEVEL SECURITY;

-- Force Row Level Security for table owners
ALTER TABLE "Company" FORCE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Project" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Task" FORCE ROW LEVEL SECURITY;

-- Create row security policies
CREATE POLICY tenant_isolation_policy ON "Company" USING ("id" = current_setting('app.current_company_id', TRUE)::uuid);
CREATE POLICY tenant_isolation_policy ON "User" USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid);
CREATE POLICY tenant_isolation_policy ON "Project" USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid);
CREATE POLICY tenant_isolation_policy ON "Task" USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid);

-- Create policies to bypass RLS (optional)
CREATE POLICY bypass_rls_policy ON "Company" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "User" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "Project" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "Task" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
