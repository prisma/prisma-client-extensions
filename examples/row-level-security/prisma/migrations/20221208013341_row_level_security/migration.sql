-- Add row-level security (RLS) for the "Company" table
ALTER TABLE "Company" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Company" FORCE ROW LEVEL SECURITY;
CREATE POLICY "Company_isolation_policy" ON "Company"
USING ("id" = current_setting('app.current_company_id', TRUE)::uuid
       OR current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Add row-level security (RLS) for the "User" table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;
CREATE POLICY "User_isolation_policy" ON "User"
USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid
       OR current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Add row-level security (RLS) for the "Project" table
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" FORCE ROW LEVEL SECURITY;
CREATE POLICY "Project_isolation_policy" ON "Project"
USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid
       OR current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Add row-level security (RLS) for the "Task" table
ALTER TABLE "Task" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Task" FORCE ROW LEVEL SECURITY;
CREATE POLICY "Task_isolation_policy" ON "Task"
USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid
       OR current_setting('app.bypass_rls', TRUE)::text = 'on');
